import axios from "./axios";
const api = {
  get(url, params = {}, cancel_token = null) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params,
          cancelToken: cancel_token ? cancel_token.token : null,
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          if (axios.isCancel(err)) {
            return reject("canceled");
          }
          reject(err);
        });
    });
  },

  post(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  put(url, data = {}) { },

  delete(url, data = {}) { },
};

export default {

  AUTH: {
    loginStore(payload) {
      return api.post('/api/auth/login', payload)
    },

    fetchUser() {
      return api.get('/api/auth/getUser')
    }
  },


  CUSTOMER: {
    fetchPagination(page) {
      return api.get('/api/customer', { page: page })
    },

    fetchSync() {
      return api.get('/api/customer/sync')
    },
    filter(payload) {
      return api.get('/api/customer/filterCustomer', payload);
    },
    getCustomerShowAvatars(payload) {
      console.log('{...payload}',{...payload})
      return api.get('/api/customer', {...payload});
    }

  },
  CAMPAIGN: {
    fetch() {
      return api.get('api/campaign/get-campaigns-process')
    },
    postTestMail(payload) {
      return api.post('https://803a-113-161-32-170.ap.ngrok.io/api/shopify/preview-email', payload)
    },
    postSendMail(payload) {
      return api.post('/api/campaign/save-campaign', payload)
    },
  },
};