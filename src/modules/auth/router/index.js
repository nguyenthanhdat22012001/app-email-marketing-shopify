import NoLogin from '@/middleware/NoLogin'


const authRouter = [
    {
        path: "/login",
        name: 'login',
        component: () => import(/* webpackChunkName: "about" */ "@/modules/auth/views/AuthLogin.vue"),
        meta: {
            layout: 'auth',
            middleware: [NoLogin],
        }
    }
]
export default authRouter