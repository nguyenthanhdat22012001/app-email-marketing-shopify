<template>
  <div class="fixed top-5 right-5 z-50">
    <TransitionGroup name="list-notify">
      <div
        v-for="getNotify in getNotifies"
        :key="getNotify.id"
        class="relative w-[301px] bg-white pb-7 px-6 mb-2.5 pt-4 rounded shadow-notify"
      >
        <a
          class="notify-close flex justify-end cursor-pointer"
          @click="handleClose(getNotify.id)"
        >
          <img src="@/assets/icons/close.svg" alt="" />
        </a>
        <div class="flex gap-2 font-semibold">
          <template v-if="getNotify.status == 'success'">
            <img src="@/assets/icons/check-circle.svg" alt="" />
          </template>
          <template v-if="getNotify.status == 'error'">
            <img src="@/assets/icons/error-circle.svg" alt="" />
          </template>
          <span :class="classStatusText(getNotify.status)">{{
            getNotify.title
          }}</span>
        </div>
        <div class="mt-2">{{ getNotify.message }}</div>
      </div>
    </TransitionGroup>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions({
      handleClose: "notifyStore/removeNotify",
    }),
    classStatusText(status) {
      let data = "text-success";
      switch (status) {
        case "success":
          data = "text-success";
          break;
        case "error":
          data = "text-red";
          break;
      }
      return data;
    },
  },
  computed: {
    ...mapGetters("notifyStore", ["getNotifies"]),
  },
};
</script>
<style>
.list-notify-enter-active {
  animation: show 0.4s ease forwards;
}
.list-notify-leave-active {
  animation: show 0.4s ease forwards reverse;
}

@keyframes show {
  0% {
    transform: translateX(50%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
