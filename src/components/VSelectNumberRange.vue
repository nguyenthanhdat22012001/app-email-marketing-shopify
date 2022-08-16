<!--  EX
 <v-select-number-range prop_label="Total spent1" @emitVSelectNumberRange="(payload) => objData = payload" />
-->

<template>
  <div class="relative z-20">
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
        <div>
          <input
            type="number"
            placeholder="From"
            v-model="data_input.from"
            class="VSelectNumberRange__input w-[104px] px-2.5 py-2 border border-[#EBEBF0] rounded focus:outline-0"
          />
          <div class="text-sm mt-1 text-red" v-if="formstate">
            <template v-if="!validation.form.input_from.required.valid">
              <p>
                {{ validation.form.input_from.required.message }}
              </p></template
            >
            <template v-else-if="!validation.form.input_from.is_number.valid">
              <p>{{ validation.form.input_from.is_number.message }}</p>
            </template>
          </div>
        </div>
        <div>
          <input
            type="number"
            v-model="data_input.to"
            placeholder="To"
            class="VSelectNumberRange__input w-[104px] px-2.5 py-2 border border-[#EBEBF0] rounded focus:outline-0"
          />
          <div class="text-sm mt-1 text-red" v-if="formstate">
            <template v-if="!validation.form.input_to.required.valid">
              <p>{{ validation.form.input_to.required.message }}</p></template
            >
            <template v-else-if="!validation.form.input_to.is_number.valid">
              <p>{{ validation.form.input_to.is_number.message }}</p>
            </template>
            <template v-else-if="!validation.form.input_to.is_bigger.valid">
              <p>{{ validation.form.input_to.is_bigger.message }}</p>
            </template>
          </div>
        </div>
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

import { validateIsNumber } from "@/helper/validates";

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
      formstate: false,
      data_input: {
        from: this.data_from,
        to: this.data_to,
      },
    };
  },
  methods: {
    onClose() {
      this.formstate = false;
      this.is_open = false;
    },
    handEmitDataChange() {
      this.formstate = true;
      if (this.formstate && this.validation) {
        this.$emit("emitVSelectNumberRange", this.data_input);
        this.onClose();
      }
    },
    onClearInputs() {
      this.formstate = false;
      this.data_input = {
        from: "",
        to: "",
      };
      this.$emit("emitVSelectNumberRange", this.data_input);
    },
    handleSetABSInput(from, to) {
      this.data_input.from = Math.abs(from);
      this.data_input.to = Math.abs(to);
    },
  },
  computed: {
    validation() {
      this.handleSetABSInput(this.data_input.from, this.data_input.to);
      const input_from = {
        required: {
          valid: this.data_input.from ? true : false,
          message: "This field is required!",
        },
        is_number: {
          valid: validateIsNumber(this.data_input.from) ? true : false,
          message: "This field is number!",
        },
      };

      const input_to = {
        required: {
          valid: this.data_input.from ? true : false,
          message: "This field is required!",
        },
        is_number: {
          valid: validateIsNumber(this.data_input.from) ? true : false,
          message: "This field is number!",
        },
        is_bigger: {
          valid: function () {
            if (input_from.required.valid && input_to.is_number.valid) {
              if (this.input_from > this.input_to) {
                return false;
              }
            }
            return true;
          },
          message: function () {
            if (input_to.is_number.valid) {
              if (this.input_from > this.input_to) {
                return "This field is bigger!";
              }
            }
            return "";
          },
        },
      };

      return {
        form: {
          input_from,
          input_to,
        },
        valid:
          input_from.required.valid &&
          input_from.is_number.valid &&
          input_to.required.valid &&
          input_to.is_number.valid &&
          input_to.is_bigger.valid,
      };
    },
  },
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
