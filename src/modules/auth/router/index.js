import NoLogin from '@/middleware/NoLogin'
import LoadingComponent from '@/components/VLoadingApp'

const authRouter = [
    {
        path: "/login",
        name: 'login',
        component: () => import(/* webpackChunkName: "about" */ "@/modules/auth/views/AuthLogin.vue"),
        meta: {
            layout: 'auth',
            middleware: [NoLogin],
        },
        loading: LoadingComponent
    }
]
export default authRouter