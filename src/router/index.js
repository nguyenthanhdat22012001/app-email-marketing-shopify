import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/auth",
    component: () => import(/* webpackChunkName: "about" */ "@/modules/auth/views/AuthLogin.vue"),
    meta:{
      layout:'auth'
    }
  },
  {
    path: "/customer",
    component: () => import(/* webpackChunkName: "about" */ "@/modules/customer/views/Layout.vue"),
    children:[
      {
        path:'',
        name:'customer',
        component: () => import(/* webpackChunkName: "about" */ "@/modules/customer/views/CustomerHome.vue"),
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
