<template>
  <div class="customer-content--head px-5 pt-5 flex gap-5">
    <div
      class="search-bar flex gap-[10px] rounded border border-solid border-light p-[10px] flex-1"
    >
      <img src="@/assets/icons/search.svg" alt="" />
      <v-input
        placeholder="Search customers by name, phone, email..."
        v-model="searchText"
        class="flex-1"
      />
    </div>
    <div class="filter flex gap-[10px] items-center">
      <div class="flex">
        <v-select-number-range
          prop_label="Total spent"
          @emitVSelectNumberRange="(payload) => (filterSpent = payload)"
        />
        <v-select-number-range
          prop_label="Total order"
          @emitVSelectNumberRange="(payload) => (filterSpent = payload)"
        />
      </div>
      <!-- select sort  -->
      <v-select-type-check
        prop_icon="sort"
        prop_label="Sort"
        @emitClearForm="filterSort = ''"
      >
        <v-input-radio
          prop_label="Last created"
          prop_input_value="Last created"
          v-model="filterSort"
        ></v-input-radio>
        <v-input-radio
          prop_label="First created"
          prop_input_value="First created"
          v-model="filterSort"
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

export default {
  components: {
    VInput,
    VInputRadio,
    VSelectTypeCheck,
    VSelectNumberRange,
  },
  data() {
    return {
      searchText: "",
      filterCreate: "",
      filterSort: "",
      filterOrder: { from: "", to: "" },
      filterSpent: { from: "", to: "" },
    };
  },
};
</script>

<style lang="scss" scoped></style>
