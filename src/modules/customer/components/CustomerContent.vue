<template>
  <div class="customer-list flex-1 overflow-auto">
    <v-table align="center" class="relative" :class="{ 'h-full': isLoading }">
      <template #table_head_tr>
        <th
          :colspan="countSelectedCustomer ? 7 : 1"
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
              :class="{
                'border border-solid border-light p-[10px] rounded flex gap-4':
                  countSelectedCustomer,
              }"
            />
            <v-button
              v-if="countSelectedCustomer"
              variant="secondary"
              @click="visibleExportModal = true"
            >
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
      <template #table_body v-if="isLoading">
        <tr>
          <td colspan="10"><v-loading /></td>
        </tr>
      </template>

      <template #table_body v-else>
        <tr
          class="bg-white border-t border-[#EBEBF0]"
          v-for="customer in customerList.data"
          :key="customer.id"
        >
          <td>
            <v-checkbox
              scope="col"
              v-model="selectedCustomers"
              :prop_input_value="customer.id"
              class="py-[22px] pl-[30px] translate-y-2/4"
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
          <td class="py-5 pr-3.5">{{ customer.orders_count }} Orders</td>
          <td class="py-5 pr-3.5">$ {{ customer.total_spent }}</td>
          <td class="py-5 pr-3.5 text-muted">
            {{ convertDateTime(customer.created_at) }}
          </td>
        </tr>
      </template>
    </v-table>
    <customer-modal-export :export-all="false" v-model="visibleExportModal">
      <template #message>
        <p>
          Export
          {{ selectedCustomers.length }}
          customer{{ selectedCustomers.length > 1 ? "s" : "" }} to your email
        </p>
      </template>
    </customer-modal-export>
  </div>
</template>

<script>
import VTable from "@/components/VTable.vue";
import VCheckbox from "@/components/VCheckbox.vue";
import VAvatar from "@/components/VAvatar.vue";
import VButton from "@/components/VButton.vue";
import VLoading from "@/components/VLoading.vue";
import CustomerModalExport from "../components/CustomerModalExport.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    VTable,
    VCheckbox,
    VAvatar,
    VButton,
    VLoading,
    CustomerModalExport,
  },

  data() {
    return {
      visibleExportModal: false,
    };
  },

  methods: {
    ...mapMutations({
      setSelectedCustomers: "customerStore/setSelectedCustomers",
    }),
  },
  computed: {
    ...mapGetters({
      customerList: "customerStore/getCustomers",
      isLoading: "customerStore/getLoading",
    }),
    customerListId() {
      return this.customerList.data.map((item) => item.id);
    },
    selectedCustomers: {
      get() {
        return this.$store.getters["customerStore/getSelectedCustomers"];
      },
      set(val) {
        this.setSelectedCustomers(() => {
          return val;
        });
      },
    },
    selectedAll: {
      get() {
        return Boolean(
          this.selectedCustomers.filter((id) =>
            this.customerListId.includes(id)
          ).length
        );
      },
      set(val) {
        if (val) {
          this.selectedCustomer = this.customerList.data.map((item) => item.id);
          this.setSelectedCustomers((selected) => [
            ...selected,
            ...this.customerListId,
          ]);
        } else {
          this.setSelectedCustomers((selected) =>
            selected.filter((id) => !this.customerListId.includes(id))
          );
        }
      },
    },
    countSelectedCustomer() {
      return this.selectedCustomers.length;
    },
  },
  watch: {
    "customerList.current_page"(newPage) {
      const { page, ...query } = this.$route.query;
      if (newPage > 1) {
        this.$router.push({
          query: {
            ...query,
            page: newPage,
          },
        });
      } else {
        this.$router.push({
          query: {
            ...query,
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
tbody {
  display: block;
  width: 100%;
  overflow: auto;
  height: 100px;
}

.customer-list::-webkit-scrollbar {
  display: none;
}
</style>
