<template>
  <div class="campaign-name flex flex-col px-6 pt-4 gap-[10px] pb-6 bg-white rounded shadow-sm">
    <h2 class="text-base font-bold text-dark">{{title}}</h2>
     <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Title",
    },
  },
};
</script>

<style lang="scss" scoped></style>
