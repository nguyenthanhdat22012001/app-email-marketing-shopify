<template>
  <div>
    <vue-head-block />
    <slot></slot>
  </div>
</template>

<script>
import VueHeadBlock from "./VueHeadBlock.vue";
export default {
  components: {
    VueHeadBlock,
  },
};
</script>

<style lang="scss" scoped></style>
