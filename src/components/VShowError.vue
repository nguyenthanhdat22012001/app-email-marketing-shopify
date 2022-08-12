<template>
  <div class="flex flex-col items-center justify-center">
    <img src="@/assets/images/warning.png" alt="" class="w-[128px]"/>
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
