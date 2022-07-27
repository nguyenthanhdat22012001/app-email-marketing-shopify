const state = {
  notifies_store: [
    // {
    //   id: 1,
    //   status: "success",
    //   title: "Success",
    //   message: "Create campaign successfully",
    // },
    // {
    //   id: 2,
    //   status: "success",
    //   title: "Success",
    //   message: "Create home successfully",
    // },
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
  addNotify({ state, commit, dispatch }, payload) {
    let data = {
      id: Math.floor(Math.random() * 1000),
      ...payload,
    };
    commit("setNotify", [data, ...state.notifies_store]);
    dispatch("autoRemove", { time: 3000 });
  },
  removeNotify({ state, commit }, id) {
    commit(
      "setNotify",
      state.notifies_store.filter((notify) => notify.id != id)
    );
  },
  autoRemove({ state }, payload) {
    let { time } = payload;
    console.log("autoRemove", time);
    let remove_notify = setInterval(function () {
      if (state.notifies_store.length <= 0) {
        clearInterval(remove_notify);
      }

      state.notifies_store.pop();
    }, time);
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
};
