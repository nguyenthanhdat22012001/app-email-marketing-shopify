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
      increaseProgress: null,
      isDisabled: true,
    };
  },
  created() {
    this.fetchCustomer({
      ...this.$route.query,
    })
  },
  mounted() {
    if (this.progress < 95) {
      this.increaseProgress = setInterval(() => {
        const rand = 1 + Math.floor(Math.random() * 10);
        if (this.progress + rand >= 100) {
          this.setProgress(98);
          clearInterval(this.increaseProgress);
        } else this.setProgress(this.progress + rand);
      }, 100);
    }
  },
  methods: {
    ...mapActions({
      fetchCustomers: "customerStore/fetchCustomers",
    }),

    ...mapMutations({
      setLoading: "customerStore/setLoading",
      setError: "customerStore/setError",
      setProgress: "setProgress",
    }),

    nextPage() {
      this.setLoading(true);
      this.fetchCustomers({
        ...this.$route.query,
        page: this.customerList.current_page + 1,
      }).finally(() => this.setLoading(false));
    },
    previousPage() {
      this.setLoading(true);
      this.fetchCustomers({
        ...this.$route.query,
        page: this.customerList.current_page - 1,
      }).finally(() => this.setLoading(false));
    },
    fetchCustomer(page) {
      this.isDisabled = true;
      this.fetchCustomers(page)
        .then((res) => {
          console.log(res);
          if (res?.data) {
            this.setProgress(100);
            clearInterval(this.increaseProgress);
          }
        })
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
      progress: "getProgress",
      isError: "customerStore/getError",
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
