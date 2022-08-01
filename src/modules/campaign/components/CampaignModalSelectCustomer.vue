<!-- EX
    <campaign-modal-select-customer
      v-model="visible"
      @emitCloseModal="handleCloseModal"
    >
    </campaign-modal-select-customer>
-->
<template>
  <v-modal v-model="visible" :backdrop="false">
    <div class="relative w-[960px] pt-[30px] pb-[18px] h-[90vh] flex flex-col">
      <h2 class="pr-[22px] pl-[30px] text-2xl font-semibold text-dark">
        Select customers to send email
      </h2>
      <a
        class="absolute cursor-pointer top-0 right-0 pt-6 pr-[22px]"
        @click="$emit('emitCloseModal')"
      >
        <img src="@/assets/icons/close.svg" alt="" />
      </a>
      <div
        class="search-bar mr-[22px] ml-[30px] flex gap-[10px] rounded border border-solid border-light p-[10px] mt-7"
      >
        <img src="@/assets/icons/search.svg" alt="" />
        <v-input
          placeholder="Search customers by name, phone, email..."
          class="flex-1"
        />
      </div>
      <div class="mt-[30px] overflow-auto flex-1">
        <campaign-table-modal-select
          v-model="customersSelected"
          :page="page"
          :number="number"
        />
      </div>
      <div class="pr-[22px] pl-[30px] mt-6 flex justify-between items-center">
        <div class="text-gray-light">
          Customers has been selected: {{ customersSelected.length }}
        </div>
        <div class="flex">
          <v-button
            variant="secondary"
            class="py-[9px] px-[18px] text-sm font-medium"
            :disabled="page == 1"
            @click="previousPage()"
          >
            <img src="@/assets/icons/arrow-left.svg" />
            Previous
          </v-button>
          <v-button
            variant="secondary"
            class="py-[9px] px-[18px] text-sm font-medium"
            :disabled="page >= Math.floor(getCustomers.length / number)"
            @click="nextPage()"
          >
            Next
            <img src="@/assets/icons/arrow-right.svg" />
          </v-button>
        </div>
        <div class="flex gap-4">
          <v-button
            variant="secondary"
            class="py-[6px] px-[22px] text-sm font-medium"
            @click="handleClickCancel"
            >Cancel</v-button
          >
          <v-button
            variant="primary"
            class="py-[6px] px-[22px] text-sm font-medium"
            @click="handleClickInsert"
            >Inserrt</v-button
          >
        </div>
      </div>
    </div>
  </v-modal>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";

import VModal from "@/components/VModal.vue";
import VInput from "@/components/VInput.vue";
import VButton from "@/components/VButton.vue";
import CampaignTableModalSelect from "./CampaignTableModalSelect.vue";

export default {
  components: {
    VModal,
    VInput,
    VButton,
    CampaignTableModalSelect,
  },
  data() {
    return {
      customersSelected: [],
      page: 1,
      number: 10,
    };
  },
  mounted() {
    this.customersSelected = this.getCustomersSelected;
  },
  props: {
    value: {
      type: [Boolean],
    },
  },
  methods: {
    ...mapMutations({
      setCustomersSelected: "campaignStore/setCustomersSelected",
    }),
    handleClickCancel() {
      this.$emit("emitCloseModal");
      this.customersSelected = this.getCustomersSelected;
    },
    handleClickInsert() {
      this.$emit("emitCloseModal");
      this.setCustomersSelected(
        (state) => (state.customersSelected = this.customersSelected)
      );
    },
    nextPage() {
      this.page++;
    },
    previousPage() {
      this.page--;
    },
  },
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    ...mapGetters({
      getCustomersSelected: "campaignStore/getCustomersSelected",
      getCustomers: "customerStore/getCustomers",
    }),
  },
};
</script>
<style></style>
