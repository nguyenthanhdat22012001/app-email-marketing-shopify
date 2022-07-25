<!--  EX
  <v-select-sort v-model="select_sort">
      <option value="1">Sort</option>
      <option value="2">up</option>
    </v-select-sort>
-->

<template>
  <select
    v-model="selectedValue"
    class="VSelectInput py-2 pl-7 pr-4 appearance-none border border-[#EBEBF0] bg-secondary font-medium text-muted focus:outline-0"
  >
    <slot></slot>
  </select>
</template>

<script>
export default {
  props: ["value"],
  computed: {
    selectedValue: {
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
.VSelectInput {
  background-image: url(../assets/icons/sort.svg);
  background-repeat: no-repeat;
  background-position-x: 16px;
  background-position-y: 50%;
}
</style>
