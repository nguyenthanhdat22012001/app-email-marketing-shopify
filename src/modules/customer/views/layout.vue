<template>
  <transition>
    <div
      class="customer-layout flex flex-col px-[55px] py-[35px] gap-5 flex-1 bg-gray-light overflow-hidden"
    >
      <div class="flex justify-between w-full items-center">
        <h1 class="font-extrabold text-xl lead-6">Customer</h1>
        <div class="flex gap-[10px]">
          <v-button
            variant="secondary"
            @click="visibleModalExportAll = true"
            :disabled="isProgress"
            :class="{ disabled: isProgress }"
          >
            <img src="@/assets/icons/download.svg" />
            Export CSV
          </v-button>
          <v-button
            variant="primary"
            @click="handleFetchCustomersSync"
            :disabled="isProgress"
            :class="{ disabled: isProgress }"
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
  </transition>
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
  mounted() {
    if (this.progress >= 100) {
      this.setIsProgress(false);
    }
  },
  methods: {
    ...mapActions({
      fetchCustomersSync: "customerStore/fetchCustomersSync",
    }),
    ...mapMutations({
      setProgress: "customerStore/setProgress",
      setIsProgress: "customerStore/setIsProgress",
    }),
    handleFetchCustomersSync() {
      this.$router.push({ query: {} });
      this.setIsProgress(true);

      this.fetchCustomersSync()
        .then(() => {
          this.setProgress(0);
          notify.showNotify("success", "Success", "Start Sync Customers");
        })
        .catch((err) => {
          this.toastMessageError({
            message: "Server Error!! Try Again",
          });
          this.setProgress(100);
          this.setIsProgress(false);
        });
    },
  },
  computed: {
    ...mapGetters({
      progress: "customerStore/getProgress",
      isProgress: "customerStore/getIsProgress",
      user: "auth/getUser",
    }),
  },
  watch: {
    progress(val) {
      if (val >= 100) {
        this.setIsProgress(false);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
