import { api } from '/src/plugins/api'


export default {
    fetch() {
        return api.get("/api/campaign/get-campaigns-process");
    },
    filter(payload) {
        return api.get("api/campaign/filterCampaign", payload);
    },
    postTestMail(payload) {
        return api.post("/api/campaign/save-campaign", payload);

    },
    postSendMail(payload) {
        return api.post("/api/campaign/send-email-preview", payload, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });
    },
}