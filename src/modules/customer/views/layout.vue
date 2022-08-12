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
          :disabled="progress < 100"
        >
          <img src="@/assets/icons/download.svg" />
          Export CSV
        </v-button>
        <v-button
          variant="primary"
          @click="fetchCustomersSync"
          :disabled="progress < 100"
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
import { mapActions, mapGetters } from "vuex";
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
    ...mapGetters({
      progress: "customerStore/getProgress",
    }),
    ...mapActions({
      fetchCustomersSync: "customerStore/fetchCustomersSync",
    }),
   
  },
  computed: {
    mapGetters,
  },
};
</script>

<style lang="scss" scoped>
.customer-layout {
  padding: 50px;
}
</style>
