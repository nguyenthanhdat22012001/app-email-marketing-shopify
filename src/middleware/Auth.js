import { axios, mixin } from "@/plugins";
import notify from "@/helper/notify";
export default async function ({ next, from, store }) {
    let token = store.getters['auth/getToken']
    if (token) {
        let user = store.getters['auth/getUser']
        if (!user) {
            try {
                const { user } = await store.dispatch('auth/fetchUser')
                if (user) {
                    store.commit('auth/setUser', user);
                   
                    return true
                } else {
                    throw {
                        message: "Session expired"
                    }
                }
            } catch (error) {
                store.dispatch('auth/logout');
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