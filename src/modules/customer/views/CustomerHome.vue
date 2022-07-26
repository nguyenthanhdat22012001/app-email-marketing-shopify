<template>
  <div :class="{ progressing: progress <= 100 }">
    <v-progress
      class="translate-y-full-180deg"
      v-model="progress"
      label="Syncing customers from Shopify"
      v-if="progress <= 100"
    />
    <div class="customer-content bg-secondary rounded h-full w-full flex flex-col gap-6">
      <customer-filter />
      <customer-content />
      <div class="customer-content--body"></div>
    </div>
  </div>
</template>

<script>
import VProgress from "@/components/VProgress.vue";
import CustomerFilter from "../components/CustomerFilter.vue";
import CustomerContent from "../components/CustomerContent.vue";
export default {
  components: {
    VProgress,
    CustomerFilter,
    CustomerContent,
  },
  data() {
    return {
      progress: 101,
      increaseProgress: null,
      
    };
  },
  mounted() {
    this.increaseProgress = setInterval(() => {
      this.progress++;
    }, 50);
  },
  watch: {
    progress(value) {
      if (value > 100) {
        clearInterval(this.increaseProgress);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.progressing {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
