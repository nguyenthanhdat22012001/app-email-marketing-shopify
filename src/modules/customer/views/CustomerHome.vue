<template>
  <div
    :class="{ progressing: progress < 100 }"
    class="flex flex-col justify-center gap-5"
  >
    <v-progress-loading
      class="translate-y-full-reverse"
      v-model="progress"
      label="Syncing customers from Shopify"
      v-if="progress < 100 && !isError"
    />
    <v-show-error
      class="translate-y-half-reverse"
      message="Server Error!!!"
      v-else-if="isError"
    />
    <div v-else class="flex-1 flex flex-col gap-5 overflow-hidden">
      <div
        class="customer-content bg-secondary rounded w-full flex flex-1 flex-col gap-6 shadow-content overflow-hidden"
      >
        <customer-filter />
        <customer-content />
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
import VShowError from "@/components/VShowError.vue";
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
    VShowError,
  },
  data() {
    return {
      isDisabled: false,
    };
  },
  created() {},
  mounted() {
    if (this.isFirstSync) {
      this.fetchCustomersSync();
      this.setProgress(0),
      this.setIsProgress(true);
    } else if (!this.customerList?.data?.length) {
      this.setLoading(true);
      this.fetchCustomer({
        ...this.$route.query,
      });
    }
  },
  methods: {
    ...mapActions({
      fetchCustomers: "customerStore/fetchCustomers",
      fetchCustomersSync: "customerStore/fetchCustomersSync",
    }),

    ...mapMutations({
      setLoading: "customerStore/setLoading",
      setError: "customerStore/setError",
      setProgress: "customerStore/setProgress",
      setIsProgress: "customerStore/setIsProgress",
    }),

    nextPage() {
      if (this.customerList.next_page_url) {
        this.setLoading(true);
        this.fetchCustomer({
          ...this.$route.query,
          page: this.customerList.current_page + 1,
        });
      }
    },
    previousPage() {
      if (this.customerList.prev_page_url) {
        this.setLoading(true);
        this.fetchCustomer({
          ...this.$route.query,
          page: this.customerList.current_page - 1,
        });
      }
    },
    fetchCustomer(payload) {
      this.isDisabled = true;
      this.fetchCustomers(payload)
        .catch((err) => {
          console.log(err);
          this.setError(true);
        })
        .finally(() => {
          this.isDisabled = false;
          this.setLoading(false);
        });
    },
  },
  computed: {
    ...mapGetters({
      progress: "customerStore/getProgress",
      isError: "customerStore/getError",
      customerCount: "customerStore/getCustomerCount",
      customerList: "customerStore/getCustomers",
      isFirstSync: "auth/getFirstSync",
    }),
  },
};
</script>

<style lang="scss" scoped>
.progressing {
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-enter-active {
  transition: 0.4s ease;
  display: none;
}
</style>
