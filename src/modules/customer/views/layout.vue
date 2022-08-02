<template>
  <div class="customer-layout flex flex-col px-[55px] py-[35px] gap-5 flex-1 bg-gray-light">
    <div class="flex justify-between w-full items-center">
      <h1 class="font-extrabold text-xl lead-6 ">Customer</h1>
      <div class="flex gap-[10px] ">
        <v-button variant="secondary">
          <img src="@/assets/icons/download.svg" />
          Export CSV
        </v-button>
        <v-button variant="primary">
          <img src="@/assets/icons/async.svg" />
          Manual sync
        </v-button>
      </div>
    </div>
    <router-view class="flex-1 "></router-view>
  </div>
</template>

<script>
import VButton from "@/components/VButton.vue";
export default {
  components: {
    VButton,
  },
};
</script>

<style lang="scss" scoped>
.customer-layout {
  padding: 50px;
}
</style>
