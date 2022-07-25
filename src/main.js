import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'

// Vue.directive('click-outside', {
//   bind: function (el, binding, vnode) {
//     console.log(el)
//     // this.event = function (event) {
//      if (!(el == event.target || el.contains(event.target) || event.target.className === "select2-selection__choice__remove" || event.target.className === "select2-search__field" )) {
//         vnode.context[binding.expression](event);
//       }
//     // };
//     document.body.addEventListener('click', this.event)
//   },
//   unbind: function (el) {
//     document.body.removeEventListener('click', this.event)
//   },
// });


Vue.config.productionTip = false




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
