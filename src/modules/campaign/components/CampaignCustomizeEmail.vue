<template>
  <div class="accordion w-[100%] bg-white py-[19px] px-[25px]">
    <div class="accordion-header flex justify-between items-center font-medium">
      <div class="flex gap-2 items-center text-sapphire">
        <img src="@/assets/icons/color.svg" alt="" />
        <h4>Customize email</h4>
      </div>
      <a @click="ontoggle()" class="cursor-pointer">
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0937 1.6875 13.0937 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"
            fill="#003084"
          />
        </svg>
      </a>
    </div>

    <div
      class="accordion-body flex gap-5 flex-col overflow-hidden h-0"
      :class="is_open ? 'active mt-[25px]' : ''"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      is_open: false,
    };
  },
  methods: {
    ontoggle() {
      this.is_open = !this.is_open;
    },
  },
};
</script>
<style lang="scss" scoped>
.accordion-body {
  transition: height 0.5s ease;
}
.active {
  height: 100%;
}
</style>
