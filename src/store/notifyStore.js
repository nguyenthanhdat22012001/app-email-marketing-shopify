const state = {
  notifies_store: [
    {
      id: 1,
      status: "success",
      title: "Success",
      message: "Create campaign successfully",
    },
    {
      id: 2,
      status: "success",
      title: "Success",
      message: "Create home successfully",
    },
  ],
};
const getters = {
  getNotifies(state) {
    return state.notifies_store;
  },
};
const mutations = {
  setNotify(state, payload) {
    state.notifies_store = payload;
  },
};
const actions = {
  addNotify({ state, commit }, data) {
    commit('setNotify', [data, ...state.notifies_store])
  },
  removeNotify({ state, commit }, id) {
    commit('setNotify', state.notifies_store.filter(notify => notify.id != id))
  }
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
};
