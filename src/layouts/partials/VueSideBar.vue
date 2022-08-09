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
      <router-link :to="{ name: 'customer' }" class="menu--item relative">
        <img
          src="@/assets/icons/customer.svg"
          class="w-[18px] h-6 object-cover"
        />
        <p class="nav-text">Customer</p>
        <div class="tooltip">Customer</div>
      </router-link>
      <router-link :to="{ name: 'campaign' }" class="menu--item relative">
        <img src="@/assets/icons/Union.svg" class="object-cover" />
        <p class="nav-text">Campaign</p>
        <div class="tooltip">Customer</div>
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
  .tooltip {
    visibility: hidden;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(calc(100% + 5px), -50%);
    padding: 5px 10px;
    color: #ffffff;
    background: rgba($color: #000000, $alpha: 0.9);
    border: 1px solid rgba(0, 0, 0, 0.9);
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    line-height: 17px;
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      right: 100%; /* To the left of the tooltip */
      transform: translate(0%, -50%);
      border-width: 5px;
      border-style: solid;
      border-color: transparent black transparent transparent;
    }
  }
}

</style>
