import { pusher } from '@/plugins'
import api from '@/plugins/api'
const state = {
    customersList: [],
    selectedCustomers: [],
    isLoading: false,
}
const getters = {
    getCustomers(state) {
        return state.customersList
    },
    getCustomerCount(state) {
        return state.customersList.length
    },
    getSelectedCustomers(state) {
        return state.selectedCustomers
    },
    getIsLoading(state) {
        return state.isLoading
    }
}
const mutations = {
    setCustomer(state, payload) {
        state.customersList = payload;
    },
    setSelectedCustomers(state, callback) {
        state.selectedCustomers = callback(state.selectedCustomers)
    },
    setLoading(state, payload) {
        state.isLoading = payload
    }
}
const actions = {
    subscribe({ commit, dispatch }) {
        const eventCustomersSync = (data) => {
            console.log(this.getters.getProgress);
            if (this.getters.getProgress < 100) {
                this.commit('setProgress', Number(data.message));
            }
            if (data.message >= 100) {
                this.commit('setProgress', 100);
                pusher.unbind("syncing_customer", eventCustomersSync);
            }
        }
        this.commit('setProgress', 0);
        pusher.subscribe("customers_syncing");
        pusher.bind("syncing_customer", eventCustomersSync);
    },
    fetchCustomersSync({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            api.CUSTOMER.fetchSync().then(res => {
                console.log(res)
                dispatch('subscribe');
                if (res.data) {
                    resolve(res);
                } else {
                    reject(res)
                }
            }).catch(err => {
                reject(err)
            })
        }).finally(() => {
            this.commit('setLoading', false)

        })
    },
    fetchCustomers({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api.CUSTOMER.fetchPagination(payload).then(res => {
                if (res.data) {
                    commit('setCustomer', res.data);
                    resolve(res.data);
                } else {
                    reject(res)
                }
            }).catch(err => {
                reject(err)
            })
        }).finally(() => {
            this.commit('setLoading', false)
        })
    },
    filterCustomers({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api.CUSTOMER.filter(payload).then(res => {
                commit('setCustomer', res);
                resolve(res)
            }).catch(err => reject(err));
        })
    },

}


export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true,
};
