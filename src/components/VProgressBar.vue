<!--   EX
   <v-progress-bar
            :prop_number="500"
            :prop_total="1000"
          ></v-progress-bar>
-->

<template>
  <div>
    <span class="mb-[3px] text-[10px] font-semibold" :style="classProgressText"
      >{{ displayNumber }}%</span
    >
    <div class="w-full rounded-full h-1.5 mb-4 bg-gray-light">
      <div class="h-1.5 rounded-full" :style="classProgressContent"></div>
    </div>
    <div class="hidden">{{ numberSuccess }}</div>
  </div>
</template>
<script>
export default {
  props: {
    prop_percent: {
      type: Number,
      default: 0,
    },
    prop_status: {
      type: String,
      default: "running",
    },
  },
  data() {
    return {
      displayNumber: 0,
      counter: false,
    };
  },
  methods: {
    handleCountNumber() {
      clearInterval(this.counter);
      if (this.prop_status == "completed") {
        this.displayNumber = this.prop_percent;
        return;
      }
      if (this.prop_percent === this.displayNumber) {
        return;
      }
      this.counter = setInterval(() => {
        if (this.displayNumber !== this.prop_percent) {
          this.displayNumber = this.displayNumber + 1;
        } else {
          this.displayNumber = this.prop_percent;
          clearInterval(this.counter);
        }
      }, 20);
    },
  },
  computed: {
    classProgressContent: function () {
      return {
        width: `${this.displayNumber}%`,
        "background-color": this.displayNumber != 100 ? "#3E7BFA" : "#05A660",
      };
    },
    classProgressText: function () {
      return {
        color: this.displayNumber != 100 ? "#3E7BFA" : "#05A660",
      };
    },
    numberSuccess() {
      this.handleCountNumber();
      return this.prop_percent;
    },
  },
};
</script>
<style></style>
