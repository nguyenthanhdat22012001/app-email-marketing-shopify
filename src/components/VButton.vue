<!--  EXAMPLE
<v-button @click="event click" variant="primary | secondary">{{label}}</v-button>
    -->
<template>
  <button
    @click="$emit('click')"
    :class="cssProps"
    class="px-4 py-2 rounded flex gap-[5px] items-center border border-solid rounded"
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
      border: {
        primary: "primary",
        secondary: "light",
      },
    };
  },
  computed: {
    cssProps() {
      return `bg-${this.variant} hover:bg-[${
        this.background[this.variant].hover
      }] text-[${this.color[this.variant]}] border-${
        this.border[this.variant]
      }`;
    },
  },
};
</script>

<style lang="scss" scoped>
/* button {
  background: var(--bg-color);
  color: var(--text-color);
  border: var(--border);
  &:hover {
    background: var(--bg-color-hover);
  }
} */

/* .primary{
   background: #003084;
  color: var(--text-color);
  border: var(--border);
  &:hover {
    background: var(--bg-color-hover);
  }
} */
</style>
