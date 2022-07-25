<template>
  <div>
    <v-button @click="showMessage" variant="secondary">Button</v-button>
    <v-select-input v-model="selectValue">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </v-select-input>
    <v-input v-model="inputValue" type="number" />
    <p>{{ inputValue }}</p>
  </div>
</template>

<script>
import VButton from "@/components/VButton.vue";
import VSelectInput from "@/components/VSelectInput.vue";
import VInput from "@/components/VInput.vue";

export default {
  data() {
    return {
      selectValue: 2,
      inputValue: "hello",
    };
  },
  components: {
    VButton,
    VSelectInput,
    VInput,
  },
  methods: {
    showMessage() {
      console.log("click");
    },
  },
};
</script>

<style lang="scss" scoped></style>
