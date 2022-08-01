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
            v-model="selectedAll"
            prop_input_value="all"
            :prop_label="
              countSelectedCustomer ? countSelectedCustomer + ' Selected' : ''
            "
            @input="handleSelectAll"
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

    <template #table_body>
      <tr
        class="bg-white border-t border-[#EBEBF0]"
        v-for="customer in getCustomersPage(page, number)"
        :key="customer.id"
      >
        <td>
          <v-checkbox
            scope="col"
            :prop_input_value="customer.id"
            class="py-[22px] pl-[30px] translate-y-2/4"
            @input="handleSelect"
            v-model="customersSelected"
          />
        </td>
        <td class="py-5 pr-3.5">
          <v-avatar :name="customer.first_name+' '+customer.last_name" class="mr-3" />{{ customer.first_name+' '+customer.last_name }}
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
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    VTable,
    VCheckbox,
    VAvatar,
  },
  props: {
    value: Array,
    page: Number,
    number: Number,
  },
  data() {
    return {
      selectedAll: false,
    };
  },
  mounted() {
    this.fetchCustomer();
  },
  methods: {
    handleSelectAll() {
      if (this.selectedAll) {
        this.customersSelected = this.customerList.map((item) => item.id);
      } else {
        this.customersSelected = [];
      }
    },
    handleSelect() {
      if (this.customersSelected.length) {
        this.setSelectedAll(true);
      } else {
        this.setSelectedAll(false);
      }
    },
    setSelectedAll(value) {
      this.selectedAll = value;
    },
    ...mapActions({
      fetchCustomer: "customerStore/fetchCustomer",
    }),
    getCustomersPage(page, number) {
      return this.customerList.slice((page - 1) * number, page * 10 - 1);
    },
  },
  computed: {
    ...mapGetters({
      customerList: "customerStore/getCustomers",
    }),
    countSelectedCustomer() {
      this.setSelectedAll(Boolean(this.customersSelected.length));
      return this.customersSelected.length;
    },
    customersSelected: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
