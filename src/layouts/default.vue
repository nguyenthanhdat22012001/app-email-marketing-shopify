<template>
  <div class="default-layout flex pl-[230px]">
    <vue-side-bar></vue-side-bar>
    <vue-block>
      <router-view></router-view>
    </vue-block>
  </div>
</template>
<script>
import VueBlock from "./partials/VueBlock.vue";
import VueSideBar from "./partials/VueSideBar.vue";
export default {
  components: {
    VueBlock,
    VueSideBar,
  },
};
</script>

<style lang="scss">
</style>
