<template>
  <nav
    class="w-[200px] bg-white border border-solid rounded border-[#EBEBF0] shadow-sm-light"
    v-if="isVisible"
    ref="dropdown"
  >
    <slot></slot>
  </nav>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },

  computed: {
    isVisible: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  created() {
    window.addEventListener("click", this.checkClickOn);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.checkClickOn);
  },
  methods: {
    checkClickOn(event) {
      if (!this.$refs.dropdown?.parentNode?.contains(event.target)) {
        this.isVisible = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  &::before {
    position: absolute;
    width: 10px;
    height: 10px;
    background: #ffffff;
    transform: rotate(-45deg);
    top: -5px;
    right: 23px;
    border: 1px solid #ebebf0;
    border-bottom-color: transparent;
    border-left-color: transparent;
  }
}
nav {
  animation: show 0.1s forwards linear;
}
@keyframes show {
  0% {
    transform: translateY(90%);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
