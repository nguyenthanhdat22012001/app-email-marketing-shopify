import Auth from '@/middleware/Auth'


const campaignRouter = [
    {
        path: "/campaign",
        component: () => import(/* webpackChunkName: "campaign" */ "@/modules/campaign/views/layout.vue"),
        meta: {
            middleware: [Auth]
        },
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
    }
]
export default campaignRouter