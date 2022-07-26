<template>
  <div :class="{ progressing: progress <= 100 }">
    <v-progress-loading
      class="translate-y-full-180deg"
      v-model="progress"
      label="Syncing customers from Shopify"
      v-if="progress <= 100"
    />
    <div
      class="customer-content bg-secondary rounded h-full w-full flex flex-col gap-6 shadow-content"
      v-show="progress > 100"
    >
      <customer-filter/>
      <customer-content/>
      <div class="customer-content--body"></div>
    </div>
  </div>
</template>

<script>
import VProgressLoading from "@/components/VProgressLoading.vue";
import CustomerFilter from "../components/CustomerFilter.vue";
import CustomerContent from "../components/CustomerContent.vue";
import { mapActions } from "vuex";
export default {
  components: {
    VProgressLoading,
    CustomerFilter,
    CustomerContent,
  },
  data() {
    return {
      progress: 0,
      increaseProgress: null,
    };
  },
  created() {
    this.fetchCustomer();
  },
  mounted() {
    this.increaseProgress = setInterval(() => {
      this.progress += 2;
    }, 50);
  },
  methods:{
    ...mapActions({
      fetchCustomer:'customerStore/fetchCustomer'
    })
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
