<template>
  <div class="customer-content--head px-5 pt-5 flex gap-5">
    <div
      class="search-bar flex gap-[10px] rounded border border-solid border-light p-[10px] flex-1"
    >
      <img src="@/assets/icons/search.svg" alt="" />
      <v-input
        placeholder="Search customers by name, phone, email..."
        v-model="filters.keywords"
        class="flex-1"
      />
    </div>
    <div class="filter flex gap-[10px] items-center">
      <div class="flex">
        <v-date-range
          prop_label="Create date"
          @emitVDateRangeRange="
            (payload) =>
              (filters.created_at = payload.start + '/' + payload.end)
          "
        />
        <v-select-number-range
          prop_label="Total spent"
          @emitVSelectNumberRange="
            (payload) => (filters.total_spent = payload.from + '-' + payload.to)
          "
        />
        <v-select-number-range
          prop_label="Total order"
          @emitVSelectNumberRange="
            (payload) =>
              (filters.orders_count = payload.from + '-' + payload.to)
          "
        />
      </div>
      <!-- select sort  -->

      <v-select-type-check
        prop_icon="sort"
        prop_label="Sort"
        @emitClearForm="filters.sort = ''"
      >
        <v-input-radio
          prop_label="Last created"
          prop_input_value="ASC"
          v-model="filters.sort"
        ></v-input-radio>
        <v-input-radio
          prop_label="First created"
          prop_input_value="DESC"
          v-model="filters.sort"
        ></v-input-radio>
      </v-select-type-check>
    </div>
  </div>
</template>

<script>
import VInput from "@/components/VInput.vue";
import VInputRadio from "@/components/VInputRadio.vue";
import VSelectTypeCheck from "@/components/VSelectTypeCheck.vue";
import VSelectNumberRange from "@/components/VSelectNumberRange.vue";
import VDateRange from "@/components/VDateRange.vue";
import { mapActions } from "vuex";
export default {
  components: {
    VInput,
    VInputRadio,
    VSelectTypeCheck,
    VSelectNumberRange,
    VDateRange,
  },
  data() {
    return {
      filters: {
        keywords: "",
        total_spent: "",
        orders_count: "",
        created_at: "",
        sort: "ASC",
      },

      debounce: null,
    };
  },
  mounted() {},
  methods: {
    ...mapActions({
      filterCustomers: "customerStore/filterCustomers",
      fetchCustomers: "customerStore/fetchCustomers",
    }),
  },
  watch: {
    filters: {
      handler(newVal) {
        console.log(newVal);
        clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
          this.filterCustomers({
            ...newVal,
          });
        }, 300);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
