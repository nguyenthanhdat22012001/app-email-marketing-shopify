import { axios } from "@/plugins";
export default async function ({ next, to, store }) {
  let token = store.getters['auth/getToken'];
  if (Object.keys(to.query).length) {
    console.log('hmac')
    axios.interceptors.request.use(function (config) {
      config.headers['HTTP_X_SHOPIFY_HMAC_SHA256'] = to.query.hmac
      return config;
    });
    Headers['HTTP_X_SHOPIFY_HMAC_SHA256'] = to.query.hmac
    store.dispatch('auth/loginStore', JSON.stringify(to.query))
  }
  // if (token) {
  //   next({
  //     name: 'Dashboard'
  //   })
  //   return false
  // }
  return true
}