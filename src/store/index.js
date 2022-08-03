import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import customerStore from "@/modules/customer/store";
import notifyStore from "./notifyStore";
import campaignStore from "@/modules/campaign/store";
import auth from "@/modules/auth/store";
export default new Vuex.Store({
  state: {
    isToggle: false,
    isLoading: false,
    progress: 0,
  },
  getters: {
    getToggle(state) {
      return state.isToggle;
    },
    getLoading(state) {
      return state.isLoading;
    },
    getProgress(state) {
      return state.progress;
    }
  },
  mutations: {
    toggle(state) {
      state.isToggle = !state.isToggle;
    },
    setLoading(state, payload) {
      state.isLoading = payload
    },
    setProgress(state, payload) {
      state.progress = payload
    }
  },
  actions: {},
  modules: {
    customerStore,
    campaignStore,
    notifyStore,
    auth
  },
});
