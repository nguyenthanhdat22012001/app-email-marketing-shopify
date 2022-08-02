import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import customerStore from "./customerStore";
import notifyStore from "./notifyStore";
import campaignStore from "./campaignStore";
import auth from "./auth";
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
      return state.isLoading
    }
  },
  mutations: {
    toggle(state) {
      state.isToggle = !state.isToggle;
    },
    setLoading(state, payload) {
      state.isLoading = payload
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
