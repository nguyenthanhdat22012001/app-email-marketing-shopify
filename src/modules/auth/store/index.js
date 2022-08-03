
import api from "@/plugins/api";
import cookie from "@/plugins/cookie";
let token = cookie.get('test_token');


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
        console.log('set user ');
        console.log(payload);
        state.user = payload;
    },
    removeUser(state) {
        state.user = null;
    },
    setToken(state, payload) {
        state.token = payload;
        cookie.set("test_token", payload, {
            expires: 7,
        });
    },
    removeToken(state) {
        state.token = "";
        cookie.remove("test_token");
    },
};
const actions = {
    loginStore({ commit }, shopName) {
        return new Promise((resolve, reject) => {
            this.commit('setLoading', true)
            api.AUTH.loginStore({ shopName }).then(res => {
                resolve(res)
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
