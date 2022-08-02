<template>
  <div class="flex-1 min-h-screen flex flex-col">
    <vue-head-block />
    <slot ></slot>
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
