<template>
  <div
    class="default-layout h-screen flex"
    :class="isToggle ? 'toggle' : 'no-toggle'"
  >
    <vue-side-bar></vue-side-bar>
    <vue-block>
      <router-view></router-view>
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
  computed: {
    ...mapGetters({
      isToggle: "getToggle",
    }),
  },
  beforeRouteUpdate(to, from) {
    console.log(to,from)
    // let query = {};
    // for (let [key, value] of Object.entries($)) {
    //   if (value) {
    //     query[key] = value;
    //   }
    // }
  },
};
</script>

<style lang="scss" scope>
$time: 0.4s;
.no-toggle {
  padding-left: 230px;
  transition: all $time;
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
</style>
