<template>
  <select v-model="selectedValue" @change="changeValue">
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
  methods:{
    changeValue(){
        console.log(this.selectedValue)
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  color: #fff;

  .active {
    color: blue($color: #000000);
  }
}
</style>
