<template>
<<<<<<< HEAD
  <div class="w-100 bg-white px-6 py-5 flex justify-between shadow-sm relative">
    <button><img src="@/assets/icons/bars.svg" alt="" /></button>
    <div class="user flex gap-1 items-center pl-[22px] relative">
      <img src="@/assets/icons/avatar-shop.png" />
      <p class="text-dark-gray leading-4 font-semibold">BaobaoStore</p>
      <vue-drop-down-user class="absolute"/>
=======
  <div class="w-100 bg-white flex justify-between shadow-sm relative">
    <button><img src="@/assets/icons/bars.svg" alt="" class="px-6" /></button>
    <div
      class="user flex gap-1 items-center pl-[22px] py-5 px-6 cursor-pointer"
      ref="hoverUser"
      @click="toggleDropdownUser"
    >
      <img src="@/assets/icons/avatar-shop.png" />
      <p class="text-dark-gray leading-4 font-semibold">BaobaoStore</p>
>>>>>>> 066f821aa951bf822dbd90df07c67afa26957b41
    </div>
    <vue-drop-down-user
      v-show="isShowDropDown"
      class="absolute bottom-1 right-2 translate-y-full"
      id="dropdown-user"
    />
  </div>
</template>

<script>
import VueDropDownUser from "./VueDropDownUser.vue";
export default {
  components: {
    VueDropDownUser,
<<<<<<< HEAD
=======
  },
  data() {
    return {
      isShowDropDown: false,
    };
  },
  created() {
    window.addEventListener("click", this.checkClickOn);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.checkClickOn);
  },
  methods: {
    toggleDropdownUser(value) {
      this.isShowDropDown = value;
    },
    checkClickOn(event) {
      if (!this.$refs.hoverUser.contains(event.target)) {
        this.isShowDropDown = false;
      }
    },
>>>>>>> 066f821aa951bf822dbd90df07c67afa26957b41
  },
};
</script>

<style lang="scss" scoped VueDropDownUser>
.user::before {
  position: absolute;
  border: 1px solid #ebebf0;
  content: "";
  height: 100%;
  transform: translateX(-22px);
}
<<<<<<< HEAD
=======


>>>>>>> 066f821aa951bf822dbd90df07c67afa26957b41
</style>
