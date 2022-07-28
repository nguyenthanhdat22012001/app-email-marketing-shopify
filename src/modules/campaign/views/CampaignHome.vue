<template>
  <div class="flex flex-col px-[55px] py-[35px] gap-5 flex-1 bg-gray-light">
    <campaign-modal-send-mail v-model="visible"></campaign-modal-send-mail>
    <div :class="{ progressing: progress <= 100 }">
      <v-progress-loading
        class="translate-y-full-180deg"
        v-model="progress"
        label="Syncing customers from Shopify"
        v-if="progress <= 100"
      />
      <div class="flex justify-between w-full items-center">
        <h1 class="font-extrabold text-xl lead-6">Campaign</h1>
        <div class="flex gap-[10px]">
          <v-button variant="primary" @click="$router.push({name:'campaign/create'})">
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
          <campaign-table />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VButton from "@/components/VButton.vue";
import VProgressLoading from "@/components/VProgressLoading.vue";
import CampaignFilter from "../components/CampaignFilter.vue";
import CampaignTable from "../components/CampaignTable.vue";
import CampaignModalSendMail from "../components/CampaignModalSendMail.vue";
export default {
  components: {
    VButton,
    VProgressLoading,
    CampaignFilter,
    CampaignTable,
    CampaignModalSendMail,
  },
  data() {
    return {
      progress: 101,
      increaseProgress: null,
      visible: true
    };
  },
  mounted() {
    this.increaseProgress = setInterval(() => {
      this.progress++;
    }, 50);
  },
  watch: {
    progress(value) {
      if (value > 100) {
        clearInterval(this.increaseProgress);
      }
    },
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
