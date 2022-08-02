<!--  EX
 <v-select-input v-model="selectValue">
      <option value="1">Create date</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </v-select-input>
-->

<template>
  <select
    v-model="selectedValue"
    class="VSelectInput py-2 pl-3.5 pr-8 appearance-none border border-[#EBEBF0] bg-secondary font-medium text-muted focus:outline-0"
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
  background-image: url(../assets/icons/caret-down.svg);
  background-repeat: no-repeat;
  background-position-x: 90%;
  background-position-y: 50%;
}
</style>
