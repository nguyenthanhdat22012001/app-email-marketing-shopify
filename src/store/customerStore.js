import data from './data.js'
const state = {
    customersList: []
}
const getters = {
    getCustomers(state) {
        return state.customersList
    }
}
const mutations = {
    setCustomer(state, payload) {
        state.customersList = payload;
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
