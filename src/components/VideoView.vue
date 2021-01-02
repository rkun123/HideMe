<template>
    <video ref="video" class="webcam_view" autoplay></video>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState({
            cameraDevice: state => state.cameraDevice,
            videoLoaded: state => state.videoLoaded
        })
    },
    methods: {
        ...mapActions([ 'setVideoLoaded' ]),
        async loadVideo(device) {
            console.log("Set camera", device)
            const video = this.$refs.video
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    deviceId: device.deviceId
                }
            })
            video.srcObject = stream
            await new Promise((res) => {
                video.onloadedmetadata = () => {
                    console.log("Video loaded")
                    this.setVideoLoaded(true)
                    res()
                }
            })
        }
    },
    watch: {
        cameraDevice(val) {
            this.loadVideo(val)
        }
    }
}
</script>
<style lang="scss" scoped>
video {
    position: relative;
}
</style>