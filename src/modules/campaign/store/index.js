const state = {
  // fileImage: null,

  data_customer: {
    number_customer_select: 0,
    list_customer_selected: [],
    list_customer_exect: [],
    customers_avatar: [],
    select_all: false,
    select_any: false,
  },

  temp_data_customer: {
    number_customer_select: 0,
    list_customer_selected: [],
    list_customer_exect: [],
    select_all: false,
    select_any: false,
  },
};
// const getters = {
//   getFileImage(state) {
//     return state.fileImage;
//   },
// };
const mutations = {
  setFileImage(state, payload) {
    state.fileImage = payload;
  },
  setTempDataCustomer(state, payload) {
    state.temp_data_customer = {
      ...state.temp_data_customer,
      ...payload,
    };
  },
  setDataCustomer(state, payload) {
    state.data_customer = {
      ...state.data_customer,
      ...payload,
    };
  },
  resetDataCustomerAndTempDataCustomer(state) {
    let data = {
      number_customer_select: 0,
      list_customer_selected: [],
      list_customer_exect: [],
      select_all: false,
      select_any: false,
    };
    state.data_customer = data
    state.temp_data_customer = data
  },
};
const actions = {
  handleUpdateNumberCustomerSelectTempDataCustomer({ state,commit },total_customers) {
    let total = 0;
    if (state.temp_data_customer.select_all) {
      total = total_customers - state.temp_data_customer.list_customer_exect.length;
    } else {
      total = 0;
    }

    if (state.temp_data_customer.select_any) {
      total = state.temp_data_customer.list_customer_selected.length;
    }
    commit("setTempDataCustomer", {number_customer_select: total,});
  },
};

export default {
  state,
  mutations,
  // getters,
  actions,
  namespaced: true,
};
