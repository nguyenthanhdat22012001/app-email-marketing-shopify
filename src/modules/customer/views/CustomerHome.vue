<template>
  <div :class="{ progressing: progress < 100 }" class="flex flex-col gap-5">
    <v-progress-loading
      class="translate-y-full-180deg"
      v-model="progress"
      label="Syncing customers from Shopify"
      v-if="progress < 100"
    />
    <div v-else class="flex-1 flex flex-col gap-5">
      <div
        class="customer-content bg-secondary rounded h-full w-full flex flex-col gap-6 shadow-content"
      >
        <customer-filter />
        <customer-content :page="page" :size="size" />
      </div>
      <div class="flex justify-center items-center gap-2">
        <v-button
          variant="secondary"
          class="py-[9px] px-[18px] text-sm font-medium w-[110px] justify-center"
          @click="previousPage"
          :disabled="customerList.current_page <= 1 || isDisabled"
        >
          <img src="@/assets/icons/arrow-left.svg" />
          Previous
        </v-button>
        <span class="text-sm font-medium">{{ customerList.current_page }}</span>
        <v-button
          variant="secondary"
          class="py-[9px] px-[18px] text-sm font-medium w-[110px] justify-center"
          @click="nextPage()"
          :disabled="!customerList.next_page_url || isDisabled"
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
      isDisabled: true,
    };
  },
  created() {
    this.fetchCustomer(this.page);
  },
  mounted() {},
  methods: {
    ...mapActions({
      fetchCustomersSync: "customerStore/fetchCustomersSync",
      fetchCustomers: "customerStore/fetchCustomers",
    }),

    ...mapMutations({
      setProgress: "setProgress",
    }),

    nextPage() {
      this.fetchCustomer(this.customerList.current_page + 1);
    },
    previousPage() {
      this.fetchCustomer(this.customerList.current_page - 1);
    },
    fetchCustomer(page) {
      this.isDisabled = true;
      this.fetchCustomers(page)
        .then((res) => {
          console.log(res);
          if (res?.data?.length) {
            if (this.progress < 100) {
              this.increaseProgress = setInterval(() => {
                const rand = 1 + Math.floor(Math.random() * 10);
                this.setProgress(this.progress + rand);
              }, 100);
            }
          }
        })
        .finally(() => {
          this.isDisabled = false;
        });
    },
  },
  computed: {
    ...mapGetters({
      progress: "getProgress",
      customerCount: "customerStore/getCustomerCount",
      customerList: "customerStore/getCustomers",
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
