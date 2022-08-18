<template>
  <div
    id="loading"
    class="w-full h-full flex items-center justify-center relative"
  >
    <span
      id="circle1"
      class="w-[50px] h-[50px] border-[5px] border-solid border-primary rounded-full border-t-transparent translate-y-full-reverse"
    ></span>
    <span
      id="circle2"
      class="w-[35px] h-[35px] border-[5px] border-solid border-primary rounded-full border-r-transparent absolute translate-y-full-reverse "
    ></span>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
#loading span {
  margin-top: -60px;
}
#circle1 {
  animation: spin 0.8s linear infinite;
}
#circle2 {
  animation: spin 0.8s linear infinite reverse;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
