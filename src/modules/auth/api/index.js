import { api } from '/src/plugins/api'

export default {
    loginStore(payload) {
        return api.post("/api/auth/login", payload);
    },

    fetchUser() {
        return api.get("/api/auth/getUser");
    },
}