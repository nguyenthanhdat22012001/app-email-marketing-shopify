<template>
  <Transition>
    <div
      class="campaign--create-page flex flex-col bg-gray-light gap-[30px] pb-[60px]"
    >
      <div
        class="campaign-create-page--head flex justify-between py-4 pl-[30px] pr-5 bg-white"
      >
        <div class="head--left flex items-center gap-[10px]">
          <v-button
            variant="secondary"
            @click="$router.go(-1)"
            class="px-4 py-3"
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
        <div class="content--left flex flex-col gap-[25px] w-[45%]">
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
              @click="visibleCustomerEmailModal = true"
              v-if="!customersSelected.length"
            >
              + Add customer
            </button>
            <div
              class="w-full flex justify-between items-center border border-dashed border-light bg-[#FAFAFC] text-primary text-sm px-3 py-[13px]"
              v-else
            >
              <div
                class="customers--selected__display flex gap-[5px] items-center"
              >
                <div>
                  <v-avatar
                    v-for="(id, index) in customersSelected.slice(0, 3)"
                    :key="id"
                    :name="customers.filter((item) => item.id == id)[0].name"
                    class="avatar--selected bg-primary text-white z-[1]"
                    :style="`z-index: ${index};--z-index:${index}`"
                  />
                </div>
                <span class="text-dark"
                  >+ {{ customersSelected.length }} customers</span
                >
              </div>
              <button
                class="outline-none text-primary"
                @click="visibleCustomerEmailModal = true"
              >
                Manage
              </button>
            </div>
          </campaign-input>
          <campaign-input title="Subject">
            <v-tiptap-editor-not-menu
              prop_open_variant
              :prop_email_content="email_subject"
              @emitUpdateEmailContent="(value) => (email_subject = value)"
            ></v-tiptap-editor-not-menu>
          </campaign-input>
          <campaign-input title="Email Content">
            <v-tiptap-editor
              prop_open_variant
              :prop_email_content="email_content"
              @emitUpdateEmailContent="(value) => (email_content = value)"
            ></v-tiptap-editor>
          </campaign-input>
          <campaign-input title="Email footer">
            <v-tiptap-editor
              :prop_email_content="email_footer"
              @emitUpdateEmailContent="(value) => (email_footer = value)"
            ></v-tiptap-editor>
          </campaign-input>
          <campaign-customize-email>
            <campaign-banner-cover v-model="emailBanner" />
            <campaign-background-customize-email v-model="emailBackground" />
            <campaign-button-customize-email v-model="emailButton" />
          </campaign-customize-email>
        </div>
        <div class="content--right flex-1 break-normal">
          <campaign-preview
            :email-content="email_content"
            :email-footer="email_footer"
            :email-subject="email_subject"
            :email-banner="emailBanner"
            :email-background="emailBackground"
            :email-button="emailButton"
          ></campaign-preview>
        </div>
      </div>
      <div
        class="campaign-create-page--footer flex justify-end gap-4 border-t border-t-light border-t-solid pt-5 mx-5 items-end"
      >
        <v-button variant="secondary" class="py-1 px-5">Cancel</v-button>
        <v-button variant="primary" class="py-1 px-7">Save</v-button>
      </div>
      <campaign-modal-select-customer
        v-model="visibleCustomerEmailModal"
        @emitCloseModal="handleCloseModal"
      >
      </campaign-modal-select-customer>
    </div>
  </Transition>
</template>

<script>
import VButton from "@/components/VButton.vue";
import VInput from "@/components/VInput.vue";
import VTiptapEditor from "@/components/VTiptapEditor.vue";
import VTiptapEditorNotMenu from "@/components/VTiptapEditorNotMenu.vue";
import VAvatar from "@/components/VAvatar.vue";

import CampaignInput from "../components/CampaignInput.vue";
import CampaignCustomizeEmail from "../components/CampaignCustomizeEmail.vue";
import CampaignPreview from "../components/CampaignPreview.vue";
import CampaignBackgroundCustomizeEmail from "../components/CampaignBackgroundCustomizeEmail.vue";
import CampaignBannerCover from "../components/CampaignBannerCover.vue";
import CampaignButtonCustomizeEmail from "../components/CampaignButtonCustomizeEmail.vue";
import CampaignModalSelectCustomer from "../components/CampaignModalSelectCustomer.vue";

import { mapGetters } from "vuex";
export default {
  components: {
    VButton,
    VInput,
    VAvatar,
    CampaignInput,
    VTiptapEditor,
    VTiptapEditorNotMenu,
    CampaignPreview,
    CampaignCustomizeEmail,
    CampaignBackgroundCustomizeEmail,
    CampaignBannerCover,
    CampaignButtonCustomizeEmail,
    CampaignModalSelectCustomer,
  },
  data() {
    return {
      campaignName: "",
      email_content: "",
      email_footer: `Copyright 2010-2022 Firegroup, all rights reserved.`,
      isShowVariants: false,
      email_subject: "We are giving away 5 months FREE to use the app",
      visibleCustomerEmailModal: false,
      emailBanner: "",
      emailBackground: {
        color: "#ffffff",
        opacity: 100,
        radius: "3",
      },
      emailButton: {
        backgroundColor: "#003084",
        backgroundOpacity: 100,
        textColor: "#ffffff",
        textOpacity: 100,
        radius: 4,
        label: "TRY FREE NOW",
      },
    };
  },

  methods: {
    createVariantText(text) {
      return `<span style="border-radius:4px;padding:2px;background:#003084;color:#ffffff" class="variant">${text}</span>`;
    },
    showVariants() {
      this.isShowVariants = !this.isShowVariants;
    },
    handleCloseModal() {
      this.visibleCustomerEmailModal = false;
    },
  },

  computed: {
    ...mapGetters({
      customersSelected: "campaignStore/getCustomersSelected",
      customers: "customerStore/getCustomers",
    }),
  },
};
</script>

<style lang="scss" scoped>
.avatar--selected:not(:first-child) {
  transform: translateX(calc(-5px * var(--z-index)));
  border-left: 2px solid;
  box-sizing: unset;
}

/* we will explain what these classes do next! */
.v-enter-active {
  /* transform: translateX(100%); */
  animation: show 0.4s ease forwards;
  /* transition: transform 0.5s ease; */
}
.v-leave-active {
  animation: show 0.4s ease forwards reverse;
}
@keyframes show {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
/* .v-enter-from,
.v-leave-to {
  transform: translateX(100%);
  transition: transform 0.5s ease;
} */
</style>
