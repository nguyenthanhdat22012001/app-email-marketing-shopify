<template>
  <div :class="{ progressing: progress < 100 }" class="flex flex-col gap-5">
    <v-progress-loading
      class="translate-y-full-180deg"
      v-model="progress"
      label="Syncing customers from Shopify"
      v-if="progress < 100"
    />
    <div
      class="customer-content bg-secondary rounded h-full w-full flex flex-col gap-6 shadow-content"
      v-else
    >
      <customer-filter />
      <customer-content />
    </div>
    <div class="flex justify-center">
      <v-button
        variant="secondary"
        class="py-[9px] px-[18px] text-sm font-medium"
      >
        <img src="@/assets/icons/arrow-left.svg" />
        Previous
      </v-button>
      <v-button
        variant="secondary"
        class="py-[9px] px-[18px] text-sm font-medium"
      >
        Next
        <img src="@/assets/icons/arrow-right.svg" />
      </v-button>
    </div>
  </div>
</template>

<script>
import Pusher from "pusher-js";

import VProgressLoading from "@/components/VProgressLoading.vue";
import CustomerFilter from "../components/CustomerFilter.vue";
import CustomerContent from "../components/CustomerContent.vue";
import VButton from "@/components/VButton.vue";
import { mapActions } from "vuex";

export default {
  components: {
    VProgressLoading,
    CustomerFilter,
    CustomerContent,
    VButton,
  },
  data() {
    return {
      progress: 100,
      increaseProgress: null,
    };
  },
  created() {
    this.fetchCustomer()
      .then(() => {
        this.progress = 100;
      })
      .catch(() => {
        this.subscribe();
      });
  },
  methods: {
    ...mapActions({
      fetchCustomer: "customerStore/fetchCustomer",
    }),
    subscribe() {
      let pusher = new Pusher(process.env.VUE_APP_PUSHER_APP_KEY, {
        cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER,
      });
      pusher.subscribe("customers_syncing");
      pusher.bind("syncing_customer", (data) => {
        console.log(data);
        this.progress = Number(data.message);
        if (data.message >= 100) {
          pusher.unsubscribe("syncing_customer");
        }
      });
    },
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
