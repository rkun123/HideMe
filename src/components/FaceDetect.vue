<template>
    <div ref="container" class="detection_container">
        <video-view ref="video" />
        <canvas ref="overlayCanvas"></canvas>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import * as faceapi from 'face-api.js'
import VideoView from './VideoView'
export default {
    components: {
        VideoView
    },
    computed: {
        ...mapState({
            videoLoaded: state => state.videoLoaded,
            predictTimer: state => state.predictTimer,
            predictStatus: state => state.predictStatus,
            image: state => state.image,
            imageOption: state => state.imageOption
        })
    },
    methods: {
        ...mapActions([ 'setPredictTimer' ]),
        async loadModel() {
            console.log('Loading model...')
            try {
                await faceapi.nets.ssdMobilenetv1.load('/models')
                await faceapi.nets.faceLandmark68Net.load('/models')
                console.log('Loaded model.')
            }catch(e) {
                console.error(e)
            }
        },
        resizeCanvasToVideo() {
            const container = this.$refs.container
            const video = this.$refs.video.$refs.video
            const canvas = this.$refs.overlayCanvas
            container.width = video.videoWidth
            container.height = video.videoHeight
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
        },
        async detect() {
            const video = this.$refs.video.$refs.video
            const canvas = this.$refs.overlayCanvas

            const videoCanvas = faceapi.createCanvasFromMedia(video)
            const displaySize = { width: video.width, height: video.height }
            faceapi.matchDimensions(videoCanvas, displaySize)
            const option = new faceapi.SsdMobilenetv1Options({
            })
            const timer = setInterval(async () => {
                console.log('.')
                let task = faceapi.detectSingleFace(video, option).withFaceLandmarks()
                const result = await task
                if(result === undefined) return
                console.log(result)
                const dims = faceapi.matchDimensions(canvas, video, true)
                const resizedResults = faceapi.resizeResults(result, dims)
                //faceapi.draw.drawDetections(canvas, resizedResults)
                //faceapi.draw.drawFaceLandmarks(canvas, resizedResults)
                const ctx = this.adjustImageCtx(
                    resizedResults.detection.box.x,
                    resizedResults.detection.box.y,
                    resizedResults.detection.box.width,
                    resizedResults.detection.box.height,
                )
                this.drawImage(
                    canvas,
                    ctx,
                    this.image
                    )
            }, 100)
            this.setPredictTimer(timer)
        },
        adjustImageCtx(x, y, w, h){
            const option = this.imageOption
            return {
                x: x - option.paddingX,
                y: y - option.paddingY,
                w: w + option.paddingX * 2,
                h: h + option.paddingY * 2
            }
        },
        drawImage(canvas,{ x, y, w, h }, image) {
            const ctx = canvas.getContext('2d')
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(image, x, y, w, h)
        }
    },
    watch: {
        videoLoaded: async function () {
            this.resizeCanvasToVideo()
            await this.loadModel()
        },
        predictStatus: async function (val) {
            if(val) {
                console.log('Start detection')
                await this.detect()
            }else{
                console.log('Stop detection')
                clearTimeout(this.predictTimer)
                this.setPredictTimer(null)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.detection_container {
    position: relative;
    display: inline-block;

    video-view {
        position: absolute;
    }
    canvas {
        position: absolute;
        left: 0;
    }
}
</style>