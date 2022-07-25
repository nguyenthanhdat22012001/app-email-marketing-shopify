<!--  EX
<v-checkbox
      prop_is_checkbox_custom
      prop_input_value="nam"
      v-model="name"
    ></v-checkbox> 
    -->

<template>
  <div class="VSelect inline-flex justify-center bg-gray-light">
    <select class="py-2 pl-3.5 pr-2.5 border-0 font-medium text-muted">
      <option value="">Create date</option>
      <option value="">Create date</option>
    </select>
    <CaretDown class="pr-3" />
  </div>
</template>
<script>
import CaretDown from "@/assets/icons/caret-down.svg";
export default {
  components: {
    CaretDown,
  },
  props: {
    prop_string_name: {
      type: String,
      default: "",
    },
  },
  methods: {},
  computed: {},
};
</script>

<style lang="scss" scoped>
.VSelect {
  cursor: pointer;
  //   position: relative;
  &__icon {
    // position: absolute;
    // content: '';
    // top: 50%;
    // right: 12px;
  }
}
</style>
