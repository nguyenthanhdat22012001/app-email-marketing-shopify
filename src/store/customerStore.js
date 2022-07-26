import data from './data.js'
const state = {
    customerList: []
}
const getters = {
    getCustomer(state) {
        return state.customerList
    }
}
const mutations = {
    setCustomer(state, payload) {
        state.customerList = payload;
    }
}
const actions = {
    fetchCustomer({ commit }, state) {
        commit('setCustomer', data)
    }
}


export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true,
};
