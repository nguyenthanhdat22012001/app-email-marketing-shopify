import api from '@/plugins/api'

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
        return new Promise((resolve, reject) => {
            api.getCustomers().then(res => {
                if (res.data) {
                    commit('setCustomer', res.data);
                    resolve();
                } else {
                    reject()
                }

            }).catch(err => {
                reject(err)
            })
        })

        // commit('setCustomer', data)
    }
}


export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true,
};
