<template>
  <div class="flex flex-col gap-[25px]">
    <div class="preview-head flex justify-between items-center">
        <h1 class="font-bold text-lg lead-5 ">Preview</h1>
        <v-button class="flex gap-[5px]">
            <img src="@/assets/icons/send-test.svg" alt="">
            <p>Send text</p>
        </v-button>
    </div>
    <div class="preview-body">
      <div class="preview-subject font-bold text-sm text-dark">
        <div class="subject--title">
          <span class="text-muted text-sm">Subject</span>
          We are giving away 5 months FREE to use the app
        </div>
      </div>
      <div class="preview-content"></div>
    </div>
  </div>
</template>

<script>
import VButton from '@/components/VButton.vue';
export default {
    components:{
        VButton
    }
};
</script>

<style lang="scss" scoped></style>
