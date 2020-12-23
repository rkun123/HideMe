import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cameraDevice: null,
    videoLoaded: false,
    predictTimer: null,
    predictStatus: false,
    image: null,
    imageOption: {
      paddingX: 0,
      paddingY: 0
    }
  },
  mutations: {
    setCameraDevice(state, cameraDevice) {
      state.cameraDevice = cameraDevice
    },
    setVideoLoaded(state, videoLoaded) {
      state.videoLoaded = videoLoaded
    },
    setPredictTimer(state, predictTimer) {
      state.predictTimer = predictTimer
    },
    setPredictStatus(state, predictStatus) {
      state.predictStatus = predictStatus
    },
    setImage(state, image) {
      state.image = image
    },
    setPaddingX(state, paddingX) {
      state.imageOption.paddingX = paddingX
    },
    setPaddingY(state, paddingY) {
      state.imageOption.paddingY = paddingY
    }
  },
  actions: {
    setCameraDevice({ commit }, cameraDevice) {
      commit('setCameraDevice', cameraDevice)
    },
    setVideoLoaded({ commit }, videoLoaded) {
      commit('setVideoLoaded', videoLoaded)
    },
    setPredictTimer({ commit }, predictTimer) {
      commit('setPredictTimer', predictTimer)
    }
  },
  modules: {
  }
})
