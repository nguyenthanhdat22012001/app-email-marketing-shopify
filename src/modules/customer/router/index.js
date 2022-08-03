import Auth from '@/middleware/Auth'

const customerRouter = [
    {
        path: "/customer",
        component: () => import(/* webpackChunkName: "customer" */ "@/modules/customer/views/layout.vue"),
        children: [
            {
                path: '',
                name: 'customer',
                component: () => import(/* webpackChunkName: "customer" */ "@/modules/customer/views/CustomerHome.vue"),
                meta: {
                    // middleware: [Auth]
                },
            },

        ]
    }
]
export default customerRouter