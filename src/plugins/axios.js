import { default as instance } from "axios";
import cookie from "@/plugins/cookie";
import store from "@/store";
import notify from "@/helper/notify";

let axios = instance.create({
  baseURL: localStorage.getItem('api_url') || process.env.VUE_APP_API,
  timeout: 20 * 1000,
  validateStatus: function (status) {
    return status >= 200 && status < 400;
  },
});
axios.CancelToken = instance.CancelToken;
axios.isCancel = instance.isCancel;
axios.source = axios.CancelToken.source();
axios.interceptors.request.use(function (config) {
  let token = cookie.get("access_token");
  config.headers["ngrok-skip-browser-warning"] = 1;
  config.headers["Content-Type"] = "application/json";
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    //token expired
    const originalConfig = error.config;
    if (originalConfig?.url !== "/api/auth/login" && error?.response) {
      if (error.response.status === 401) {
        if (error.response.data.message == "token_absent") {
          store.dispatch("auth/logout");
          notify.showNotify("error", "Error", "Authorize Failed !! Please login again")
        } else {
          let result = await store.dispatch("auth/refreshToken");
          if (result) {
            return axios(originalConfig);
          } else {
            store.dispatch("auth/logout");
            notify.showNotify("error", "Error", "Authorize Failed !! Please login again")
          }
        }

      }
    }
    return Promise.reject(error.response || error);
  }
);
export default axios;
