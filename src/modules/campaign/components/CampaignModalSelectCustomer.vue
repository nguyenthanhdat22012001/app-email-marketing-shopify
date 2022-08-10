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
        @click="handleClickCancel"
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
          @input="inpputSearchCustomer"
        />
      </div>
      <div class="mt-[30px] overflow-auto flex-1">
        <campaign-table-modal-select
          :prop_list_customer="list_customer"
          :prop_total_customers="total_customers"
          @emitHandleUpdateDataCustomerInModal="handleUpdateDataCustomerInModal"
        />
      </div>
      <div class="pr-[22px] pl-[30px] mt-6 flex justify-between items-center">
        <div class="text-gray-light">
          Customers has been selected:
          {{ data_customer.number_customer_select }}
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
            >Insert</v-button
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
      list_customer: [],
      data_customer: {
        number_customer_select: 0,
        list_customer_selected: [],
        list_customer_exect: [],
        customers_avatar: [],
        select_all: false,
      },
      total_customers: 0,
      page: {
        prev_page_url: null,
        next_page_url: null,
        current_page: 1,
      },
      filters: {
        is_filter: false,
        debounce: null,
        keywords: "",
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
    async handleClickInsert() {
      this.data_customer = {
        ...this.data_customer,
      };

      if (this.data_customer.number_customer_select > 0) {
        await this.fetchCustomerShowAvatars();
      } else {
        this.data_customer.customers_avatar = [];
      }

      this.$emit("emitHandleAddAvatarSendToCustomer", this.data_customer);
      this.visible = false;
    },
    // fetch customer
    async fetchCustomerShowAvatars() {
      let data = {
        limit: 3,
      };
      if (this.data_customer.select_all) {
        data = {
          ...data,
          except_customer: this.data_customer.list_customer_exect.toString(),
        };
      } else {
        data = {
          ...data,
          list_customer: this.data_customer.list_customer_selected.toString(),
        };
      }
      try {
        let res = await api.CUSTOMER.getCustomerShowAvatars(data);
        if (res.status) {
          this.data_customer.customers_avatar = res.data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    //handle pagination
    async nextPage() {
      let current_page = this.page.current_page + 1;
      this.page.current_page = current_page;

      if (this.filters.is_filter) {
        await this.fetchFilterCustomerPagination(current_page);
      } else {
        await this.fetchCustomerPagination(current_page);
      }
    },
    async previousPage() {
      let current_page = this.page.current_page - 1;
      this.page.current_page = current_page;

      if (this.filters.is_filter) {
        await this.fetchFilterCustomerPagination(current_page);
      } else {
        await this.fetchCustomerPagination(current_page);
      }
    },
    // fetch customer
    async fetchCustomerPagination(page) {
      try {
        let res = await api.CUSTOMER.fetchPagination(page);
        if (res.status) {
          this.list_customer = res.data.data;
          this.page.prev_page_url = res.data.prev_page_url;
          this.page.next_page_url = res.data.next_page_url;
          if (this.total_customers != res.total_customers) {
            this.total_customers = res.total_customers;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    //handle update  data_customer
    handleUpdateDataCustomerInModal(payload) {
      this.data_customer = payload;
      // console.log("data_customer", this.data_customer);
    },
    // hanlde validate input search
    handleValidateSearch(value) {
      let text_search = value.trim();
      if (text_search.length != 0) {
        if (!this.filters.is_filter) {
          this.filters.is_filter = true;
        }
      } else {
        if (this.filters.is_filter) {
          this.filters.is_filter = false;
        }
      }
      this.filters.keywords = text_search;
      console.log(this.filters);
    },
    // function delay get value for event input search
    async inpputSearchCustomer(value) {
      clearTimeout(this.filters.debounce);
      this.filters.debounce = setTimeout(async () => {
        this.handleValidateSearch(value);

        this.page = {
          prev_page_url: null,
          next_page_url: null,
          current_page: 1,
        };

        if (this.filters.is_filter) {
          await this.fetchFilterCustomerPagination(this.current_page);
        } else {
          await this.fetchCustomerPagination(this.current_page);
        }
      }, 500);
    },
    // fetch customer
    async fetchFilterCustomerPagination(page) {
      let data = {
        keywords: this.filters.keywords,
        page: page,
      };
      try {
        let res = await api.CUSTOMER.filter(data);
        if (res.status) {
          this.list_customer = res.data.data;
          this.page.prev_page_url = res.data.prev_page_url;
          this.page.next_page_url = res.data.next_page_url;
        }
      } catch (error) {
        console.log(error);
      }
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
  created() {
    this.fetchCustomerPagination(this.page.current_page);
  },
};
</script>
<style></style>
