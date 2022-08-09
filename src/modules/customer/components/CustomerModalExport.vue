<template>
  <v-modal v-model="visible">
    <div class="w-[400px] h-[200px] p-6 flex flex-col gap-2">
      <h1 class="font-medium text-lg"><slot name="title">Message</slot></h1>
      <slot name="message"></slot>
      <div class="flex justify-end gap-2 mt-auto items-end">
        <v-button variant="secondary" @click="visible = false">Cancel</v-button>
        <v-button>Confirm</v-button>
      </div>
    </div>
  </v-modal>
</template>

<script>
import VModal from "@/components/VModal.vue";
import VButton from "@/components/VButton.vue";

export default {
  components: {
    VModal,
    VButton,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
