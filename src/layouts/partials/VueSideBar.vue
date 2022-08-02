<template>
  <div
    class="vue-sidebar w-[230px] h-screen text-white bg-gradient-to-br from-bg-primary to-bg-primary-light fixed top-0 left-0 flex flex-col gap-[22px]"
  >
    <div class="logo flex justify-center pt-5 gap-[15px]">
      <img src="@/assets/icons/logo-image.svg" alt="" class="logo-image" />
      <img
        src="@/assets/icons/logo-text.svg"
        alt=""
        class="logo-text nav-text"
      />
    </div>
    <nav class="menu flex flex-col mb-auto">
      <router-link :to="{ name: 'customer' }">
        <img
          src="@/assets/icons/customer.svg"
          class="w-[18px] h-6 object-cover"
        />
        <p class="nav-text">Customer</p>
      </router-link>
      <router-link :to="{ name: 'campaign' }">
        <img src="@/assets/icons/Union.svg" class="object-cover" />
        <p class="nav-text">Campaign</p>
      </router-link>
    </nav>
    <div class="footer-sidebar opacity-50 text-white flex gap-[10px] py-3 px-5">
      <img src="@/assets/icons/help-center.svg" alt="" />
      <p class="nav-text">Help center</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style lang="scss" scoped>
.menu a {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  height: 48px;
  opacity: 0.5;
  &.router-link-active {
    opacity: 1;
    &::before {
      content: "";
      position: absolute;
      background: #fddd48;
      border-radius: 0px 3px 3px 0px;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
    }
  }
  &:hover::after,
  &.router-link-active::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffff;
    opacity: 0.1;
    z-index: -1;
  }
}
</style>
