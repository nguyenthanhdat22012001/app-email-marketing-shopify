import api from '@/plugins/api'
const state = {
    customersList: []
}
const getters = {

}
const mutations = {

}
const actions = {
    loginShopify({ commit }, shopName) {
        return new Promise((resolve, reject) => {
            this.commit('setLoading', true)
            api.AUTH.loginShopify({ shopName }).then(res => {
                resolve(res)
            })
        })

    }
}


export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true,
};
