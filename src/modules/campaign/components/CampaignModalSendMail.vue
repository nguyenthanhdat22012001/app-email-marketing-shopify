<!--  EX
    <campaign-modal-send-mail
      v-model="visible"
      @emitCloseModal="handleCloseModal"
    ></campaign-modal-send-mail>

-->

<template>
  <v-modal v-model="visible">
    <div class="w-[486px] pt-7 pr-6 pb-6 pl-[44px]">
      <div class="mt-1">
        <img class="mb-2.5" src="@/assets/icons/send-email.svg" alt="" />
        <h4 class="font-bold text-lg text-black-light">Send test email</h4>
        <p class="text-muted">
          Please enter your email to receive template test
        </p>
      </div>
      <div class="mt-4">
        <v-input
          class="w-[100%] rounded py-3 px-[13px] border border-[#EBEBF0]"
          type="text"
          placeholder="Enter your email"
        ></v-input>
      </div>
      <div class="mt-[59px] mb-[18px] flex justify-end gap-4">
        <v-button variant="secondary" class="py-[8px] px-9 text-3 font-medium" @click="$emit('emitCloseModal')">No, Cancel</v-button>
        <v-button variant="primary" class="py-[8px] px-9 text-3 font-medium"
          >Send</v-button
        >
      </div>
    </div>
  </v-modal>
</template>
<script>
import VModal from "@/components/VModal.vue";
import VInput from "@/components/VInput.vue";
import VButton from "@/components/VButton.vue";

export default {
  components: {
    VModal,
    VInput,
    VButton,
  },
  props: {
    value: {
      type: [Boolean],
    },
  },
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
<style></style>
