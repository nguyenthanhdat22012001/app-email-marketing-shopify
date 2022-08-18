import { default as instance } from "axios";
import cookie from '@/plugins/cookie'
import store from '@/store'
let axios = instance.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 20 * 1000,
  validateStatus: function (status) {
    return status >= 200 && status < 400;
  },
});
axios.CancelToken = instance.CancelToken;
axios.isCancel = instance.isCancel;
axios.interceptors.request.use(function (config) {

  let token = cookie.get("access_token");
  config.headers["ngrok-skip-browser-warning"] = 1;
  config.headers["Content-Type"] = "application/json"
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});
axios.interceptors.response.use(
  function (response) {
    if (response?.data?.status === 401) {
      store.dispatch("auth/logout");
      return Promise.reject({
        message: "Session expired!! Please login again",
        status: 401
      });
    }
    return response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      store.dispatch("auth/logout");
    }
    return Promise.reject(error.response);
  },
);
export default axios;