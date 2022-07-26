<!--   EX
   <v-progress-bar
            :prop_number="500"
            :prop_total="1000"
          ></v-progress-bar>
-->

<template>
  <div>
    <span class="mb-[3px] text-[10px] font-semibold" :style="classProgressText"
      >{{ numberSuccess }}%</span
    >
    <div class="w-full rounded-full h-1.5 mb-4 bg-gray-light">
      <div class="h-1.5 rounded-full" :style="classProgressContent"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    prop_number: {
      type: Number,
      default: 0,
    },
    prop_total: {
      type: Number,
      default: 0,
    },
    prop_is_loading: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    classProgressContent: function () {
      return {
        width: `${this.numberSuccess}%`,
        "background-color": this.prop_is_loading ? "#3E7BFA" : "#05A660",
      };
    },
    classProgressText: function () {
      return {
        color: this.prop_is_loading ? "#3E7BFA" : "#05A660",
      };
    },
    numberSuccess() {
      console.log(this.prop_number / this.prop_total);
      return (this.prop_number / this.prop_total) * 100;
    },
  },
};
</script>
<style></style>
