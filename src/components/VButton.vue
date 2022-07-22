<template>
  <button :class="{'bg-primary': variant === 'primary' }" :style="cssProps">
    <slot></slot>
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
  },
  mounted(){
    console.log(this.variant)
  }
};
</script>

<style lang="scss" scoped>

</style>
