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
    setCustomersSelected(state, callback) {
        callback(state);
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
