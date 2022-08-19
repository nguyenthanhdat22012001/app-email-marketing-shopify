<!-- EX
    <campaign-table-modal-select
          :prop_list_customer="list_customer"
          :prop_total_customers="total_customers"
        />
-->

<template>
  <v-table align="center">
    <template #table_head_tr>
      <th class="py-5 pl-[30px]">
        <div class="flex gap-2">
          <template v-if="store_select_any">
            <v-checkbox
              :prop_is_checkbox_custom="true"
              scope="col"
              v-model="select_any"
              prop_input_value="select_any"
              @input="handleClearCustomers"
            />
          </template>
          <template v-else>
            <v-checkbox
              :prop_is_checkbox_custom="true"
              scope="col"
              v-model="select_all"
              prop_input_value="all"
              @input="handleClearCustomerExcept"
            />
          </template>
        </div>
      </th>
      <template>
        <th scope="col" class="py-5 pr-3.5">Customer name</th>
        <th scope="col" class="py-5 pr-3.5">Phone</th>
        <th scope="col" class="py-5 pr-3.5">Email</th>
        <th scope="col" class="py-5 pr-3.5">Create date</th>
      </template>
    </template>

    <template #table_body v-if="prop_list_customer.length > 0">
      <tr
        class="border-b border-[#EBEBF0]"
        v-for="customer in prop_list_customer"
        :key="customer.id"
        :class="handleReturnBackground(customer.id)"
      >
        <td>
          <template v-if="select_all">
            <v-checkbox
              scope="col"
              :prop_input_value="customer.id"
              class="py-[22px] pl-[30px] translate-y-2/4"
              :dataId="customer.id"
              :value="!handleCheckCustomerHasCustomerExect(customer.id)"
              @input="(value) => handleAddCustomerEcept(value, customer.id)"
            />
          </template>
          <template v-else>
            <v-checkbox
              scope="col"
              :prop_input_value="customer.id"
              class="py-[22px] pl-[30px] translate-y-2/4"
              v-model="list_customer_selected"
            />
          </template>
        </td>
        <td class="py-5 pr-3.5">
          <v-avatar
            :name="getFullName(customer.first_name, customer.last_name)"
            class="mr-3"
          />{{ getFullName(customer.first_name, customer.last_name) }}
        </td>
        <td class="py-5 pr-3.5">{{ customer.phone }}</td>
        <td class="py-5 pr-3.5 text-primary">{{ customer.email }}</td>
        <td class="py-5 pr-3.5 text-muted">
          {{ convertDateTime(customer.created_at) }}
        </td>
      </tr>
    </template>
  </v-table>
</template>

<script>
import VTable from "@/components/VTable.vue";
import VCheckbox from "@/components/VCheckbox.vue";
import VAvatar from "@/components/VAvatar.vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  components: {
    VTable,
    VCheckbox,
    VAvatar,
  },
  props: {
    prop_list_customer: {
      type: Array,
      default(rawProps) {
        return [];
      },
    },
    prop_total_customers: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    ...mapActions("campaignStore", [
      "handleUpdateNumberCustomerSelectTempDataCustomer",
    ]),
    ...mapMutations("campaignStore", ["setTempDataCustomer"]),
    hanldeAddCustomerExect(is_check, id) {
      if (this.$store.state.campaignStore.temp_data_customer.select_all) {
        if (!is_check) {
          this.setTempDataCustomer({
            list_customer_exect: [
              ...this.$store.state.campaignStore.temp_data_customer
                .list_customer_exect,
              id,
            ],
          });
        } else {
          let newData =
            this.$store.state.campaignStore.temp_data_customer.list_customer_exect.filter(
              (item) => item != id
            );
          this.setTempDataCustomer({ list_customer_exect: newData });
        }
      }
      this.handleUpdateNumberCustomerSelectTempDataCustomer(
        this.prop_total_customers
      );
    },
    handleClearCustomerExect() {
      if (
        this.$store.state.campaignStore.temp_data_customer.list_customer_exect
          .length != 0
      ) {
        this.setTempDataCustomer({ list_customer_exect: [] });
      }
      this.handleUpdateNumberCustomerSelectTempDataCustomer(
        this.prop_total_customers
      );
    },
    handleCheckCustomerHasCustomerExect(id) {
      let list_customer_exect =
        this.$store.state.campaignStore.temp_data_customer.list_customer_exect;
      let is_check = list_customer_exect.find((item) => item == id);
      return is_check ? true : false;
    },
    handleCheckCustomerHasCustomerSelected(id) {
      let list_customer_selected =
        this.$store.state.campaignStore.temp_data_customer
          .list_customer_selected;
      let is_check = list_customer_selected.find((item) => item == id);
      return is_check ? true : false;
    },
    handleClearCustomers(value) {
      console.log(value);
      this.setTempDataCustomer({ list_customer_selected: [] });
      this.handleUpdateNumberCustomerSelectTempDataCustomer(
        this.prop_total_customers
      );
    },
    handleReturnBackground(id) {
      if (this.select_all) {
        let is_unselected = this.handleCheckCustomerHasCustomerExect(id);
        if (is_unselected) {
          return "bg-white";
        }
        return "bg-blues-light";
      } else {
        let is_selected = this.handleCheckCustomerHasCustomerSelected(id);
        if (is_selected) {
          return "bg-blues-light";
        } else {
          return "bg-white";
        }
      }
    },
  },
  computed: {
    ...mapState("campaignStore", {
      store_select_any: (state) => state.temp_data_customer.select_any,
    }),
    list_customer_selected: {
      get() {
        return this.$store.state.campaignStore.temp_data_customer
          .list_customer_selected;
      },
      set(value) {
        this.$store.commit("campaignStore/setTempDataCustomer", {
          list_customer_selected: value,
        });
        
        if ([...value].length > 0) {
          if (!this.store_select_any) {
            this.$store.commit("campaignStore/setTempDataCustomer", {
              select_any: true,
            });
          }
        } else {
          this.$store.commit("campaignStore/setTempDataCustomer", {
            select_any: false,
          });
        }
        this.handleUpdateNumberCustomerSelectTempDataCustomer(
          this.prop_total_customers
        );
      },
    },
    list_customer_exect: {
      get() {
        return this.$store.state.campaignStore.temp_data_customer
          .list_customer_exect;
      },
      set(value) {
        this.$store.commit("campaignStore/setTempDataCustomer", {
          list_customer_exect: value,
        });
      },
    },
    select_all: {
      get() {
        return this.$store.state.campaignStore.temp_data_customer.select_all;
      },
      set(value) {
        if (value) {
          this.$store.commit("campaignStore/setTempDataCustomer", {
            select_all: true,
          });
        } else {
          this.$store.commit("campaignStore/setTempDataCustomer", {
            select_all: false,
          });
        }
      },
    },
    select_any: {
      get() {
        return this.$store.state.campaignStore.temp_data_customer.select_any;
      },
      set(value) {
        this.$store.commit("campaignStore/setTempDataCustomer", {
          select_any: value,
        });
      },
    },
  },
};
</script>
<style lang="scss" scoped></style>
