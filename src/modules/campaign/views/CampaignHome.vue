<template>
  <div>
    Campaign Content
    <v-select-number-range
      prop_label="Total spent1"
      @emitVSelectNumberRange="updateInputRange"
    />

    <v-select-type-check prop_label="Status" @emitClearForm="check_list = []">
      <v-checkbox
        prop_input_value="Completed"
        v-model="check_list"
      ></v-checkbox>
      <v-checkbox
        prop_label="Running"
        prop_input_value="Running"
        v-model="check_list"
      ></v-checkbox>
    </v-select-type-check>

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
        prop_label="Campaign name (A-Z)"
        prop_input_value="Campaign name (A-Z)"
        v-model="sort"
      ></v-input-radio>
    </v-select-type-check>
  </div>
</template>

<script>
import VSelectNumberRange from "@/components/VSelectNumberRange.vue";
import VSelectTypeCheck from "@/components/VSelectTypeCheck.vue";
import VInputRadio from "@/components/VInputRadio.vue";
import VCheckbox from "@/components/VCheckbox.vue";

export default {
  components: {
    VSelectNumberRange,
    VSelectTypeCheck,
    VInputRadio,
    VCheckbox,
  },
  emits: ["emitVSelectNumberRange"],
  data() {
    return {
      input_range: {},
      check_list: [],
      sort: "",
    };
  },
  methods: {
    updateInputRange(payload) {
      this.input_range = payload;
    },
  },
  watch: {
    sort() {
      console.log(this.sort);
    },
  },
};
</script>

<style lang="scss" scoped></style>
