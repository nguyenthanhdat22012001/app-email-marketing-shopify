<template>
  <div
    class="auth-layout flex w-[100vw] h-[100vh] overflow-hidden my-0 mx-auto bg-gray-light"
  >
    <div class="form-auth flex-1 relative">
      <img
        src="@/assets/icons/logo-auth.svg"
        class="mt-[30px] ml-[30px]"
        alt=""
      />
      <div
        class="form absolute left-[17%] top-[50%] translate-y-[-50%] w-[450px]"
      >
        <router-view></router-view>
      </div>
    </div>
    <div class="bg-auth relative w-[42%] ">
      <img src="@/assets/images/bg-auth.png" alt="" class="w-full h-[100vh]" />
      <div
        class="absolute top-[50%] right-[50%] translate-y-[-50%] translate-x-[50%] text-center text-white"
      >
        <img src="@/assets/icons/art-work.svg" alt="" />
        <h4 class="font-bold text-[32px] mb-2 mt-5">Welcome back</h4>
        <p class="text-[18px] whitespace-nowrap">
          Shopify customer management system
        </p>
      </div>
      <div class="w-full absolute bottom-[40px] left-[0] flex justify-center gap-[30px] text-[13px] text-white opacity-60">
        <span>Copyright@Firegroup.vn</span>
        <ul class="flex gap-[10px]">
          <li><a href="">Term of use</a></li>
          <li><a href="">• Privacy policy </a></li>
          <li><a href="">• Help center</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
