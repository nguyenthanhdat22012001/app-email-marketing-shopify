import { api, axios } from "@/plugins";
export default async function ({ next, to, store }) {
  let token = store.getters['auth/getToken'];
  if (token) {
    next({ name: 'customer' })
    return true
  }
  if (Object.keys(to.query).length) {
    axios.interceptors.request.use(function (config) {
      config.headers['HTTP_X_SHOPIFY_HMAC_SHA256'] = to.query.hmac
      return config;
    });
    Headers['HTTP_X_SHOPIFY_HMAC_SHA256'] = to.query.hmac

    store.dispatch('auth/fetchUser', {
      ...to.query,
      "myshopify_domain": to.query.shop
    }).then(res => {
      if (res.status) {
        store.commit('auth/setToken', res.data.original.access_token)
        store.commit('auth/setUser', res.data.original.user)
        next({ name: 'customer' })
      }
      console.log(res)

    }).catch(err => console.log(err));
  }
  // if (token) {
  //   next({
  //     name: 'Dashboard'
  //   })
  //   return false
  // }
  return true
}