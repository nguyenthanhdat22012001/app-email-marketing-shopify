<template>
  <nav
    class="w-[200px] py-1 bg-white border border-solid rounded border-[#EBEBF0] shadow-sm-light"
  >
    <a href="#" class="text-dark"
      ><img src="@/assets/icons/shopify.svg" alt="" />Back to Shopify</a
    >
    <a href="#" class="text-red"
      ><img src="@/assets/icons/logout.svg" alt="" />Logout</a
    >
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
nav {
  &::before {
    position: absolute;
    content: "";
    width: 10px;
    height: 10px;
    background: #ffffff;
    transform: rotate(-45deg);
    top: -5px;
    right: 23px;
    border: 1px solid #ebebf0;
    border-bottom-color: transparent;
    border-left-color: transparent;
  }
  a {
    font-weight: 500;
    line-height: 24px;
    display: flex;
    gap: 8px;
    padding: 8px 14px;
  }
}
nav {
  animation: show .1s forwards linear;
}
@keyframes show {
  0% {
    transform: translateY(90%);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
