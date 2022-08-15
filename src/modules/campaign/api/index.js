import { api } from '/src/plugins/api'


export default {
    fetch() {
        return api.get("https://9c80-2001-ee0-15a-b5ec-9916-43f6-62c-aaf3.ap.ngrok.io/api/campaign/get-campaigns-process");
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