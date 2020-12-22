<template>
  <v-container>
    <v-row>
      <v-col>
        <camera-selector />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <video-view />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CameraSelector from '../components/CameraSelector.vue'
import VideoView from '../components/VideoView.vue'

export default {
  name: 'Home',
  components: {
    VideoView,
    CameraSelector
  }
}
</script>
