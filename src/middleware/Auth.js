import { axios, mixin } from "@/plugins";
export default async function ({ next, from, store }) {
    let token = store.getters['auth/getToken']
    if (token) {
        let user = store.getters['auth/getUser']
        if (!user) {
            try {
                const payload = await store.dispatch('auth/fetchUser')
                if (payload.store) {
                    store.commit('auth/setUser', payload.store);
                    return true
                }
            } catch (error) {
                store.dispatch('auth/logout');
                console.log(error)
                mixin.methods.toastMessageError({
                    message: error.message
                })
                next({
                    name: 'login'
                })
                return false
            }
        } else {
            return true
        }
    }
    store.dispatch('auth/logout')
    next({
        name: 'login'
    })
    return false;
    // return true;
}