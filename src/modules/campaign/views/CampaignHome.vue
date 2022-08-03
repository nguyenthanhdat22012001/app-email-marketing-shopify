<template>
  <div class="flex flex-col px-[55px] py-[35px] gap-5 flex-1 bg-gray-light">
    <div>
      <div class="flex justify-between w-full items-center">
        <h1 class="font-extrabold text-xl lead-6">Campaign</h1>
        <div class="flex gap-[10px]">
          <v-button
            variant="primary"
            @click="$router.push({ name: 'campaign/create' })"
          >
            <img src="@/assets/icons/plus.svg" />
            Create new campaign
          </v-button>
        </div>
      </div>
      <div
        class="customer-content bg-secondary rounded h-full w-full flex flex-col gap-6 mt-5"
      >
        <campaign-filter />
        <div class="pl-5">
          <campaign-table :prop_list_campaign="list_campaign" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VButton from "@/components/VButton.vue";
import CampaignFilter from "../components/CampaignFilter.vue";
import CampaignTable from "../components/CampaignTable.vue";
import { pusher } from "@/plugins";
import api from "@/plugins/api";

export default {
  components: {
    VButton,
    CampaignFilter,
    CampaignTable,
  },
  data() {
    return {
      page: 1,
      size: 10,
      list_campaign: [],
    };
  },
  methods: {
    subscribe() {
      pusher.subscribe("campaigns");
      pusher.bind("send_mail", (data) => {
        console.log("campaigns", data);
        // this.setProgress(Number(data.message));
        // if (data.message >= 100) {
        //   pusher.unsubscribe("customers_syncing");
        // }
      });
    },
    async fetchCampaigns() {
      try {
        let res = await api.CAMPAIGN.fetch();
        // console.log("res", res);
        if (res.status == 200) {
          this.list_campaign = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.fetchCampaigns();
  },
};
</script>

<style lang="scss" scoped>
.progressing {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
