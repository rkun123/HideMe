<template>
  <v-container>
    <v-row>
      <v-col>
        <camera-selector />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <face-detect />
      </v-col>
    </v-row>
    <v-row>
      <v-col md="2">
        <v-btn :color="predictStatus ? 'red' : 'success'" @click="setPredictStatus(!predictStatus)">
          {{ predictStatus ? 'STOP' : 'START' }}
        </v-btn>
      </v-col>
      <v-col>
        <v-file-input ref="imagePicker" @change="uploadImage"></v-file-input>
      </v-col>
    </v-row>
    <setting />
  </v-container>
</template>

<script>
import CameraSelector from '../components/CameraSelector.vue'
import FaceDetect from '../components/FaceDetect'
import Setting from '../components/Setting.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState(['predictTimer', 'predictStatus'])
  },
  methods: {
    ...mapActions(['setPredictTimer']),
    ...mapMutations(['setPredictStatus', 'setImage']),
    stopPredict() {
      clearInterval(this.predictTimer)
      this.setPredictTimer(null)
      this.setPredictTimer(false)
    },
    uploadImage(file){
      const reader = new FileReader()
      reader.onload = () => {
        console.info('Loaded image.')
        console.info(reader.result)
        let image = new Image()
        image.src = reader.result
        image.onload = () => {
          this.setImage(image)
        }
      }
      console.log(file)
      reader.readAsDataURL(file)
    }
  },
  components: {
    FaceDetect,
    CameraSelector,
    Setting
  }
}
</script>