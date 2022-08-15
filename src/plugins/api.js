import axios from "./axios";
import campaignAPI from "../modules/campaign/api"
import authAPI from "../modules/auth/api"
import customerAPI from "../modules/customer/api"
export const api = {
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
    ...authAPI
  },

  CUSTOMER: {
    ...customerAPI
  },
  CAMPAIGN: {
    ...campaignAPI
  },
};
