<template>
  <div class="w-100 bg-white px-6 py-5">
    <button><img src="@/assets/icons/bars.svg" alt="" /></button>
    <div class="user">
      <avatar size="avatarSize" color="red">
        <img src="src" alt="alt" />
      </avatar>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/VAvatar.vue";
export default {
  components: {
    Avatar,
  },
};
</script>

<style lang="scss" scoped></style>
