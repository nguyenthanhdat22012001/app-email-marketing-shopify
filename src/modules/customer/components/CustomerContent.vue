<template>
  <v-table align="center">
    <template #table_head_tr>
      <th
        :colspan="countSelectedCustomer ? 7 : 0"
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
          <v-button v-if="countSelectedCustomer" variant="secondary">
            <img src="@/assets/icons/download.svg" />
            Export CSV
          </v-button>
        </div>
      </th>
      <template v-if="countSelectedCustomer === 0">
        <th scope="col" class="py-5 pr-3.5">Customer name</th>
        <th scope="col" class="py-5 pr-3.5">Phone</th>
        <th scope="col" class="py-5 pr-3.5">Email</th>
        <th scope="col" class="py-5 pr-3.5">Orders</th>
        <th scope="col" class="py-5 pr-3.5">Spent</th>
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
            v-model="selectedCustomer"
            :prop_input_value="customer.id"
            class="py-[22px] pl-[30px] translate-y-2/4"
            @input="handleSelect"
          />
        </td>
        <td class="py-5 pr-3.5">
          <v-avatar
            :name="getFullName(customer.first_name,customer.last_name)"
            class="mr-3"
          />{{ getFullName(customer.first_name,customer.last_name) }}
        </td>
        <td class="py-5 pr-3.5">{{ customer.phone }}</td>
        <td class="py-5 pr-3.5 text-primary">{{ customer.email }}</td>
        <td class="py-5 pr-3.5">{{ customer.orders_count }} Orders</td>
        <td class="py-5 pr-3.5">$ {{ customer.total_spent }}</td>
        <td class="py-5 pr-3.5 text-muted">{{ customer.created_at.split(' ')[0] }}</td>
      </tr>
    </template>
  </v-table>
</template>

<script>
import VTable from "@/components/VTable.vue";
import VCheckbox from "@/components/VCheckbox.vue";
import VAvatar from "@/components/VAvatar.vue";
import VButton from "@/components/VButton.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    VTable,
    VCheckbox,
    VAvatar,
    VButton,
  },
  data() {
    return {
      selectedCustomer: [],
      selectedAll: false,
    };
  },

  methods: {
    handleSelectAll() {
      if (this.selectedAll) {
        this.selectedCustomer = this.customerList.map((item) => item.id);
      } else {
        this.selectedCustomer = [];
      }
    },
    handleSelect() {
      if (this.selectedCustomer.length) {
        this.selectedAll = true;
      } else {
        this.selectedAll = false;
      }
    },
    getFullName(firstName, lastName) {
      return firstName + " " + lastName;
    },
  },
  computed: {
    ...mapGetters({
      customerList: "customerStore/getCustomers",
    }),
    countSelectedCustomer: {
      get() {
        return this.selectedCustomer.length;
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
