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
                    if (state.progress < 100) {
                        commit('setProgress', Number(res.payload.processing));
                    }
                    if (res.payload.status) {
                        commit('setProgress', 100);
                        pusher.unbind("syncing_customer", eventCustomersSync);
                        resolve(res.payload.data)
                    }
                }
                pusher.subscribe("customers_syncing");
                pusher.bind("syncing_customer", eventCustomersSync);
            } catch (err) {
                reject(err)
            }
        })

    },
    fetchCustomersSync({ commit, dispatch, state }, payload) {
        return new Promise((resolve, reject) => {
            api.CUSTOMER.fetchSync(payload).then(res => {
                if (res.status) {
                    resolve(res.status)
                    commit('setProgress', 0);
                    commit('setIsProgress', true);
                    notify.showNotify(
                        "success",
                        "Success",
                        "Start Sync Customers!!"
                    );
                    const progressTimeOut = setTimeout(() => {
                        if (state.progress == 0) {
                            mixin.methods.toastMessageError({
                                message: "Sync Customers failed!",
                            });
                            commit('setProgress', 100);
                            commit('setIsProgress', false);
                            commit('setLoading', false);
                        } else {
                            clearTimeout(progressTimeOut);
                        }
                    }, 20000);
                    dispatch('subscribe').then((data) => {
                        commit('setCustomer', data)
                        notify.showNotify(
                            "success",
                            "Success",
                            "Sync Customers Successfully!!"
                        );
                    })
                        .catch(error => {
                            throw error
                        })
                        .finally(() => {
                            commit('setIsProgress', false)
                            commit('setLoading', false)
                        });
                } else {
                    throw res
                }
            }).catch(err => {
                mixin.methods.toastMessageError({
                    message: "Sync Customers failed!",
                });
                console.log(err)
                reject(err);
                commit('setIsProgress', false)
                commit('setLoading', false)
            })
        })
    },
    fetchCustomers({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            api.CUSTOMER.fetch(payload).then(res => {
                if (res.status === true) {
                    commit('setCustomer', res.data);
                    resolve(res.data);
                }
            }).catch(err => {
                reject(err)
            }).finally(() => {
                this.commit('setLoading', false)
            })
        })
    },

    exportCSV({ state }, payload) {
        return new Promise((resolve, reject) => {
            api.CUSTOMER.exportCSV(payload)
                .then((res) => {
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
