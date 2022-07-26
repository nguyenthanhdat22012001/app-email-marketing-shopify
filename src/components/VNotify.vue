<template>
  <transition name="slide-fade" @before-enter="onBeforeEnter" @enter="onEnter">
    <div class="fixed top-5 right-5 z-50">
      <div
        v-for="getNotify in getNotifies"
        :key="getNotify.id"
        class="relative w-[301px] bg-white pb-7 px-6 mb-2.5"
      >
        <a class="notify-close flex justify-end pt-4 cursor-pointer">
          <img src="@/assets/icons/close.svg" alt="" />
        </a>
        <div class="flex gap-2 font-semibold">
          <img src="@/assets/icons/check-circle.svg" alt="" />
          <span class="text-success">Success</span>
        </div>
        <div class="mt-2">Create campaign successfully</div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    onBeforeEnter(el) {
      let element_close = el.querySelector(".notify-close");
      console.log("onBeforeEnter", element_close);
      element_close.addEventListener("çlick", function () {
        console.log("çlose");
      });
    },

    onEnter(el, done) {
      // call the done callback to indicate transition end
      // optional if used in combination with CSS
      console.log("onEnter", el);

      done();
    },
  },
  computed: {
    ...mapGetters("notifyStore", ["getNotifies"]),
  },
};
</script>
<style>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.8s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
