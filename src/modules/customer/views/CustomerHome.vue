<template>
  <div :class="{ progressing: progress < 100 }">
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
      <div class="customer-content--body"></div>
    </div>
  </div>
</template>

<script>
import Pusher from "pusher-js";

import VProgressLoading from "@/components/VProgressLoading.vue";
import CustomerFilter from "../components/CustomerFilter.vue";
import CustomerContent from "../components/CustomerContent.vue";
import { mapActions } from "vuex";

export default {
  components: {
    VProgressLoading,
    CustomerFilter,
    CustomerContent,
  },
  data() {
    return {
      progress:100,
      increaseProgress: null,
    };
  },
  created() {
    this.fetchCustomer()
      // .then(() => {
      //   this.progress = 100;
      // })
      // .catch(() => {
      //   this.subscribe();
      // });
  },
  mounted() {},
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
