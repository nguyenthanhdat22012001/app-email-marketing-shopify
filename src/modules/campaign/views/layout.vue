<template>
  <Transition>
    <router-view class="flex-1 overflow-auto"></router-view>#
  </Transition>
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

.v-leave-active,
.v-enter-active {
  transition: 0.5s ease-out;
}
.v-enter {
  transform: translate(100%, 0);
}
.v-leave-to {
  transform: translate(-100%, 0);
  display: none;
}
</style>
