<template>
  <div
    @click.self="isOpen = !isOpen"
    class="VSelectNumberRange inline-flex justify-center gap-x-2.5 cursor-pointer py-2 px-3.5 border border-[#EBEBF0] bg-secondary font-medium text-muted"
  >
    <span class="VSelectNumberRange__title" @click.self="isOpen = !isOpen"
      >Total spent</span
    >
    <img
      class="VSelectNumberRange__img"
      @click.self="isOpen = !isOpen"
      src="@/assets/icons/caret-down.svg"
      alt=""
    />
    <div
      :class="{ isActive: isOpen }"
      class="VSelectNumberRange__drop-down w-[244px] border border-[#EBEBF0] rounded py-3.5 pl-3 pr-4 bg-secondary"
    >
      <div class="flex gap-2">
        <input
          type="number"
          placeholder="From"
          class="VSelectNumberRange__input w-[104px] px-2.5 py-2 border border-[#EBEBF0] rounded focus:outline-0"
        />
        <input
          type="number"
          placeholder="To"
          class="VSelectNumberRange__input w-[104px] px-2.5 py-2 border border-[#EBEBF0] rounded focus:outline-0"
        />
      </div>
      <div class="flex justify-between items-center pt-2.5">
        <v-button variant="primary">Ok</v-button>
        <a class="cursor-pointer text-primary">Clear</a>
      </div>
    </div>
  </div>
</template>

<script>
import VButton from "@/components/VButton.vue";

export default {
  components: {
    VButton,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    show: function () {
      this.isOpen = true;
    },
    hide: function () {
      console.log("hide");
      this.isOpen = false;
    },
  },
  created() {
    console.log("created");
    window.addEventListener("click", this.checkClickOn);
  },
  beforeDestroy() {
    console.log("beforeDestroy");
    window.removeEventListener("click", this.checkClickOn);
  },
};
</script>

<style lang="scss" scoped>
.VSelectNumberRange {
  position: relative;
  z-index: 1;
  &__drop-down {
    position: absolute;
    content: "";
    z-index: 2;
    top: 110%;
    left: 0;
    display: none;
  }
}
.isActive {
  display: block;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
