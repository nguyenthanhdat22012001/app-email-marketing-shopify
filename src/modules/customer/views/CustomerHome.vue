<template>
  <div :class="{ progressing: progress < 100 }" class="flex flex-col gap-5">
    <v-progress-loading
      class="translate-y-full-180deg"
      v-model="progress"
      label="Syncing customers from Shopify"
      v-if="progress <= 100"
    />
    <div v-else class="flex-1 flex flex-col gap-5">
      <div
        class="customer-content bg-secondary rounded h-full w-full flex flex-col gap-6 shadow-content"
      >
        <customer-filter />
        <customer-content :page="page" :size="size" />
      </div>
      <div class="flex justify-center">
        <v-button
          variant="secondary"
          class="py-[9px] px-[18px] text-sm font-medium"
          @click="page--"
          :disabled="page <= 1"
        >
          <img src="@/assets/icons/arrow-left.svg" />
          Previous
        </v-button>
        <v-button
          variant="secondary"
          class="py-[9px] px-[18px] text-sm font-medium"
          @click="page++"
          :disabled="page >= Math.floor(customerCount / size)"
        >
          Next
          <img src="@/assets/icons/arrow-right.svg" />
        </v-button>
      </div>
    </div>
  </div>
</template>

<script>
import VProgressLoading from "@/components/VProgressLoading.vue";
import CustomerFilter from "../components/CustomerFilter.vue";
import CustomerContent from "../components/CustomerContent.vue";
import VButton from "@/components/VButton.vue";
import { pusher } from "@/plugins";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  components: {
    VProgressLoading,
    CustomerFilter,
    CustomerContent,
    VButton,
  },
  data() {
    return {
      increaseProgress: null,
      page: 1,
      size: 10,
    };
  },
  created() {
    this.fetchCustomers().then((res) => {
      if (res?.data?.length) {
        if (this.progress < 100) {
          this.increaseProgress = setInterval(() => {
            const rand = 1 + Math.floor(Math.random() * 10);
            this.setProgress(this.progress + rand);
          }, 100);
        }
      }
    });
    // this.subscribe();
  },
  methods: {
    ...mapActions({
      fetchCustomersSync: "customerStore/fetchCustomersSync",
      fetchCustomers: "customerStore/fetchCustomers",
    }),
    ...mapMutations({
      setProgress: "setProgress",
    }),
    subscribe() {
      pusher.subscribe("customers_syncing");
      pusher.bind("syncing_customer", (data) => {
        console.log(data);
        if (this.progress < 100) this.setProgress(Number(data.message));
        if (data.message >= 100) {
          this.setProgress(100);
          pusher.unsubscribe("customers_syncing");
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      progress: "getProgress",
      customerCount: "customerStore/getCustomerCount",
    }),
  },
  watch: {
    progress(value) {
      if (value > 100) {
        clearInterval(this.increaseProgress);
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.increaseProgress);
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
