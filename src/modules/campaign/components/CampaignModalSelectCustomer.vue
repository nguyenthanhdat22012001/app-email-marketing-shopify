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
        @click="visible = false"
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
          :prop_list_customer="list_customer"
          @emitSelectAllCustomer="handleSelectAllCustomer"
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
            :disabled="page.prev_page_url == null ? true : false"
            @click="previousPage()"
          >
            <img src="@/assets/icons/arrow-left.svg" />
            Previous
          </v-button>
          <v-button
            variant="secondary"
            class="py-[9px] px-[18px] text-sm font-medium"
            :disabled="page.next_page_url == null ? true : false"
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
import VModal from "@/components/VModal.vue";
import VInput from "@/components/VInput.vue";
import VButton from "@/components/VButton.vue";
import CampaignTableModalSelect from "./CampaignTableModalSelect.vue";
import api from "@/plugins/api";

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
      list_customer: [],
      list_customer_exect: [],
      page: {
        prev_page_url: null,
        next_page_url: null,
        current_page: 1,
      },
    };
  },
  props: {
    value: {
      type: [Boolean],
    },
  },
  methods: {
    handleClickCancel() {
      this.$emit("emitCloseModal");
    },
    handleClickInsert() {
      this.$emit("emitCloseModal");
    },
    //handle pagination
    async nextPage() {
      let current_page = this.page.current_page + 1;
      this.page.current_page = current_page;
      await this.fetchCustomerPagination(current_page);
    },
    async previousPage() {
      let current_page = this.page.current_page - 1;
      this.page.current_page = current_page;
      await this.fetchCustomerPagination(current_page);
    },
    // fetch customer
    async fetchCustomerPagination(page) {
      try {
        let res = await api.CUSTOMER.fetchPagination(page);
        if (res.status) {
          this.list_customer = res.data.data;
          this.page.prev_page_url = res.data.prev_page_url;
          this.page.next_page_url = res.data.next_page_url;
        }
      } catch (error) {
        console.log(error);
      }
    },
    //emit call toggle check all
    handleSelectAllCustomer(is_select_all) {
      this.handlAddOrRemoveCustomers();
    },
    // handle check all customer when pagination if is_checked_all = true
    handlAddOrRemoveCustomers(is_checked_all) {
      let data = [];
      if (is_checked_all) {
        data = this.handleGetIdsCustomers(this.list_customer);
        this.customersSelected = this.removeItemDuplicateInArray([
          ...this.customersSelected,
          ...data,
        ]);
      } else {
        return false;
      }
    },
    // handle get ids list customer
    handleGetIdsCustomers(list_customer) {
      let data = [];
      list_customer.forEach((item) => {
        data.push(item.id);
      });
      return data;
    },

    removeItemDuplicateInArray(arr) {
      return Array.from(new Set(arr));
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
  },
  watch: {
    customersSelected(value) {
      console.log("customersSelected", this.customersSelected);
    },
  },
  created() {
    this.fetchCustomerPagination(this.page.current_page);
  },
};
</script>
<style></style>
