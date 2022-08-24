import notify from '@/helper/notify'
import { mixin, pusher } from '@/plugins'
import api from '@/plugins/api'
const state = {
    customersList: [],
    selectedCustomers: [],
    isLoading: true,
    isError: false,
    isProgress: false,
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
    },
    getIsProgress(state) {
        return state.isProgress;
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
    },
    setIsProgress(state, payload) {
        state.isProgress = payload
    }
}
const actions = {
    subscribe({ commit, state }) {
        return new Promise((resolve, reject) => {
            try {
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
            } catch (err) {
                console.log(err)
                reject(err)
            }

        })

    },
    fetchCustomersSync({ commit, dispatch, state }, payload) {
        return new Promise((resolve, reject) => {
            api.CUSTOMER.fetchSync(payload).then(res => {
                console.log(res)
                if (res.status) {
                    resolve(res.status)
                    commit('setProgress', 0);
                    commit('setIsProgress', true)
                    const progressTimeOut = setTimeout(() => {
                        if (state.progress == 0) {
                            mixin.methods.toastMessageError({
                                message: "Sync Customers failed!",
                            });
                            commit('setProgress', 100);
                            commit('setIsProgress', false);
                        } else {
                            clearTimeout(progressTimeOut);
                        }
                    }, 10000);
                    dispatch('subscribe').then((data) => {
                        commit('setCustomer', data)
                        notify.showNotify(
                            "success",
                            "Success",
                            "Sync Customers Successfully!!"
                        );
                    });
                } else {
                    throw res
                }
            }).catch(err => {

                reject(err);
            })
        }).finally(() => {
            this.commit('setLoading', false)
        })
    },
    fetchCustomers({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            api.CUSTOMER.fetch(payload).then(res => {
                if (res.status === true) {
                    if (res.data.data.length) {
                        commit('setCustomer', res.data);
                        resolve(res.data);
                    } else {
                        console.log(!Object.keys(payload).length)
                        if (!Object.keys(payload).length) {
                            dispatch('fetchCustomersSync')
                        } else {
                            commit('setCustomer', res.data);
                            resolve(res.data);

                        }
                    }

                }
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        }).finally(() => {
            this.commit('setLoading', false)
        })
    },

    exportCSV({ state }, payload) {
        return new Promise((resolve, reject) => {
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
