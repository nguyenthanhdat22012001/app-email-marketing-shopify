<template>
  <div class="campaign--create-page ">
    <div class="campaign-create-page--head flex justify-between py-4 px-8">
      <div class="head--left flex items-center gap-[10px]">
        <v-button variant="secondary"
          ><img src="@/assets/icons/icon-back.svg" alt=""
        /></v-button>
        <h1>Create new campaign</h1>
      </div>
      <div class="head--right flex items-center gap-[10px]">
        <v-button variant="secondary">Cancel</v-button>
        <v-button variant="primary">Save</v-button>
      </div>
    </div>
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

<style lang="scss" scoped></style>
