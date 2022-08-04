<!-- EX
   <campaign-table-modal-select/>
-->

<template>
  <v-table align="center">
    <template #table_head_tr>
      <th
        :colspan="countSelectedCustomer ? 5 : 0"
        class="py-5 pl-[30px]"
        :class="{ 'py-[9px] pl-5': countSelectedCustomer }"
      >
        <div class="flex gap-2">
          <v-checkbox
            :prop_is_checkbox_custom="true"
            scope="col"
            :value="is_selected_all"
            prop_input_value="all"
            @input="onToggleSelectAll"
            :class="{
              'border border-solid border-light p-[10px] rounded flex gap-4':
                countSelectedCustomer,
            }"
          />
        </div>
      </th>
      <template v-if="countSelectedCustomer === 0">
        <th scope="col" class="py-5 pr-3.5">Customer name</th>
        <th scope="col" class="py-5 pr-3.5">Phone</th>
        <th scope="col" class="py-5 pr-3.5">Email</th>
        <th scope="col" class="py-5 pr-3.5">Create date</th>
      </template>
    </template>

    <template #table_body v-if="prop_list_customer.length > 0">
      <tr
        class="bg-white border-t border-[#EBEBF0]"
        v-for="customer in prop_list_customer"
        :key="customer.id"
      >
        <td>
          <v-checkbox
            scope="col"
            :prop_input_value="customer.id"
            class="py-[22px] pl-[30px] translate-y-2/4"
            v-model="customersSelected"
          />
        </td>
        <td class="py-5 pr-3.5">
          <v-avatar
            :name="getFullName(customer.first_name, customer.last_name)"
            class="mr-3"
          />{{ getFullName(customer.first_name, customer.last_name) }}
        </td>
        <td class="py-5 pr-3.5">{{ customer.phone }}</td>
        <td class="py-5 pr-3.5 text-primary">{{ customer.email }}</td>
        <td class="py-5 pr-3.5 text-muted">{{ customer.created_at }}</td>
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
    value: Array,
    prop_list_customer: {
      type: Array,
      default(rawProps) {
        return [];
      },
    },
  },
  data() {
    return {
      countSelectedCustomer: 0,
    };
  },
  methods: {
    onToggleSelectAll() {
       this.$emit("emitSelectAllCustomer", !this.is_selected_all);
    },
    oncheckCustomersInCustomerSelected(){
      // this.prop_list_customer.forEach(item => {
        
      // });
      return true
    }
  },
  computed: {
    customersSelected: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    is_selected_all(){
      return this.oncheckCustomersInCustomerSelected();
    }
  },
};
</script>

<style lang="scss" scoped></style>
