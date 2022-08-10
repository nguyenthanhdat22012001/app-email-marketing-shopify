
import notify from "@/helper/notify";
import { mixin } from "@/plugins";
import api from "@/plugins/api";
import cookie from "@/plugins/cookie";
let token = cookie.get('access_token');


const state = {
    is_logged: false,
    user: null,
    token: token ? token : '',
};
const getters = {
    isLogged(state) {
        return state.user ? true : false;
    },
    getUser(state) {
        return state.user;
    },
    getToken(state) {
        return state.token;
    },
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
    removeToken(state) {
        state.token = "";
        cookie.remove("access_token");
    },
};
const actions = {
    loginStore({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.commit('setLoading', true)
            api.AUTH.loginStore(payload).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            }).finally(() => {
                this.commit('setLoading', false)

            })
        })
    },
    fetchUser({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.commit('setLoading', true)
            api.AUTH.fetchUser(payload).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            }).finally(() => {
                this.commit('setLoading', false)
            })
        })
    },
    logout({ commit }) {
        commit("removeUser");
        commit("removeToken");
    },
}


export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true,
};
