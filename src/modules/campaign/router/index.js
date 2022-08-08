import Auth from '@/middleware/Auth'


const campaignRouter = [
    {
        path: "/campaign",
        component: () => import(/* webpackChunkName: "campaign" */ "@/modules/campaign/views/layout.vue"),
        children: [
            {
                path: '',
                name: 'campaign',
                component: () => import(/* webpackChunkName: "campaign" */ "@/modules/campaign/views/CampaignHome.vue"),
                meta: {
                    // middleware: [Auth]
                },
            },
            {
                path: 'create',
                name: 'campaign/create',
                component: () => import(/* webpackChunkName: "campaign" */ "@/modules/campaign/views/CampaignCreate.vue"),
                meta: {
                    // middleware: [Auth]
                },
            }
        ]
    }
]
export default campaignRouter