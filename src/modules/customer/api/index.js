import { api } from '/src/plugins/api'

export default {
    fetch(payload) {
        return api.get("/api/customer", payload);
    },
    fetchSync(payload) {
        return api.get("/api/customer/sync",payload);
    },

    getCustomerShowAvatars(payload) {
        return api.get("/api/customer", { ...payload });
    },
    exportCSV(payload) {
        return api.get("/api/customer/export", payload)
    }
}