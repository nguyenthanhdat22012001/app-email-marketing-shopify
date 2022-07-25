<template>
  <div class="flex flex-col items-center gap-4">
    <progress id="sync-data" :value="value" max="100">32%</progress>
    <label for="sync-data">{{label}}</label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    label: {
      default: "Loading",
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped></style>
