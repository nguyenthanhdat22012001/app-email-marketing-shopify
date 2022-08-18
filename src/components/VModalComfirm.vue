<template>
  <v-modal v-model="visible" :backdrop="true">
    <div class="relative w-[500px] pt-[30px] pb-[18px] flex flex-col">
      <div class="w-full pr-[22px] pl-[30px]">
        <h4 class="text-xl font-semibold text-dark">{{prop_title}}</h4>
        <div class="flex justify-end gap-4 mt-8">
          <v-button
            variant="secondary"
            class="py-[6px] px-[22px] text-sm font-medium"
            @click="handleClickCancel"
            >Cancel</v-button
          >
          <v-button
            variant="primary"
            class="py-[6px] px-[22px] text-sm font-medium"
            @click="handleClickAgree"
            >Ok</v-button
          >
        </div>
      </div>
    </div>
  </v-modal>
</template>
<script>
import VModal from "../components/VModal.vue";
import VButton from "@/components/VButton.vue";

export default {
  components: {
    VModal,
    VButton,
  },
  props: {
    value: {
      type: [Boolean],
    },
    prop_title: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleClickCancel() {
      this.$emit("emitCloseModal");
    },
    handleClickAgree() {
      this.$emit("emitAgree");
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
