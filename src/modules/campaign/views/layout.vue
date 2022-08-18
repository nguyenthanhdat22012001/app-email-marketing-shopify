<template>
  <transition
    enter-active-class="animate__animated animate__fadeInLeft"
    leave-active-class="animate__animated animate__fadeOutRight"
  >
    <router-view class="flex-1 overflow-auto relative z-0"> </router-view>
  </transition>
</template>

<script>
export default {
  components: {},
};
</script>

<style lang="scss" scoped>
.customer-layout {
  padding: 50px;
}
</style>
