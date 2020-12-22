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
  </v-container>
</template>

<script>
import CameraSelector from '../components/CameraSelector.vue'
import FaceDetect from '../components/FaceDetect'

export default {
  name: 'Home',
  components: {
    FaceDetect,
    CameraSelector
  }
}
</script>