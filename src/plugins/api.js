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
    loginStore({ shopName }) {
      return api.post('/api/login', {
        "myshopify_domain": shopName
      })
    },
    checkAuth(payload) {
      return api.post('/api/login', payload)
    },
    fetchUser() {
      return api.get('/api/auth/getUser')
    }

  },
  getCustomers(payload) {
    return api.get('/api/auth/getCustomer', payload)
  },
  getCustomersSync() {
    return api.get('https://d651-113-161-32-170.ap.ngrok.io/api/customer/sync')
  },
  CUSTOMER: {
    fetchPagination(page) {
      return api.get('/api/customer/get-all',{page: page})
    },
  },
  CAMPAIGN: {
    fetch() {
      return api.get('/api/get-campaigns-process')
    },
    postTestMail(payload) {
      return api.post('/api/save-campaign ',payload)
    },
  },
};