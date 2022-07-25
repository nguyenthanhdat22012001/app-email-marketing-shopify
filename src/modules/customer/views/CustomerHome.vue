<template>
  <div class="flex justify-center items-center">
    <v-progress v-model="progress" label="Syncing customers from Shopify" />
  </div>
</template>

<script>
import VProgress from "@/components/VProgress.vue";
export default {
  components: {
    VProgress,
  },
  data() {
    return {
      progress: 50,
    };
  },

  methods: {},
};
</script>

<style lang="scss" scoped></style>
