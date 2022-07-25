<template>
  <div
    class="vue-sidebar w-[230px] h-screen text-white bg-gradient-to-br from-bg-primary to-bg-primary-light fixed top-0 left-0 flex flex-col gap-[22px]"
  >
    <img src="@/assets/images/Logo.png" alt="" class="pt-[20px] px-[20px]" />
    <nav class="menu flex flex-col">
      <router-link :to="{ name: 'customer' }">
        <img src="@/assets/icons/Union.svg" />
        Customer</router-link
      >
      <router-link :to="{ name: 'campaign' }">
        <img src="@/assets/icons/Union.svg" />
        Campaign</router-link
      >
    </nav>
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
  gap: 10px;
  padding: 12px 22px;
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
  &:hover::after ,
  &.router-link-active::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffff;
    opacity: 0.1;
  }
}
</style>
