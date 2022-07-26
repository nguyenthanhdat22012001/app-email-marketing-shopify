<template>
  <div class="px-5 pt-5 flex gap-5">
    <div
      class="search-bar flex gap-[10px] rounded border border-solid border-light p-[10px] flex-1"
    >
      <img src="@/assets/icons/search.svg" alt="" />
      <v-input
        placeholder="Search campaign..."
        v-model="searchText"
        class="flex-1"
      />
    </div>
    <div class="flex gap-[10px] items-center">
      <!-- selecet default  -->
      <v-select-type-check prop_label="Status" @emitClearForm="check_list = []">
        <v-checkbox
          prop_label="Running"
          prop_input_value="Running"
          v-model="check_list"
        ></v-checkbox>
        <v-checkbox
          prop_label="Completed"
          prop_input_value="Completed"
          v-model="check_list"
        ></v-checkbox>
        <v-checkbox
          prop_label="Paused"
          prop_input_value="Paused"
          v-model="check_list"
        ></v-checkbox>
      </v-select-type-check>
      <!-- select sort  -->
      <v-select-type-check
        prop_icon="sort"
        prop_label="Sort"
        @emitClearForm="sort = ''"
      >
        <v-input-radio
          prop_label="Last created"
          prop_input_value="Last created"
          v-model="sort"
        ></v-input-radio>
        <v-input-radio
          prop_label="First created"
          prop_input_value="First created"
          v-model="sort"
        ></v-input-radio>
        <v-input-radio
          prop_label="Campaign name (A-Z)"
          prop_input_value="Campaign name (A-Z)"
          v-model="sort"
        ></v-input-radio>
        <v-input-radio
          prop_label="Campaign name (Z-A)"
          prop_input_value="Campaign name (Z-A)"
          v-model="sort"
        ></v-input-radio>
      </v-select-type-check>
    </div>
  </div>
</template>

<script>
import VInput from "@/components/VInput.vue";
import VCheckbox from "@/components/VCheckbox.vue";
import VInputRadio from "@/components/VInputRadio.vue";
import VSelectTypeCheck from "@/components/VSelectTypeCheck.vue";

export default {
  components: {
    VInput,
    VSelectTypeCheck,
    VCheckbox,
    VInputRadio,
  },
  data() {
    return {
      searchText: "",
      check_list: [],
      sort: '',
    };
  },
};
</script>

<style lang="scss" scoped></style>
