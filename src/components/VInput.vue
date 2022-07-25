<template>
  <input
    class="border-0 bg-white focus:outline-0"
    :type="type"
    :value="value"
    @input="$emit('input', $event.target.value)"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  props: {
    value: {
      default: "",
    },
    type: {
      default: "text",
      validator(value) {
        return ["text", "number"].includes(value);
      },
    },
    placeholder: String,
  },
};
</script>
