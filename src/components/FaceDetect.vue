<template>
    <div ref="container" class="detection_container">
        <video-view ref="video" />
        <canvas ref="overlayCanvas"></canvas>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import * as faceapi from 'face-api.js'
import VideoView from './VideoView'
export default {
    components: {
        VideoView
    },
    computed: {
        ...mapState({
            videoLoaded: state => state.videoLoaded
        })
    },
    methods: {
        async loadModel() {
            console.log('Loading model...')
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
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
            const option = new faceapi.TinyFaceDetectorOptions()
            let task = faceapi.detectAllFaces(video, option).withFaceLandmarks()
            const results = await task
            const dims = faceapi.matchDimensions(canvas, video, true)
            const resizedResults = faceapi.resizeResults(results, dims)
            faceapi.draw.drawDetections(canvas, resizedResults)
        }
    },
    watch: {
        videoLoaded: async function () {
            console.log('Start detection')
            this.resizeCanvasToVideo()
            await this.loadModel()
            await this.detect()
        }
    }
}
</script>
<style lang="scss" scoped>
.detection_container {
    display: inline-block;

    video-view {
        position: absolute;
    }
    canvas {
        position: absolute;
        width: 100%;
        height: 100%;
    }
}
</style>