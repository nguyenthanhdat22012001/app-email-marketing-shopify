<template>
  <input
    class="border-0 bg-white focus:outline-0"
    :type="type"
    :value="value"
    @input="$emit('input', $event.target.value)"
    :placeholder="placeholder"
<<<<<<< HEAD
    class="border-none outline-none placeholder:text-gray-light"
=======
>>>>>>> d654cf14a98054a85a0d051dd700f5a74e70e402
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
