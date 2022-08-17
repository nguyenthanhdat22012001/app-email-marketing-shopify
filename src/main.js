import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";
import 'animate.css';
import { mixin } from "@/plugins";

Vue.prototype.$eventBus = new Vue();
Vue.config.productionTip = false;
Vue.mixin(mixin);

document.title = "logoipsum - Team2";
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
