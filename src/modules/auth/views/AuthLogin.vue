<template>
  <div class="w-full">
    <h2 class="text-[40px] text-black font-bold">Login</h2>
    <p class="text-[16px] text-dark mt-[11px]">
      Please enter your Shopify URL to login
    </p>
    <form @submit.prevent="handleLogin">
      <div class="flex items-center bg-white my-5">
        <v-input
          class="flex-1 border-0 py-4 px-[19px]"
          v-model="shopName"
          type="text"
          placeholder="Store Name"
          required
        ></v-input>
        <span class="pr-[19px]">.myshopify.com</span>
      </div>
      <v-button
        class="w-[100%] items-center justify-center py-3 mb-10 text-4 font-bold"
        >Login</v-button
      >
    </form>

    <p>
      Don't have a
      <img class="inline-block" src="@/assets/icons/shopify-text.svg" alt="" />
      store yet? <a href="#" class="text-primary">Create Now!</a>
    </p>
  </div>
</template>
<script>
import VInput from "@/components/VInput.vue";
import VButton from "@/components/VButton.vue";
import { mapActions } from "vuex";
export default {
  components: {
    VInput,
    VButton,
  },
  data() {
    return {
      shopName: "",
    };
  },
  methods: {
    ...mapActions({
      login: "auth/loginStore",
    }),
    handleLogin() {
      this.login({
        myshopify_domain: `${this.shopName}.myshopify.com`,
      })
        .then((res) => {
          // console.log(res)
          window.location = res;
        })
        .catch((err) => {
          console.log(err);
          this.toastMessageError({
            message: "Server Error!! Try again",
          });
        });
    },
  },
};
</script>
<style></style>
