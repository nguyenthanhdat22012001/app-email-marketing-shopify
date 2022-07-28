<template>
  <div
    class="campaign--create-page flex flex-col bg-gray-light gap-[30px] pb-[60px]"
  >
    <div
      class="campaign-create-page--head flex justify-between py-4 pl-[30px] pr-5 bg-white"
    >
      <div class="head--left flex items-center gap-[10px]">
        <v-button variant="secondary" @click="$router.go(-1)" class="px-4 py-3"
          ><img src="@/assets/icons/icon-back.svg" alt=""
        /></v-button>
        <h1 class="font-medium text-lg lead-[22px]">Create new campaign</h1>
      </div>
      <div class="head--right flex items-center gap-[10px]">
        <v-button variant="secondary" class="py-1 px-5">Cancel</v-button>
        <v-button variant="primary" class="py-1 px-7">Save</v-button>
      </div>
    </div>
    <div
      class="campaign-create-page--content flex-1 bg-gray-light flex gap-6 pl-[25px] pr-5"
    >
      <div class="content--left flex flex-col gap-[25px] w-2/5">
        <campaign-input title="Campaign Name">
          <div class="flex border border-solid border-light p-3 gap-3">
            <v-input
              placeholder="Enter your campaign name"
              class="flex-1"
              v-model="campaignName"
              maxlength="150"
            ></v-input>
            <p class="text-light">|</p>
            <p class="text-gray-light w-[60px]">
              {{ campaignName.length }}/150
            </p>
          </div>
        </campaign-input>
        <campaign-input title="Send to customer?">
          <button
            class="w-full flex justify-center items-center border border-dashed border-light bg-[#FAFAFC] text-primary text-sm py-[13px]"
          >
            + Add customer
          </button>
        </campaign-input>
        <campaign-input title="Subject">
          <div
            class="variant w-full p-3 text-black-light border border-light border-solid rounded"
            v-for="(item, index) in variant"
            :key="index"
          >
            {{ item }}
          </div>
          <campaign-variants></campaign-variants>
        </campaign-input>
        <campaign-input title="Email Content">
          <v-ckeditor v-model="emailContent"></v-ckeditor>
          <campaign-variants></campaign-variants>
        </campaign-input>
        <campaign-input title="Email footer">
          <v-ckeditor v-model="emailContentFooter"></v-ckeditor>
          <campaign-variants></campaign-variants>
        </campaign-input>
        <div class="flex bg-white px-6 py-5 justify-between">
          <div class="left text-sapphire flex gap-2 font-medium text-base">
            <img src="@/assets/icons/palette.svg" alt="" />
            Customize email
          </div>
          <img src="@/assets/icons/angle-right.svg" alt="" />
        </div>
      </div>
      <div class="content--right flex flex-col w-3/5">
        <h1>Preview</h1>
      </div>
    </div>
    <div
      class="campaign-create-page--footer flex justify-end border-t border-t-light border-t-solid pt-5 mx-5 items-end"
    >
      <v-button variant="secondary" class="py-1 px-5">Cancel</v-button>
      <v-button variant="primary" class="py-1 px-7">Save</v-button>
    </div>
  </div>
</template>

<script>
import VButton from "@/components/VButton.vue";
import VInput from "@/components/VInput.vue";
import VCkeditor from "@/components/VCKEditor.vue";
import CampaignInput from "../components/CampaignInput.vue";
import CampaignVariants from "../components/CampaignVariants.vue";
export default {
  components: {
    VButton,
    VInput,
    CampaignInput,
    VCkeditor,
    CampaignVariants,
  },
  data() {
    return {
      campaignName: "",
      emailContent: `Hi ${this.createVariantText(
        "Customer_Last_name"
      )},Fed up with hopping around between Socialwidget and Shopify admin dashboard? Well, that ends now since we've just switched Socialwidget into an embedded app, allowing you to get access to and use it right in your admin panel.This is to ensure that we can provide you with the best in-app experience!`,
      emailContentFooter: `Copyright 2010-2022 Firegroup, all rights reserved.`,
      variant: ["We are giving away 5 months FREE to use the app"],
      isShowVariants: false,
    };
  },

  methods: {
    createVariantText(text) {
      return `<span style="background:#003084;color:#ffffff" class="variant">${text}</span>`;
    },
    showVariants() {
      this.isShowVariants = !this.isShowVariants;
      console.log(this.isShowVariants);
    },
  },
};
</script>

<style lang="scss" scoped>
.ck-content span {
  background: #003084;
  color: #ffffff;
}
</style>
