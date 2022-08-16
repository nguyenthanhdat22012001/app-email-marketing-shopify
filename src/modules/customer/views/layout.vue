<template>
  <div
    class="customer-layout flex flex-col px-[55px] py-[35px] gap-5 flex-1 bg-gray-light overflow-hidden"
  >
    <div class="flex justify-between w-full items-center">
      <h1 class="font-extrabold text-xl lead-6">Customer</h1>
      <div class="flex gap-[10px]">
        <v-button
          variant="secondary"
          @click="visibleModalExportAll = true"
          :disabled="isDisabled"
          :class="{ disabled: isDisabled }"
        >
          <img src="@/assets/icons/download.svg" />
          Export CSV
        </v-button>
        <v-button
          variant="primary"
          @click="handleFetchCustomersSync"
          :disabled="isDisabled"
          :class="{ disabled: isDisabled }"
        >
          <img src="@/assets/icons/async.svg" />
          Manual sync
        </v-button>
      </div>
    </div>
    <router-view class="flex-1 overflow-hidden"></router-view>
    <customer-modal-export :export-all="true" v-model="visibleModalExportAll">
      <template #message>
        <p>Export all customers to your email!!</p>
      </template></customer-modal-export
    >
  </div>
</template>

<script>
import VButton from "@/components/VButton.vue";
import CustomerModalExport from "../components/CustomerModalExport.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import notify from "@/helper/notify";
export default {
  components: {
    VButton,
    CustomerModalExport,
  },
  data() {
    return {
      visibleModalExportAll: false,
    };
  },
  created() {},
  methods: {
    ...mapActions({
      fetchCustomersSync: "customerStore/fetchCustomersSync",
    }),
    ...mapMutations({
      setProgress: "customerStore/setProgress",
    }),
    handleFetchCustomersSync() {
      this.$router.push({ query: {} });
      this.setProgress(0);
      this.fetchCustomersSync({
        shop: this.user.domain,
      })
        .then(() => {
          notify.showNotify(
            "success",
            "Success",
            "Sync Customers Successfully!!"
          );
        })
        .catch((err) => {
          this.toastMessageError({
            message: "Server Error!! Try Again",
          });
        })
        .finally(() => {
          this.setProgress(100);
        });
    },
  },
  computed: {
    ...mapGetters({
      progress: "customerStore/getProgress",
      user: "auth/getUser",
    }),
    isDisabled() {
      return this.progress < 100;
    },
  },
};
</script>

<style lang="scss" scoped>
.customer-layout {
  padding: 50px;
}
</style>
