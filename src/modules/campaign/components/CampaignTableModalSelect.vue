<!-- EX
   <campaign-table-modal-select/>
-->

<template>
  <v-table align="center">
    <template #table_head_tr>
      <th class="py-5 pl-[30px]">
        <div class="flex gap-2">
          <template v-if="select_any">
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
  data() {
    return {
      list_customer_selected: [],
      list_customer_exect: [],
      select_all: false,
      select_any: false,
    };
  },
  methods: {
    handleAddCustomerEcept(is_check, id) {
      if (this.select_all) {
        if (!is_check) {
          this.list_customer_exect = [...this.list_customer_exect, id];
        } else {
          let newData = this.list_customer_exect.filter((item) => item != id);
          this.list_customer_exect = newData;
        }
      }
      this.handleUpdateDataCustomerInModal();
    },
    handleClearCustomerExcept() {
      if (this.list_customer_exect.length != 0) {
        this.list_customer_exect = [];
      }
      this.handleUpdateDataCustomerInModal();
    },
    handleCheckCustomerHasCustomerExect(id) {
      let list_customer_exect = this.list_customer_exect;
      let is_check = list_customer_exect.find((item) => item == id);
      return is_check ? true : false;
    },
    handleCheckCustomerHasCustomerSelected(id) {
      let list_customer_selected = this.list_customer_selected;
      let is_check = list_customer_selected.find((item) => item == id);
      return is_check ? true : false;
    },
    handleClearCustomers() {
      this.list_customer_selected = [];
      this.handleUpdateDataCustomerInModal();
    },
    handleUpdateDataCustomerInModal() {
      let total = 0;
      if (this.select_all) {
        total = this.prop_total_customers - this.list_customer_exect.length;
      } else {
        total = 0;
      }

      if (this.select_any) {
        total = this.list_customer_selected.length;
      }
      let data = {
        number_customer_select: total,
        list_customer_selected: this.list_customer_selected,
        list_customer_exect: this.list_customer_exect,
        select_all: this.select_all,
      };

      this.$emit("emitHandleUpdateDataCustomerInModal", data);
    },

    handleReturnBackDataCustomerOld(data) {
      this.list_customer_selected = data.list_customer_selected;
      this.list_customer_exect = data.list_customer_exect;
      this.number_customer_select = data.number_customer_select;
      this.select_all = data.select_all;
      if (data.number_customer_select.length > 0) {
        if (!this.select_any) {
          this.select_any = true;
        }
      }
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
  watch: {
    list_customer_selected(value) {
      if (value.length > 0) {
        if (!this.select_any) {
          this.select_any = true;
        }
      } else {
        this.select_any = false;
      }
      this.handleUpdateDataCustomerInModal();
    },
  },
  mounted() {
    this.$eventBus.$on(
      "eventBusReturnBackDataCustomerOld",
      this.handleReturnBackDataCustomerOld
    );
  },
  beforeDestroy() {
    this.$eventBus.$off(
      "eventBusReturnBackDataCustomerOld",
      this.handleReturnBackDataCustomerOld
    );
  },
};
</script>

<style lang="scss" scoped></style>
