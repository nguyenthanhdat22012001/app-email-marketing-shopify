<template>
  <div class="customer-content--head px-5 pt-5 flex gap-5">
    <div
      class="search-bar flex gap-[10px] rounded border border-solid border-light p-[10px] flex-1 overflow-hidden"
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
          v-bind="{ date_from: filters.date_from, date_to: filters.date_to }"
          @emitVDateRangeRange="
            (payload) => {
              filters.date_from = payload.start;
              filters.date_to = payload.end;
            }
          "
        />
        <v-select-number-range
          prop_label="Total spent"
          v-bind="{
            data_from: filters.spent_from,
            data_to: filters.spent_to,
          }"
          @emitVSelectNumberRange="
            (payload) => {
              filters.spent_from = payload.from;
              filters.spent_to = payload.to;
            }
          "
        />
        <v-select-number-range
          prop_label="Total order"
          v-bind="{
            data_from: filters.orders_from,
            data_to: filters.orders_to,
          }"
          @emitVSelectNumberRange="
            (payload) => {
              filters.orders_from = payload.from;
              filters.orders_to = payload.to;
            }
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
import { mapActions, mapMutations } from "vuex";
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
        keywords: this.$route.query.keywords || "",
        spent_from: this.$route.query.spent_from || "",
        spent_to: this.$route.query.spent_to || "",
        orders_from: this.$route.query.orders_from || "",
        orders_to: this.$route.query.orders_to || "",
        date_from: this.$route.query.date_from || "",
        date_to: this.$route.query.date_to || "",
        sort: this.$route.query.sort || "",
      },

      debounce: null,
    };
  },
  mounted() {},
  methods: {
    ...mapActions({
      fetchCustomers: "customerStore/fetchCustomers",
    }),
    ...mapMutations({
      setLoading: "customerStore/setLoading",
      setCustomer: "customerStore/setCustomer",
    }),
  },
  watch: {
    filters: {
      handler(newVal) {
        clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
          this.setLoading(true);
          let query = {};
          for (let [key, value] of Object.entries(newVal)) {
            if (value) {
              query[key] = value;
            }
          }

          this.fetchCustomers(query)
            .then(() => {
              this.$router.push({
                query: {
                  ...query,
                },
              });
            })
            .finally(() => {
              this.setLoading(false);
            });
        }, 500);
      },
      deep: true,
    },
  },
  beforeDestroy() {
    for (let [key, value] of Object.entries(this.filters)) {
      if (value) {
        this.setCustomer([])
      }
    }
  },
};
</script>

<style lang="scss" scoped></style>
