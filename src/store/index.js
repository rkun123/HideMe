import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cameraDevice: null
  },
  mutations: {
    setCameraDevice(state, cameraDevice) {
      state.cameraDevice = cameraDevice
    }
  },
  actions: {
    setCameraDevice({ commit }, cameraDevice) {
      commit('setCameraDevice', cameraDevice)
    }
  },
  modules: {
  }
})
