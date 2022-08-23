import { api, axios, mixin } from "@/plugins";
export default async function ({ next, to, store }) {
  let token = store.getters['auth/getToken'];
  if (token) {
    next({ name: 'customer' })
    return false
  }

  if (to.query.hmac) {
    store.dispatch('auth/loginStore', {
      ...to.query,
    }).then(res => {
      if (res.status) {
        store.commit('auth/setToken', res.data.original.access_token);
        next({ name: 'customer' })
      } else {
        mixin.methods.toastMessageError({
          message: 'Server is busy!! Try again'
        });
      }
    }).catch(err => {
      console.log(err)
      
      mixin.methods.toastMessageError({
        message: 'Server Error!! Try again'
      });
    })

  }
  return true
}