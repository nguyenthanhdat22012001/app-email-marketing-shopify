import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isToggle: false
  },
  getters: {
    getToggle(state) {
      return state.isToggle
    }
  },
  mutations: {
    toggle(state) {
      state.isToggle = !state.isToggle;
    }
  },
  actions: {
  },
  modules: {
  }
})
