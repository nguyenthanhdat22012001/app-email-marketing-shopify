import Auth from '@/middleware/Auth'


const campaignRouter = [
    {
        path: "/campaign",
        component: () => import(/* webpackChunkName: "campaign" */ "@/modules/campaign/views/layout.vue"),
        meta: {
            enterClass: 'animate__animated animate__fadeInUp',
            leaveClass: 'animate__animated animate__fadeOutDown', 
        },
        children: [
            {
                path: '',
                name: 'campaign',
                component: () => import(/* webpackChunkName: "campaign" */ "@/modules/campaign/views/CampaignHome.vue"),
                meta: {
                    middleware: [Auth],

                },
            },
            {
                path: 'create',
                name: 'campaign/create',
                component: () => import(/* webpackChunkName: "campaign" */ "@/modules/campaign/views/CampaignCreate.vue"),
                meta: {
                    middleware: [Auth],
                    enterClass: 'animate__animated animate__fadeInRight',
                    leaveClass: 'animate__animated animate__fadeOutLeft',
                    enterClassParent: 'animate__animated animate__fadeInLeft',
                    leaveClassParent: 'animate__animated animate__fadeOutRight',
                },
            }
        ]
    }
]
export default campaignRouter