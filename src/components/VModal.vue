<template>
  <div
    class="vue-modal"
    :class="{ 'is-active': visible }"
    @click.self="onClickBackdrop"
    @closeModal="onClickBackdrop"
  >
    <div class=" top-0 inline-block align-middle  bg-white text-left rounded-2xl">
      <slot> </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "VueModal",
  props: {
    value: {
      type: [Boolean],
    },
    closeable: {
      type: [Boolean],
      default: true,
    },
    backdrop: {
      type: [Boolean],
      default: true,
    },
  },
  data() {
    return {
      visible_footer: false,
    };
  },
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    hideModal() {
      this.visible = false;
    },
    onClickBackdrop() {
      if (this.backdrop) {
        this.hideModal();
        this.$emit("closeModal")
      }
    },
    onClickClose() {
      if (this.closeable) {
        this.hideModal();
      }
    },
    async onClickVisible() {
      this.visible_footer = true;
      await this.$nextTick();
    },
  },
  mounted() {
    let body = document.querySelector("body");
    body.appendChild(this.$el);
    
  },
  beforeDestroy() {
    this.$el.remove();
  },
};
</script>

<style lang="scss" scoped>
.vue-modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  opacity: 0;
  visibility: hidden;
  text-align: center;
  overflow: hidden auto;
  &:before {
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
    content: "";
  }
  &.is-active {
    opacity: 1;
    visibility: visible;
  }
}
</style>
