import axios from "./axios";
const api = {
  get(url, params = {}, cancel_token = null) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params,
          cancelToken: cancel_token ? cancel_token.token : null,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            return reject("canceled");
          }
          reject(err);
        });
    });
  },

  post(url, data = {}, option) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data, option)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
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
      return api.post("/api/auth/login", payload);
    },

    fetchUser() {
      return api.get("/api/auth/getUser");
    },
  },

  CUSTOMER: {
    fetch(payload) {
      return api.get("/api/customer", payload);
    },
    fetchSync() {
      return api.get("/api/customer/sync");
    },
    filter(payload) {
      return api.get("/api/customer/filterCustomer", payload);
    },
    getCustomerShowAvatars(payload) {
      return api.get("/api/customer", { ...payload });
    },
    exportCSV(payload) {
      return api.get("https://12d7-113-161-32-170.ap.ngrok.io/api/customer/export", payload)
    }
  },
  CAMPAIGN: {
    fetch() {
      return api.get("api/campaign/get-campaigns-process");
    },
    filter(payload) {
      return api.get("api/campaign/filterCampaign", { ...payload });
    },
    postTestMail(payload) {
      return api.post("/api/campaign/send-email-preview", payload, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
    },
    postSendMail(payload) {
      return api.post("/api/campaign/save-campaign", payload, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
    },
  },
};
