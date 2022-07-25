<template>
  <div :class="{ progressing: progress <= 100 }">
    <v-progress
      class="translate-y-full-180deg"
      v-model="progress"
      label="Syncing customers from Shopify"
      v-if="progress <= 100"
    />
    <div class="customer-content bg-secondary rounded h-full w-full">
      <div class="customer-content--head px-5 pt-5 flex">
        <div
          class="search-bar flex gap-[10px] rounded border border-solid border-light p-[10px] flex-1"
        >
          <img src="@/assets/icons/search.svg" alt="" />
          <v-input
            placeholder="Search customers by name, phone, email..."
            v-model="searchText"
            class="flex-1"
          />
        </div>
        <div class="filter">
          
        </div>
      </div>
    </div>
    <div class="customer-content--body"></div>
  </div>
</template>

<script>
import VProgress from "@/components/VProgress.vue";
import VInput from "@/components/VInput.vue";
export default {
  components: {
    VProgress,
    VInput,
  },
  data() {
    return {
      progress: 0,
      increaseProgress: null,
      searchText: "",
    };
  },
  mounted() {
    this.increaseProgress = setInterval(() => {
      this.progress++;
      console.log(this.progress);
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
