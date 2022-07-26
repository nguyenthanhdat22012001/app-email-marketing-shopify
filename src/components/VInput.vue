<template>
  <input
    :type="type"
    :value="value"
    @input="$emit('input', $event.target.value)"
    :placeholder="placeholder"
    class="border-none outline-none placeholder:text-gray-light"
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
