<template>
  <div
    class="default-layout h-screen flex"
    :class="isToggle ? 'toggle' : 'no-toggle'"
  >
    <vue-side-bar></vue-side-bar>
    <vue-block>
      <transition
        :enter-active-class="`animate__animated ${enterClass} v-enter-active`"
        :leave-active-class="`animate__animated ${leaveClass} v-leave-active`"
      >
        <router-view
          :style="{ '--top': `${top}px`, '--width': `${sidebar}px` }"
          appear
          :key="$route.path"
        >
        </router-view>
      </transition>
    </vue-block>
  </div>
</template>
<script>
import VueBlock from "./partials/VueBlock.vue";
import VueSideBar from "./partials/VueSideBar.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    VueBlock,
    VueSideBar,
  },
  data() {
    return {
      top: 0,
      sidebar: 0,
      eliSidebar: null,
      enterClass: "animate__fadeInLeft",
      leaveClass: "animate__fadeOutRight",
    };
  },
  mounted() {
    this.elSidebar = document.querySelector(".vue-sidebar");
    this.top = document.querySelector(".head-block").offsetHeight;
  },
  methods: {
    changeSideBar(e) {
      console.log(e);
    },
    swapTransition() {
      this.enterClass =
        this.enterClass == "animate__fadeInLeft"
          ? "animate__fadeInRight"
          : "animate__fadeInLeft";
    },
  },
  computed: {
    ...mapGetters({
      isToggle: "getToggle",
    }),
  },
  watch: {
    $route: {
      handler(newRoute, oldRoute) {
        this.sidebar = this.elSidebar.offsetWidth;
        this.top = document.querySelector(".head-block").offsetHeight;

        const toDepth = newRoute.name.split("/").length;
        const fromDepth = oldRoute.name?.split("/").length || 1;
        if (toDepth == fromDepth) {
          this.swapTransition();
        } else {
          this.enterClass =
            toDepth > fromDepth
              ? "animate__fadeInRight"
              : "animate__fadeInLeft";
        }

        this.leaveClass =
          this.enterClass == "animate__fadeInLeft"
            ? "animate__fadeOutRight"
            : "animate__fadeOutLeft";
      },
    },
  },
  beforeDestroy() {
    // this.elSidebar.addEventListener("resize", this.changeSideBar);
  },
};
</script>

<style lang="scss" scope>
$time: 0.4s;
.no-toggle {
  padding-left: 230px;
  transition: padding $time;
  .vue-sidebar {
    width: 230px;
    transition: width $time;
    .logo-text,
    .nav-text {
      opacity: 1;
      visibility: visible;
      transition-delay: 0.2s;
    }
    .logo-text {
      position: unset;
    }
  }
}
.toggle {
  padding-left: 66px;
  transition: all $time;
  .vue-sidebar {
    width: 66px;
    transition: width $time;

    .logo-text,
    .nav-text {
      opacity: 0;
      visibility: hidden;
    }
    .logo-text {
      position: absolute;
    }
  }
}
.v-enter-active {
  position: absolute;
  top: var(--top);
  width: calc(100vw - var(--width));
  height: calc(100vh - var(--top));
}
.v-enter-active {
  animation-duration: 0.6s;
}

.v-leave-active {
  animation-duration: 0.5s;
}
</style>
