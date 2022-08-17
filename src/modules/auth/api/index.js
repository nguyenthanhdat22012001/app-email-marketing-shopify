import { api } from '/src/plugins/api'

export default {
    loginStore(payload) {
        return api.post("https://865e-113-161-32-170.ap.ngrok.io/api/auth/login", payload);
    },

    fetchUser() {
        return api.get("https://865e-113-161-32-170.ap.ngrok.io/api/auth/getUser");
    },
}