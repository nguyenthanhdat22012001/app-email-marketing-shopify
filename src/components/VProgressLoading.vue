<!--<v-progress v-model="percent"/> -->

<template>
  <div class="flex flex-col items-center gap-4">
    <div class="progress w-[50px] h-[50px] bg-[#C4C4C4] rounded-full relative">
      <div class="outer h-full w-full flex justify-center items-center">
        <div
          class="inner h-[40px] text-muted w-[40px] rounded-full bg-[#ffffff] flex justify-center items-center font-semibold text-xs lead-4"
        >
          {{ value }}%
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="50px"
        height="50px"
        class="absolute top-0 left-0"
      >
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stop-color="#003084" />
            <stop offset="100%" stop-color="#0294D7" />
          </linearGradient>
        </defs>
        <circle
          cx="25"
          cy="25"
          r="22"
          stroke-linecap="round"
          :style="{ '--progress': 138 - (value / 100) * 138 }"
        />
      </svg>
    </div>
    <label for="sync-data" class="text-muted lead-4">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    label: {
      default: "Loading",
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.outer {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    background: #ffffff;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    top: 1px;
    z-index: 100;
  }
}
svg {
  transform: rotateZ(-90deg);
  transform-origin: center center;
}
circle {
  fill: none;
  stroke: url(#GradientColor);
  stroke-width: 6px;
  stroke-dasharray: 138;
  stroke-dashoffset: 138;
  animation: progress 1s linear forwards;
}
@keyframes progress {
  100% {
    stroke-dashoffset: var(--progress);
  }
}
</style>
