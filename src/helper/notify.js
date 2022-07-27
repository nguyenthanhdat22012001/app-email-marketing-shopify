import store from "@/store";

function showNotify(status = "success", title = "Success", message = "") {
  store.dispatch("notifyStore/addNotify", {
    status: status,
    title: title,
    message: message,
  });
}

export default {
  showNotify,
};
