<template>
  <div class="flex flex-col justify-center">
    <img src="@/assets/images/warning.png" alt="" />
    <p class="font-medium text-lg text-center">{{message}}<br />Try Again</p>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "Something wrong!!",
    },
  },
};
</script>

<style lang="scss" scoped></style>
