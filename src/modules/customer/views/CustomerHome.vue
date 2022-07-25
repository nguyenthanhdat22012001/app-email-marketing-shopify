<template>
  <div>
    <!-- <v-checkbox prop_input_value="dat" v-model="name"></v-checkbox>
    <v-checkbox
      prop_is_checkbox_custom
      prop_input_value="nam"
      v-model="name"
    ></v-checkbox> -->
  <!-- <v-avatar prop_string_name="nguyen dat"></v-avatar>
  <v-avatar prop_string_name="dat"></v-avatar> -->
  <v-select></v-select>
  </div>
</template>

<script>
// import VAvatar from "@/components/VAvatar.vue";
import VSelect from "@/components/VSelect.vue";

export default {
  components: {
    VSelect
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
