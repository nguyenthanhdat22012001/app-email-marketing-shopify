<template>
  <div class="modal" v-show="visible">
    <div class="modal--header">
      <slot class="">Modal Header</slot>
    </div>
    <div class="modal--body">
      <slot class="">Modal Body</slot>
    </div>
    <div class="modal--footer">
      <slot class="">Modal Footer</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      
    };
  },
};
</script>

<style lang="scss" scoped></style>
