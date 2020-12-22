<template>
    <v-container>
        <video ref="video" class="webcam_view" autoplay></video>
    </v-container>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            cameraDevice: state => state.cameraDevice
        })
    },
    methods: {
        async loadVideo(device) {
            console.log("Set camera", device)
            const video = this.$refs.video
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    deviceId: device
                }
            })
            video.srcObject = stream
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
</style>