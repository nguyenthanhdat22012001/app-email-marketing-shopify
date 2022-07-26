import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/customer",
  },
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
      },
    ]
  },
  {
    path: "/campaign",
    component: () => import(/* webpackChunkName: "about" */ "@/modules/campaign/views/Layout.vue"),
    children:[
      {
        path:'',
        name:'campaign',
        component: () => import(/* webpackChunkName: "about" */ "@/modules/campaign/views/CampaignHome.vue"),
      },
      {
        path:'create',
        name:'create campaign',
        component: () => import(/* webpackChunkName: "about" */ "@/modules/campaign/views/CampaignCreate.vue"),
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
