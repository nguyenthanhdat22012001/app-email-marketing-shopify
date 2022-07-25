<template>
  <div class="w-100 bg-white px-6 py-5 flex justify-between shadow-sm relative">
    <button><img src="@/assets/icons/bars.svg" alt="" /></button>
    <div class="user flex gap-1 items-center pl-[22px] relative">
      <img src="@/assets/icons/avatar-shop.png" />
      <p class="text-dark-gray leading-4 font-semibold">BaobaoStore</p>
      <vue-drop-down-user class="absolute"/>
    </div>
  </div>
</template>

<script>
import VueDropDownUser from "./VueDropDownUser.vue";
export default {
  components: {
    VueDropDownUser,
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
</style>
