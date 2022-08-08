import data from '@/store/data'
const state = {
    campaignList: [],
    customersSelected: [],
    fileImage: null,
}
const getters = {
    getCustomersSelected(state) {
        return state.customersSelected
    },
    getFileImage(state) {
        return state.fileImage
    }
}
const mutations = {
    setCustomersSelected(state, callback) {
        callback(state);
    },
    setFileImage(state, payload) {
        state.fileImage = payload
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
