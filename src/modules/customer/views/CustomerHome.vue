<template>
  <div>
    <!-- <v-checkbox prop_input_value="dat" v-model="name"></v-checkbox>
    <v-checkbox
      prop_is_checkbox_custom
      prop_input_value="nam"
      v-model="name"
    ></v-checkbox> -->
  </div>
</template>

<script>
import VCheckbox from "@/components/VCheckbox.vue";

export default {
  components: {
    VCheckbox,
  },
  data() {
    return {
      name: [],
    };
  },
  watch: {
    name(newValue, oldValue) {
      console.log(this.name);
    },
  },
};
</script>

<style lang="scss" scoped></style>
