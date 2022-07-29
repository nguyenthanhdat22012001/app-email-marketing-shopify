import data from './data.js'
const state = {
    campaignList: [],
    customersSelected:[]
}
const getters = {
    getCustomersSelected(state) {
        return state.customersSelected
    }
}
const mutations = {
    setCustomersSelected(state, payload) {
        payload(state);
    }
}
const actions = {
    
}


export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true,
};
