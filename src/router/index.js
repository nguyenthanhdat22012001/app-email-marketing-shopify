import Vue from 'vue'
import VueRouter from 'vue-router'
import NoLogin from '@/middlewares/NoLogin'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/customer",
  },
  {
    path: "/login",
    component: () => import(/* webpackChunkName: "about" */ "@/modules/auth/views/AuthLogin.vue"),
    meta: {
      layout: 'auth',
      middleware: [NoLogin],
    }
  },
  {
    path: "/customer",
    component: () => import(/* webpackChunkName: "customer" */ "@/modules/customer/views/layout.vue"),
    children: [
      {
        path: '',
        name: 'customer',
        component: () => import(/* webpackChunkName: "customer" */ "@/modules/customer/views/CustomerHome.vue"),
      },

    ]
  },
  {
    path: "/campaign",
    component: () => import(/* webpackChunkName: "campaign" */ "@/modules/campaign/views/layout.vue"),
    children: [
      {
        path: '',
        name: 'campaign',
        component: () => import(/* webpackChunkName: "campaign" */ "@/modules/campaign/views/CampaignHome.vue"),
      },
      {
        path: 'create',
        name: 'campaign/create',
        component: () => import(/* webpackChunkName: "campaign" */ "@/modules/campaign/views/CampaignCreate.vue"),
      }
    ]
  },
]

const emptyFn = () => { }
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(
  location,
  onComplete = emptyFn,
  onAbort = emptyFn,
) {
  return originalPush.call(this, location, onComplete, onAbort)
}


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: function () {
    // arg: to, from, savedPosition
    return { x: 0, y: 0 };
  },
})

export default router
