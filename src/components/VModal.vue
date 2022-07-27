<!--
<template>
  <div
    class="modal  fixed z-50 w-[100vw] h-[100vh] bg-muted top-0 left-0 rounded-2xl"
    v-show="visible"
  >
    <div class="z-20 bg-white">
      <div class="modal--header">
        <slot name="modal--header" class="">Modal Header</slot>
      </div>
      <div class="modal--body">
        <slot name="modal--body" class="">Modal Body</slot>
      </div>
      <div class="modal--footer">
        <slot name="modal--footer" class="">Modal Footer</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
-->
<template>
  <div
    class="vue-modal"
    :class="{ 'is-active': visible }"
    @click.self="onClickBackdrop"
  >
    <div class=" top-0 inline-block align-middle  bg-white text-left rounded-2xl">
      <slot> </slot>
      <!-- <div class="modal--header">
        <slot name="modal--header" class="">Modal Header</slot>
      </div>
      <div class="modal--body">
        <slot name="modal--body" class="">Modal Body</slot>
      </div>
      <div class="modal--footer">
        <slot name="modal--footer" class="">Modal Footer</slot>
      </div> -->
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
      console.log(this.$refs.footer);
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
  &-wrap {
    // top: 0;
    // display: inline-block;
    // vertical-align: middle;
    // min-width: 486px;
    // background: #ffffff;
    // text-align: left;
  }
  // &-header{
  //   padding:  12px 16px;
  //   border-bottom: 1px solid #ccc;
  //   position: relative;
  // }
  // &-body{
  //   padding:  12px 16px;
  //   min-height: 20px;
  // }
  // &-footer{
  //   padding:  12px 16px;
  //   border-top: 1px solid #ccc;
  // }
  // &-close{
  //   position: absolute;
  //   top: 15px;
  //   right: 15px;
  //   z-index: 1;
  //   cursor: pointer;
  //   opacity: 0.5;
  //   &:hover{
  //     opacity: 1;
  //   }
  // }
}
</style>
