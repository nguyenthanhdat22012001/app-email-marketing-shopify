<template>
  <div class="modal fixed top-[20%] left-[50%] rounded-2xl" v-show="visible">
    <div class="modal--header">
      <slot name="modal--header" class="">Modal Header</slot>
    </div>
    <div class="modal--body">
      <slot name="modal--body" class="">Modal Body</slot>
    </div>
    <div class="modal--footer">
      <slot name="modal--footer" class="">Modal Footer</slot>
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
