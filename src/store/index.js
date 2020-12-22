import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cameraDevice: null,
    videoLoaded: false
  },
  mutations: {
    setCameraDevice(state, cameraDevice) {
      state.cameraDevice = cameraDevice
    },
    setVideoLoaded(state, videoLoaded) {
      state.videoLoaded = videoLoaded
    }
  },
  actions: {
    setCameraDevice({ commit }, cameraDevice) {
      commit('setCameraDevice', cameraDevice)
    },
    setVideoLoaded({ commit }, videoLoaded) {
      commit('setVideoLoaded', videoLoaded)
    }
  },
  modules: {
  }
})
