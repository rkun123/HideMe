<template>
    <v-container>
        <v-select
            :items="cameraDevices"
            :value="cameraDevice"
            @input="setCameraDevice"
            item-text="label"
            return-object="true"
            label="ウェブカメラ"
        ></v-select>
    </v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    data: () => ({
        cameraDevices: []
    }),
    computed: {
        ...mapState({
            cameraDevice: state => state.cameraDevice,
            videoLoaded: state => state.videoLoaded
        })
    },
    methods: {
        ...mapActions(['setCameraDevice']),
        async getCameraDevices() {
            this.cameraDevices = []
            const _devices = await navigator.mediaDevices.enumerateDevices()
            for(const device of _devices) {
                if(device.kind !== 'videoinput') continue
                this.cameraDevices.push({
                    deviceId: device.deviceId,
                    label: device.label
                })
            }
            console.log(this.cameraDevices)
        }
    },
    async created() {
        await this.getCameraDevices()
    }
}
</script>