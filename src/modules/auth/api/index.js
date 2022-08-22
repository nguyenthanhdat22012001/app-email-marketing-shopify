import { api } from '/src/plugins/api'

export default {
    loginStore(payload) {
        return api.post("/api/auth/login", payload);
    },
    refreshToken() {
        return api.post("api/auth/refresh");
    },

    fetchUser() {
        return api.get("/api/auth/store");
    },
}