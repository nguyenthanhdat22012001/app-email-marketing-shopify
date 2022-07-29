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
        v-for="customer in customerList"
        :key="customer.id"
      >
        <td>
          <v-checkbox
            scope="col"
            :prop_input_value="customer.id"
            class="py-[22px] pl-[30px] translate-y-2/4"
            @input="handleSelect"
          />
        </td>
        <td class="py-5 pr-3.5">
          <v-avatar :name="customer.name" class="mr-3" />{{ customer.name }}
        </td>
        <td class="py-5 pr-3.5">{{ customer.phone }}</td>
        <td class="py-5 pr-3.5 text-primary">{{ customer.email }}</td>
        <td class="py-5 pr-3.5 text-muted">{{ customer.create }}</td>
      </tr>
    </template>
  </v-table>
</template>

<script>
import VTable from "@/components/VTable.vue";
import VCheckbox from "@/components/VCheckbox.vue";
import VAvatar from "@/components/VAvatar.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: {
    VTable,
    VCheckbox,
    VAvatar,
  },
  props: {
    value: Array,
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
        this.setCustomersSelected((state) => {
          state.customersSelected = this.customerList.map((item) => item.id);
        });
      } else {
        this.setCustomersSelected((state) => {
          state.customersSelected = [];
        });
      }
    },
    handleSelect(id) {
      if (this.customersSelected.length) {
        this.selectedAll = true;
      } else {
        this.selectedAll = false;
      }
    },
    ...mapMutations({
      setCustomersSelected: "campaignStore/setCustomersSelected",
    }),
    ...mapActions({
      fetchCustomer: "customerStore/fetchCustomer",
    }),
  },
  computed: {
    ...mapGetters({
      customerList: "customerStore/getCustomer",
      customersSelected: "campaignStore/getCustomersSelected",
    }),
    countSelectedCustomer: {
      get() {
        return this.customersSelected.length;
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
