import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import customerStore from "@/modules/customer/store";
import notifyStore from "./notifyStore";
import campaignStore from "@/modules/campaign/store";
import auth from "@/modules/auth/store";

import notify from '@/helper/notify'
export default new Vuex.Store({
  state: {
    isToggle: false,
    isLoading: false,
  },
  getters: {
    getToggle(state) {
      return state.isToggle;
    },
    getLoading(state) {

      return state.isLoading;
    },
   
  },
  mutations: {
    toggle(state) {
      state.isToggle = !state.isToggle;
    },
    setLoading(state, payload) {
      state.isLoading = payload
    },
   
  },
  actions: {
    timeoutError({ commit }) {
      return setTimeout(() => {
        commit('setLoading', false)
        notify.showNotify("error", "Error", "Something wrong !! Try again")
      }, 5000)
    }
  },
  modules: {
    customerStore,
    campaignStore,
    notifyStore,
    auth
  },
});
