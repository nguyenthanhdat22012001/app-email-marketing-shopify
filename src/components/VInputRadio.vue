<!--  EX
  <v-input-radio
        prop_label="Campaign name (A-Z)"
        prop_input_value="Campaign name (A-Z)"
        v-model="sort"
      ></v-input-radio>
    -->

<template>
  <div class="inline-flex items-center gap-1">
    <input
      :id="prop_input_value"
      type="radio"
      class="w-4 h-4 bg-white border border-[#C7C9D9]"
      :value="prop_input_value"
      v-model="radio"
    />
    <label :for="prop_input_value">{{prop_label}}</label>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    prop_input_value: {
      type: String,
      default: "",
    },
    prop_label: {
      type: String,
      default: "",
    },
  },
  computed: {
    radio: {
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

<style lang="scss" scoped>

</style>
