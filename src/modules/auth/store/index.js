import api from "@/plugins/api";
import cookie from "@/plugins/cookie";
let token = cookie.get("access_token");

const state = {
  user: null,
  token: token ? token : "",
  firstSync: false,
};
const getters = {
  getUser(state) {
    return state.user;
  },
  getToken(state) {
    return state.token;
  },
  getFirstSync(state){
    return state.firstSync
  }
};

const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  removeUser(state) {
    state.user = null;
  },
  setToken(state, payload) {
    state.token = payload;
    cookie.set("access_token", payload, {
      expires: 7,
    });
  },
  setFirstSync(state,payload){
    state.firstSync = payload
  },
  removeToken(state) {
    state.token = "";
    cookie.remove("access_token");
  },
};
const actions = {
  loginStore({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.commit("setLoading", true);
      api.AUTH.loginStore(payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          this.commit("setLoading", false);
        });
    });
  },
  fetchUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.commit("setLoading", true);
      api.AUTH.fetchUser(payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          this.commit("setLoading", false);
        });
    });
  },
  async refreshToken({ commit }, payload) {
    try {
      let res = await api.AUTH.refreshToken(payload);
      if (res.status) {
        commit("setToken", res.data.original.access_token);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },
  logout({ commit }) {
    commit("removeUser");
    commit("removeToken");
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
};
