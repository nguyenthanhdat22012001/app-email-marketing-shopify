<template>
  <div
    class="head-block w-100 bg-white dark:bg-dark sticky top-0 flex justify-between shadow-sm relative z-[1]"
  >
    <button @click="handleToggleSideBar">
      <img src="@/assets/icons/bars.svg" alt="" class="px-6" />
    </button>
    <div
      class="user flex gap-1 items-center pl-[22px] py-5 px-6 cursor-pointer relative"
      @click="toggleDropdownUser"
    >
      <img src="@/assets/icons/avatar-shop.png" />
      <p class="text-dark-gray leading-4 font-semibold">
        {{ store?.name_merchant }}
      </p>
      <v-dropdown
        v-model="isShowDropDown"
        class="absolute before:content-[''] bottom-1 right-2 translate-y-full"
        id="dropdown-user"
      >
        <a class="text-dark"
          ><img src="@/assets/icons/shopify.svg" alt="" />Back to Shopify</a
        >
        <a class="text-red" @click="handleLogout"
          ><img src="@/assets/icons/logout.svg" alt="" />Logout</a
        >
      </v-dropdown>
    </div>
  </div>
</template>

<script>
import VDropdown from "@/components/VDropDown.vue";
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
  components: {
    VDropdown,
  },
  data() {
    return {
      isShowDropDown: false,
    };
  },

  methods: {
    ...mapActions({
      logout: "auth/logout",
    }),
    ...mapMutations(["setToggle"]),
    toggleDropdownUser() {
      this.isShowDropDown = !this.isShowDropDown;
    },
    handleLogout() {
      this.logout();
      // this.$router.push({ name: "login" });
    },
    handleToggleSideBar() {
      this.setToggle(!this.toggle);
      document.querySelector(".vue-sidebar").removeAttribute("style");
      document.querySelector(".default-layout").removeAttribute("style");
    },
  },
  computed: {
    ...mapGetters({
      store: "auth/getUser",
      toggle: "getToggle",
    }),
  },
};
</script>

<style lang="scss" scoped>
.user::before {
  position: absolute;
  border: 1px solid #ebebf0;
  content: "";
  height: 100%;
  transform: translateX(-22px);
}
#dropdown-user {
  a {
    font-weight: 500;
    line-height: 24px;
    display: flex;
    gap: 8px;
    padding: 8px 14px;
  }
}
</style>
