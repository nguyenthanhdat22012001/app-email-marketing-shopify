import notify from '@/helper/notify'
import { mixin, pusher } from '@/plugins'
import api from '@/plugins/api'
const state = {
    customersList: [],
    selectedCustomers: [],
    isLoading: true,
    isError: false,
    progress: 100,

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
    getLoading(state) {
        return state.isLoading
    },
    getError(state) {
        return state.isError
    },
    getProgress(state) {
        return state.progress;
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
    },
    setError(state, payload) {
        state.isError = payload
    },
    setProgress(state, payload) {
        state.progress = payload
    }
}
const actions = {
    subscribe({ commit, state }) {
        return new Promise((resolve, reject) => {
            const eventCustomersSync = (res) => {
                console.log(res);
                if (state.progress < 100) {
                    commit('setProgress', Number(res.payload.processing));
                }
                if (res.payload.status) {
                    commit('setProgress', 100);
                    pusher.unbind("syncing_customer", eventCustomersSync);
                    resolve(res.payload.data)
                }
            }
            commit('setProgress', 0);
            pusher.subscribe("customers_syncing");
            pusher.bind("syncing_customer", eventCustomersSync);
        })

    },
    fetchCustomersSync({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            api.CUSTOMER.fetchSync().then(res => {
                console.log(res)
                if (res.status) {
                    notify.showNotify(
                        "success",
                        "Success",
                        "Start Sync Customers"
                    );
                    dispatch('subscribe').then((data) => {
                        commit('setCustomer', data)
                        resolve(data)
                    });
                } else {
                    throw res
                }
            }).catch(err => {
                8
                reject(err);
            })
        }).finally(() => {
            this.commit('setLoading', false)

        })
    },
    fetchCustomers({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api.CUSTOMER.fetch(payload).then(res => {
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
    // filterCustomers({ commit }, payload) {
    //     return new Promise((resolve, reject) => {
    //         api.CUSTOMER.filter(payload).then(res => {
    //             commit('setCustomer', res.data);
    //             resolve(res.data)
    //         }).catch(err => reject(err));
    //     })
    // },
    exportCSV({ state }, payload) {
        return new Promise((resolve, reject) => {

            if (payload?.length) {
                payload = {
                    list_customer: payload.toString()
                }
            }
            api.CUSTOMER.exportCSV(payload)
                .then((res) => {
                    console.log(res)
                    resolve(res)
                })
                .catch(err => reject(err))
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
