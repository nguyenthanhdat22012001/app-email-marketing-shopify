<!--  EX
 <v-select-number-range prop_label="Total spent1" @emitVSelectNumberRange="(payload) => objData = payload" />
-->

<template>
  <div class="relative">
    <div
      @click="is_open = !is_open"
      class="z-0 inline-flex justify-center gap-x-2.5 cursor-pointer py-2 px-3.5 border border-[#EBEBF0] bg-secondary font-medium text-muted"
    >
      <span>{{ prop_label }}</span>
      <img src="@/assets/icons/caret-down.svg" alt="" />
    </div>
    <div
      v-show="is_open"
      id="dropdown"
      class="z-10 absolute right-0 top-full w-[244px] border border-[#EBEBF0] rounded py-3.5 pl-3 pr-4 bg-secondary"
    >
      <div class="flex gap-2">
        <input
          type="number"
          placeholder="From"
          v-model="data_input.from"
          class="VSelectNumberRange__input w-[104px] px-2.5 py-2 border border-[#EBEBF0] rounded focus:outline-0"
        />
        <input
          type="number"
          v-model="data_input.to"
          placeholder="To"
          class="VSelectNumberRange__input w-[104px] px-2.5 py-2 border border-[#EBEBF0] rounded focus:outline-0"
        />
      </div>
      <div class="flex justify-between items-center pt-2.5">
        <v-button variant="primary" @click="handEmitDataChange()">Ok</v-button>
        <a class="cursor-pointer text-primary" @click="onClearInputs()"
          >Clear</a
        >
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
  props: {
    prop_label: {
      type: String,
      default: "",
    },
    data_from: {
      type: String,
      default: "",
    },
    data_to: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      is_open: false,
      data_input: {
        from: this.data_from,
        to: this.data_to,
      },
    };
  },
  methods: {
    onClose() {
      this.is_open = false;
    },
    handEmitDataChange() {
      this.$emit("emitVSelectNumberRange", this.data_input);
      this.onClose();
    },
    onClearInputs() {
      this.data_input = {
        from: "",
        to: "",
      };
      this.$emit("emitVSelectNumberRange", this.data_input);
    },
  },
  computed: {},
  created: function () {
    let self = this;
    window.addEventListener("click", function (e) {
      if (!self.$el.contains(e.target)) {
        self.is_open = false;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
