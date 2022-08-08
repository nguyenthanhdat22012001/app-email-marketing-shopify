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
      return api.post('/api/login', payload)
    },

    fetchUser() {
      return api.get('/api/auth/getUser')
    }
  },


  CUSTOMER: {
    fetchPagination(page) {
      return api.get('/api/customer/get-all', { page: page })
    },

    fetchSync() {
      return api.get('/api/customer/sync')
    },
    filter(payload) {
      return api.post('/api/auth/filterCustomer', payload);
    }

  },
  CAMPAIGN: {
    fetch() {
      return api.get('/api/get-campaigns-process')
    },
    postTestMail(payload) {
      return api.post('https://803a-113-161-32-170.ap.ngrok.io/api/shopify/preview-email', payload)
    },
    postSendMail(payload) {
      return api.post('/api/save-campaign ', payload)
    },
  },
};