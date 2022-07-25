<!--  EX
<v-checkbox
      prop_is_checkbox_custom
      prop_input_value="nam"
      v-model="name"
    ></v-checkbox> 
    -->

<template>
  <div class="inline-flex items-center gap-1">
    <input
      id="checkbox"
      type="checkbox"
      class="VCheckbox w-4 h-4 bg-inherit rounded-sm border border-[#C7C9D9]"
      :class="[
        prop_is_checkbox_custom ? 'VCheckbox--custom' : 'VCheckbox--default',
      ]"
      :value="prop_input_value"
      v-model="checkbox"
    />
    <label for="checkbox">asdsa</label>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      default(rawProps) {
        return [];
      },
    },
    prop_input_value: {
      type: String,
      default: "",
    },
    prop_is_checkbox_custom: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    checkbox: {
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

<style lang="scss" scoped>
.VCheckbox {
  position: relative;
  appearance: none;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
  }
  &--custom {
    &::before {
      width: 10px;
      height: 2.5px;
      border-radius: 1px;
      background: #ffffff;
    }
  }
  &--default {
    &::before {
      width: 100%;
      height: 100%;
      background-image: url("@/assets/icons/Check.svg");
      transform: translate(-60%, -45%);
    }
  }
  &:checked {
    background-color: #3e7bfa;
    &::before {
      display: block;
    }
  }
}
</style>
