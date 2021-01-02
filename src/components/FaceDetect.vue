<template>
    <div ref="container" class="detection_container">
        <video-view ref="video" />
        <canvas ref="overlayCanvas"></canvas>
        <v-dialog v-model="dialog" hide-overlay persistent width="300" >
            <v-card color="primary" dark >
                <v-card-text>
                    Preparing predict...
                    <v-progress-linear indeterminate color="white" class="mb-0" />
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="alert" hide-overlay persistent width="300" >
            <v-card color="red" dark >
                <v-card-text>
                    Please choose image.
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import * as faceapi from 'face-api.js'
import VideoView from './VideoView'

export default {
    data: () => ({
        dialog: false,
        alert: false,
    }),
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
        ...mapActions([ 'setPredictTimer']),
        ...mapMutations([ 'setPredictStatus' ]),
        async loadModel() {
            console.log('Loading model...')
            this.dialogMessage = "Loading model..."
            this.dialog = true;
            try {
                await faceapi.nets.ssdMobilenetv1.load('/models')
                await faceapi.nets.faceLandmark68Net.load('/models')
                console.log('Loaded model.')
                this.dialog = false;
            }catch(e) {
                console.error(e)
                this.dialog = false;
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
            const image = this.image
            if(image === null || this.videoLoaded === false) {
                this.alert = true;
                setTimeout(() => {
                    this.alert = false
                    this.setPredictStatus(false)
                }, 2000)
                return
            }
            this.dialog = true
            const video = this.$refs.video.$refs.video
            const canvas = this.$refs.overlayCanvas

            const videoCanvas = faceapi.createCanvasFromMedia(video)
            const displaySize = { width: video.width, height: video.height }
            console.log(displaySize)
            window.electron.ipcRenderer.send('start')
            faceapi.matchDimensions(videoCanvas, displaySize)
            const option = new faceapi.SsdMobilenetv1Options({})
            let faceCtx = null
            const timer = setInterval(async () => {

                let task = faceapi.detectSingleFace(video, option)
                const result = await task
                const ctx = canvas.getContext('2d')


                if(result !== undefined) {
                    const dims = faceapi.matchDimensions(canvas, video, true)
                    const resizedResults = faceapi.resizeResults(result, dims)
                    //faceapi.draw.drawDetections(canvas, resizedResults)
                    //faceapi.draw.drawFaceLandmarks(canvas, resizedResults)
                    faceCtx = this.adjustImageCtx(
                        resizedResults.box.x,
                        resizedResults.box.y,
                        resizedResults.box.width,
                        resizedResults.box.height,
                    )
                }

                if(faceCtx === null) return
                this.drawBackgroundImage(ctx, canvas.width, canvas.height, video)
                this.drawFace( ctx, faceCtx, image)
                const data = this.extractFaces(canvas, ctx)
                window.electron.ipcRenderer.send('frame', data)
            }, 1000 / 30)
            this.setPredictTimer(timer)
            this.dialog = false;
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
        drawBackgroundImage(ctx, width, height, video) {
            //ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(video, 0, 0, width, height)
        },
        drawFace(ctx, { x, y, w, h }, image) {
            ctx.drawImage(image, x, y, w, h)
        },
        extractFaces(canvas, ctx) {
            const pixel = ctx.getImageData(0, 0, canvas.width, canvas.height)
            return pixel.data
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
                if(this.videoLoaded) await this.detect()
            }else{
                console.log('Stop detection')
                clearTimeout(this.predictTimer)
                window.electron.ipcRenderer.send('stop')
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