<template>
  <div
    id="loading"
    v-if="isLoading"
    class="w-screen h-screen absolute bg-white top-0 left-0 bg-opacity-30 flex items-center justify-center z-[1000]"
  >
    <span
      id="circle1"
      class="w-[80px] h-[80px] border-[6px] border-solid border-primary rounded-full border-t-transparent translate-y-full-reverse"
    ></span>
    <span
      id="circle2"
      class="w-[60px] h-[60px] border-[6px] border-solid border-primary rounded-full border-r-transparent absolute translate-y-full-reverse"
    ></span>
    <img src="@/assets/images/logo-app.png" class="absolute translate-y-full-reverse w-[30px]">
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      isLoading: "getLoading",
    }),
  },
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
