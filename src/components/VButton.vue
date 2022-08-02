<!--  EXAMPLE
<v-button @click="event click" variant="primary | secondary">{{label}}</v-button>
    -->
<template>
  <button
    @click="$emit('click')"
    class="px-4 py-2 rounded flex gap-[5px] items-center"
    :style="cssProps"
  >
    <slot>Button</slot>
  </button>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: "primary",
      require: true,
      validator(value) {
        return ["primary", "secondary"].includes(value);
      },
    },
    click: Function,
  },

  data() {
    return {
      background: {
        primary: {
          main: "#003084",
          hover: "#034ac7",
        },
        secondary: {
          main: "#ffffff",
          hover: "#ebebeb",
        },
      },
      color: {
        primary: "#ffffff",
        secondary: "#555770",
      },
    };
  },
  computed: {
    cssProps() {
      return {
        "--bg-color": this.background[this.variant].main,
        "--text-color": this.color[this.variant],
        "--border":
          this.variant == "secondary"
            ? "1px solid #EBEBF0"
            : "1px solid #003084",
        "--bg-color-hover": this.background[this.variant].hover,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  background: var(--bg-color);
  color: var(--text-color);
  border: var(--border);
  &:hover:enabled {
    background: var(--bg-color-hover);
  }
  &:disabled {
    color: #8f90a6;
    & > img {
      filter: invert(60%) sepia(25%) saturate(213%) hue-rotate(199deg)
        brightness(91%) contrast(89%);
    }
  }
}
</style>
