import { api } from '/src/plugins/api'

export default {
    fetch(payload) {
        return api.get("/api/customer", payload);
    },
    fetchSync() {
        return api.get("/api/customer/sync");
    },
    filter(payload) {
        return api.get("/api/customer/filterCustomer", payload);
    },
    getCustomerShowAvatars(payload) {
        return api.get("/api/customer", { ...payload });
    },
    exportCSV(payload) {
        return api.get("/api/customer/export", payload)
    }
}