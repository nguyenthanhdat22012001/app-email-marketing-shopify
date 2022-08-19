import { api } from "/src/plugins/api";

export default {
  fetch(payload) {
    return api.get("api/campaign",payload);
  },
  postTestMail(payload) {
    return api.post("/api/campaign/send-test", payload, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  },
  postSendMail(payload) {
    return api.post("/api/campaign/save-campaign", payload, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  },
};
