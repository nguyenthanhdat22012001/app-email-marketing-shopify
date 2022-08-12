import { api, axios, mixin } from "@/plugins";
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
    store.dispatch('auth/loginStore', {
      ...to.query,
    }).then(res => {
      if (res.status) {
        store.commit('auth/setToken', res.data.original.access_token)
        next({ name: 'customer' })
      } else {
        mixin.methods.toastMessageError({
          message: 'Server is busy!! Try again'
        });
      }
    }).catch(err => {
      console.log(err)
      if (err.status == 401) {
        mixin.methods.toastMessageError({
          message: 'Store invalid!! Try again'
        });
        return true
      }
      mixin.methods.toastMessageError({
        message: 'Server Error!! Try again'
      });
    })

  }
  console.log(to)
  return true
}