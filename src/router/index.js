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
    component: () => import(/* webpackChunkName: "about" */ "@/modules/customer/views/layout.vue"),
    children: [
      {
        path: '',
        name: 'customer',
        component: () => import(/* webpackChunkName: "about" */ "@/modules/customer/views/CustomerHome.vue"),
      },

    ]
  },
  {
    path: "/campaign",
    component: () => import(/* webpackChunkName: "about" */ "@/modules/campaign/views/layout.vue"),
    children: [
      {
        path: '',
        name: 'campaign',
        component: () => import(/* webpackChunkName: "about" */ "@/modules/campaign/views/CampaignHome.vue"),
      },
      {
        path: 'create',
        name: 'campaign/create',
        component: () => import(/* webpackChunkName: "about" */ "@/modules/campaign/views/CampaignCreate.vue"),
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
  scrollBehavior: function (to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.middleware) {
    const middleware = to.meta.middleware;
    const payload = { to, from, next, store };
    let preventNext = false;
    for (let i = 0; i < middleware.length; i++) {
      const result = await middleware[i](payload);
      if (!result) {
        preventNext = true;
        break;
      }
    }
    if (preventNext) {
      return;
    }
  }
  next();
});
export default router
