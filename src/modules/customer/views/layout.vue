<template>
  <div
    class="customer-layout flex flex-col px-[55px] py-[35px] gap-5 flex-1 bg-gray-light"
  >
    <div class="flex justify-between w-full items-center">
      <h1 class="font-extrabold text-xl lead-6">Customer</h1>
      <div class="flex gap-[10px]">
        <v-button variant="secondary" @click="visibleModalExportAll = true">
          <img src="@/assets/icons/download.svg" />
          Export CSV
        </v-button>
        <v-button variant="primary" @click="fetchCustomerSync">
          <img src="@/assets/icons/async.svg" />
          Manual sync
        </v-button>
      </div>
    </div>
    <router-view class="flex-1"></router-view>
    <customer-modal-export v-model="visibleModalExportAll">
      <template #message>
        <p>Export all customers to your email!!</p>
      </template></customer-modal-export
    >
  </div>
</template>

<script>
import VButton from "@/components/VButton.vue";
import CustomerModalExport from "../components/CustomerModalExport.vue";
import { mapActions } from "vuex";
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
  methods: {
    ...mapActions({
      fetchCustomerSync: "customerStore/fetchCustomersSync",
    }),
  },
};
</script>

<style lang="scss" scoped>
.customer-layout {
  padding: 50px;
}
</style>
