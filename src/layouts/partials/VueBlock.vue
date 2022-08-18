<template>
  <div class="flex-1 overflow-hidden flex flex-col">
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
