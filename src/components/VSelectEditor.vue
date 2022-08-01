<!--  EX
  <v-select v-model="select">
      <option value="1">Sort</option>
      <option value="2">up</option>
    </v-select>
-->

<template>
  <select
    v-model="selectedValue"
    class="VSelectInput appearance-none focus:outline-0 pr-[11px] bg-transparent"
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
  background-image: url(../assets/icons/angle-down.svg);
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 40%;
  background-size: 7px;
}
</style>
