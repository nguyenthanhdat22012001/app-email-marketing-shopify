<template>
    <div
      class="campaign--home flex flex-col px-[55px] py-[35px] gap-5 flex-1 bg-gray-light"
    >
      <div class="flex flex-1 flex-col overflow-hidden">
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
          class="overflow-hidden bg-secondary rounded h-full w-full flex flex-col gap-6 mt-5 shadow-content"
        >
          <campaign-filter
            @emitUpdateListCampaign="(value) => (list_campaign = value)"
            @emitSetLoading="(value) => (is_loading = value)"
          />
          <div class="campaign-list h-full overflow-auto">
            <template v-if="!is_loading">
              <campaign-table
                v-if="list_campaign.length > 0"
                :prop_list_campaign="list_campaign"
              />
              <div
                v-else
                class="h-[200px] flex justify-center items-center font-medium text-base text-muted"
              >
                No records
              </div>
            </template>
            <template v-else>
              <v-loading />
            </template>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import VButton from "@/components/VButton.vue";
import CampaignFilter from "../components/CampaignFilter.vue";
import CampaignTable from "../components/CampaignTable.vue";
import VLoading from "@/components/VLoading.vue";

import { pusher } from "@/plugins";
import api from "@/plugins/api";
import { mapMutations } from "vuex";

export default {
  components: {
    VButton,
    CampaignFilter,
    CampaignTable,
    VLoading,
  },
  data() {
    return {
      list_campaign: [],
      is_loading: false,
    };
  },
  methods: {
    ...mapMutations({
      setLoading: "setLoading",
    }),
    subscribe() {
      pusher.subscribe("campaigns");
      pusher.bind("send_mail", (data) => {
        this.handleUpdateListCampaign(data.payload.original);
      });
    },
    async fetchCampaigns() {
      try {
        this.is_loading = true;
        let res = await api.CAMPAIGN.fetch();
        if (res.status == 200) {
          this.list_campaign = res.data;
        }
      } catch (error) {
        console.log(error);
      }
      this.is_loading = false;
    },
    handleUpdateListCampaign(data) {
      let list_campaign = this.list_campaign;

      for (let index = 0; index < list_campaign.length; index++) {
        if (list_campaign[index].id == data.campaignId) {
          list_campaign[index].process = data.processing;
          list_campaign[index].status = data.status;
          list_campaign[index].send_email_done = data.mail_send_done;
          list_campaign[index].send_email_fail = data.mail_send_failed;
          break;
        }
      }

      this.list_campaign = list_campaign;
    },
  },
  async created() {
    // await this.fetchCampaigns();
  },
  mounted() {
    this.subscribe();
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
