<template>
  <div>
    <h2 class="text-[40px] text-black font-bold mb-2.5">Login</h2>
    <p class="text-[16px] text-dark">Please enter your Shopify URL to login</p>
    <div class="flex items-center">
      <v-input type="text"></v-input>
      <span>.myshopify.com</span>
    </div>
  </div>
</template>
<script>
import VInput from "@/components/VInput.vue";

export default {
  components: {
    VInput,
  },
};
</script>
<style></style>
