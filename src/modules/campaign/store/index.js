const state = {
  fileImage: null,

//   data_customer: {
//     number_customer_select: 0,
//     list_customer_selected: [],
//     list_customer_exect: [],
//     customers_avatar: [],
//     select_all: false,
//     select_any: false,
//   },

//   temp_data_customer: {
//     number_customer_select: 0,
//     list_customer_selected: [],
//     list_customer_exect: [],
//     select_all: false,
//     select_any: false,
//   },
};
const getters = {
  getFileImage(state) {
    return state.fileImage;
  },
//   getDataCustomer(state) {
//     return state.data_customer;
//   },
};
const mutations = {
  setFileImage(state, payload) {
    state.fileImage = payload;
  },
//   setTempDataCustomer(state, payload) {
//     state.temp_data_customer = {
//       ...state.temp_data_customer,
//       ...payload,
//     };
//   },
//   setDataCustomer(state, payload) {
//     state.data_customer = {
//       ...state.data_customer,
//       ...payload,
//     };
//   },
};
const actions = {
//   handleUpdateTempDataCustomer({ commit }, payload) {
//     console.log('payload',payload);
//     let total = 0;
//     if (payload.select_all) {
//       total = payload.total_customers - payload.list_customer_exect.length;
//     } else {
//       total = 0;
//     }

//     if (payload.select_any) {
//       total = payload.list_customer_selected.length;
//     }
//     let data = {
//       number_customer_select: total,
//       list_customer_selected: payload.list_customer_selected,
//       list_customer_exect: payload.list_customer_exect,
//       select_all: payload.select_all,
//       select_any: payload.select_any,
//     };

//     commit("setTempDataCustomer", data);
//   },

//   handleUpdateDataCustomer({ state, commit }) {
//     commit("setDataCustomer", state.temp_data_customer);
//   },

//   hanldeReturnBackTempDataCustomerOld({ state, commit }) {
//     commit("setTempDataCustomer", state.data_customer);
//   },

//   handleResetDataAll({ commit }) {

//     let data = {
//       number_customer_select: 0,
//       list_customer_selected: [],
//       list_customer_exect: [],
//       select_all: false,
//       select_any: false,
//     };
//     commit("setTempDataCustomer", data);
//     commit("setDataCustomer", data);
//   },
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
};
