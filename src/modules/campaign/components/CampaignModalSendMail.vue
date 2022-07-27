<template>
  <v-modal :visible="visible" class="w-[486px] pt-7 pb-6 pr-6 pl-[44px] bg-white">
    <template #modal--header>
      <img class="mb-2.5" src="@/assets/icons/send-email.svg" alt="" />
      <h4 class="font-bold text-lg text-black-light">
        Send test email
      </h4>
      <p class="text-muted">Please enter your email to receive template test</p>
    </template>
  </v-modal>
</template>
<script>
import VModal from "@/components/VModal.vue";
export default {
  components: {
    VModal,
  },
  props: {
    visible: {
      default: false,
      type: Boolean,
    },
  },
};
</script>
<style></style>
