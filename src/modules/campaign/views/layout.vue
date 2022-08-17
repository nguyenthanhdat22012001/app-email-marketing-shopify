<template>
  <transition
    :enter-active-class="`${$route.meta.enterClass} v-enter-active`"
    :leave-active-class="`${$route.meta.leaveClass} v-enter-active`"
  >
    <router-view
      ref="refCampaign"
      :style="{ '--top': `${top}px` }"
      class="flex-1 overflow-auto relative z-0"
    >
    </router-view>
  </transition>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      top: 0,
      sidebar: 0,
      eliSidebar: null,
    };
  },

  mounted() {
    this.top = this.$refs.refCampaign.$el.offsetTop;
    this.elSidebar = document.querySelector(".vue-sidebar");
    this.sidebar = this.elSidebar.offsetWidth;
    console.log(this.elSidebar);
    this.elSidebar.addEventListener("resize", this.changeSideBar);
  },
  methods: {
    changeSideBar(e) {
      console.log(e);
    },
  },
  computed: {},
  beforeDestroy() {
    this.elSidebar.addEventListener("resize", this.changeSideBar);
  },
};
</script>

<style lang="scss" scoped>
.customer-layout {
  padding: 50px;
}
.v-enter-active {
  position: absolute;
  top: var(--top);
  width: 100%;
}
/* .v-enter-active {
  position: absolute;
  top: 76px;
  width: 90%;
}
.v-enter-active,
.v-leave-active {
  transition: 5s linear;
  opacity: 1;
  z-index: -1;
  .campaign--home {
    overflow-x: hidden;
  }
  .campaign--create-page {
    overflow-x: hidden;
  }
} */
</style>
