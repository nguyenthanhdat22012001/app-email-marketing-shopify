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
          <v-button variant="primary" class="py-1 px-7" @click="onSendMail()"
            >Save</v-button
          >
        </div>
      </div>
      <div
        class="campaign-create-page--content flex-1 bg-gray-light flex gap-6 pl-[25px] pr-5"
      >
        <div class="content--left flex flex-1 flex-col gap-[25px] w-[45%]">
          <campaign-input title="Campaign Name">
            <div class="flex border border-solid border-light p-3 gap-3">
              <v-input
                placeholder="Enter your campaign name"
                class="flex-1"
                v-model="campaignName"
                maxlength="255"
              ></v-input>
              <p class="text-light">|</p>
              <p class="text-gray-light w-[60px]">
                {{ campaignName.length }}/255
              </p>
            </div>
            <div class="text-sm mt-1 text-red" v-if="formstate">
              <template v-if="!validation.form.campaignName.required.valid">
                <p class="alert-error">
                  {{ validation.form.campaignName.required.message }}
                </p>
              </template>
              <template
                v-else-if="!validation.form.campaignName.minLength.valid"
              >
                <p class="alert-error">
                  {{ validation.form.campaignName.minLength.message }}
                </p>
              </template>
            </div>
          </campaign-input>
          <campaign-input title="Send to customer?">
            <button
              class="w-full flex justify-center items-center border border-dashed border-light bg-[#FAFAFC] text-primary text-sm py-[13px]"
              @click="visible_customer_email_modal = true"
              v-if="data_customer.number_customer_select == 0"
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
                    v-for="(item, index) in data_customer.customers_avatar"
                    :key="item.id"
                    :name="item.first_name + ' ' + item.last_name"
                    class="avatar--selected bg-primary text-white z-[1]"
                    :style="`z-index: ${index};--z-index:${index}`"
                  />
                </div>
                <span
                  class="text-dark"
                  v-if="data_customer.number_customer_select > 3"
                  >+
                  {{
                    data_customer.number_customer_select -
                    data_customer.customers_avatar.length
                  }}
                  customers</span
                >
                <span class="text-dark" v-else>customers</span>
              </div>
              <button
                class="outline-none text-primary"
                @click="visible_customer_email_modal = true"
              >
                Manage
              </button>
            </div>
            <div class="text-sm mt-1 text-red" v-if="formstate">
              <template v-if="!validation.form.send_customer.required.valid">
                <p class="alert-error">
                  {{ validation.form.send_customer.required.message }}
                </p>
              </template>
            </div>
          </campaign-input>
          <campaign-input title="Subject">
            <v-tiptap-editor-not-menu
              prop_open_variant
              :prop_email_content="email_subject"
              @emitUpdateEmailContent="(value) => (email_subject = value)"
              maxlength="78"
            ></v-tiptap-editor-not-menu>
            <div class="text-sm mt-1 text-red" v-if="formstate">
              <template v-if="!validation.form.email_subject.required.valid">
                <p class="alert-error">
                  {{ validation.form.email_subject.required.message }}p>
                </p></template
              >
            </div>
          </campaign-input>
          <campaign-input title="Email Content">
            <v-tiptap-editor
              prop_open_variant
              :prop_email_content="email_content"
              @emitUpdateEmailContent="(value) => (email_content = value)"
            ></v-tiptap-editor>
            <div class="text-sm mt-1 text-red" v-if="formstate">
              <template v-if="!validation.form.email_content.required.valid">
                <p class="alert-error">
                  {{ validation.form.email_content.required.message }}p>
                </p></template
              >
            </div>
          </campaign-input>
          <campaign-input title="Email footer">
            <v-tiptap-editor
              :prop_email_content="email_footer"
              @emitUpdateEmailContent="(value) => (email_footer = value)"
            ></v-tiptap-editor>
          </campaign-input>
          <campaign-customize-email>
            <campaign-banner-cover
              v-model="banner_url"
              @emitUpdateBannerEmail="(value) => (email_banner = value)"
            />
            <campaign-background-customize-email v-model="emailBackground" />
            <campaign-button-customize-email v-model="emailButton" />
          </campaign-customize-email>
        </div>
        <div class="content--right w-[calc(100%*calc(10/19))] break-normal">
          <campaign-preview
            ref="ref_preview"
            :email-content="email_content"
            :email-footer="email_footer"
            :email-subject="email_subject"
            :email-banner="banner_url"
            :email-background="emailBackground"
            :email-button="emailButton"
            @emitChangeTextColorContent="
              (color_text) => (this.emailBackground.color_text = color_text)
            "
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
        v-model="visible_customer_email_modal"
        @emitCloseModal="handleCloseModal"
        @emitHandleAddAvatarSendToCustomer="(data) => (data_customer = data)"
      >
      </campaign-modal-select-customer>
      <!-- <div>{{ opacity }}</div> -->
      <div class="hidden">{{ validateScroll }}</div>
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

import { api } from "@/plugins";
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
      email_footer: `<p style="text-align: center">Copyright 2010-2022 Firegroup, all rights reserved.</p>`,
      email_subject: "",
      visible_customer_email_modal: false,
      email_banner: "",
      banner_url: "",
      emailBackground: {
        color: "#ffffff",
        opacity: 100,
        radius: 3,
        color_text: "#28293D",
      },
      emailButton: {
        backgroundColor: "#003084",
        backgroundOpacity: 100,
        textColor: "#ffffff",
        textOpacity: 100,
        radius: 4,
        label: "TRY FREE NOW",
      },
      data_customer: {
        number_customer_select: 0,
        list_customer_selected: [],
        list_customer_exect: [],
        customers_avatar: [],
        select_all: false,
      },
      formstate: false,
    };
  },

  methods: {
    handleCloseModal() {
      this.$eventBus.$emit(
        "eventBusReturnBackDataCustomerOld",
        this.data_customer
      );
      this.visible_customer_email_modal = false;
    },
    checkValue(value) {
      if (value > 100) {
        return 100;
      }
      return Number(value);
    },
    handleGetVariantInString(element_html) {
      let string =
        typeof element_html == "object" ? element_html.outerHTML : element_html;
      let variants = [
        "Customer_Last_name",
        "Customer_First_name",
        "Customer_Full_name",
        "Shop_name",
      ];
      let newVariants = [];
      variants.forEach((item) => {
        if (string.includes(`id="${item}"`)) {
          newVariants.push(item);
        }
      });
      return newVariants;
    },
    handleGetDataCreateCampaign() {
      let el_preview_body = this.$refs.ref_preview.$el.children[1];
      let el_preview_content = el_preview_body.children[1];
      let variants_subject = this.handleGetVariantInString(this.email_subject);
      let variants_content = this.handleGetVariantInString(el_preview_content);
      const cloneNode = el_preview_content.cloneNode(true);
      const table = cloneNode.querySelector("table");
      table.style.width = "600px";
      const parser = new DOMParser();
      const newSubject = parser.parseFromString(
        this.email_subject,
        "text/html"
      ).firstChild;
      let data = {
        store_id: 1,
        name: this.campaignName,
        subject: newSubject.innerText,
        content: this.email_content,
        footer: this.email_footer,
        variant_name: [...variants_subject, ...variants_content],
        color_content: this.emailBackground.color_text,
        background_banner: this.email_banner,
        background_color: this.emailBackground.color,
        background_radius: `${this.emailBackground.radius}px`,
        button_label: this.emailButton.label,
        button_radius: `${this.emailButton.radius}px`,
        button_background_color: this.emailButton.backgroundColor,
        button_text_color: this.emailButton.textColor,
        list_mail_customers: [],
        preview_email: cloneNode.outerHTML,
      };
      return data;
    },
    // handle send mail
    async onSendMail() {
      this.formstate = true;
      this.validateScroll();
      if (this.validation.valid) {
        let data = this.handleGetDataCreateCampaign();
        let newData = {
          ...data,
          list_mail_customers: [
            "josephine19@gmail.com",
            "kautzer.cristian@gaylord.com",
            "elva07@pagac.com",
          ],
        };
        const formData = new FormData();
        for (let [key, value] of Object.entries(newData)) {
          formData.append(key, value);
        }
        console.log(formData);
        await this.handleSendMailApi(formData);
        this.$router.push({ name: "campaign" });
      }
    },
    async handleSendMailApi(data) {
      try {
        await api.CAMPAIGN.postSendMail(data);
      } catch (error) {
        console.log("error", error);
      }
    },
    // handle send test mail
    async onSendTestMail(email) {
      this.formstate = true;
      this.validateScroll();
      if (this.validation.valid) {
        let data = this.handleGetDataCreateCampaign();
        let newData = { ...data, list_mail_customers: [email] };
        await this.handleSendTestMailApi(newData);
      }
    },
    async handleSendTestMailApi(data) {
      try {
        await api.CAMPAIGN.postTestMail(data);
        this.$refs.ref_preview.$el.children[1].children[1].style.width =
          "unset";
      } catch (error) {
        console.log("error", error);
      }
    },
    // scroll when have error
    validateScroll() {
      const el = document.querySelectorAll(".alert-error");
      if (el.length > 0) {
        el[0].scrollIntoView({ behavior: "smooth", block: "center" });
      }
    },
  },
  computed: {
    validation() {
      const campaignName = {
        required: {
          valid: this.campaignName ? true : false,
          message: "This field is required !",
        },
        minLength: {
          valid: this.campaignName.length >= 6 ? true : false,
          message: "Min length 6 character !",
        },
      };
      const email_subject = {
        required: {
          valid: this.email_subject.length > 7 ? true : false,
          message: "This field is required !",
        },
      };
      const send_customer = {
        required: {
          valid: this.data_customer.number_customer_select > 0 ? true : false,
          message: "This field is required !",
        },
      };
      const email_content = {
        required: {
          valid: this.email_content.length > 7 ? true : false,
          message: "This field is required !",
        },
      };
      return {
        form: {
          campaignName,
          email_subject,
          send_customer,
          email_content,
        },
        valid:
          campaignName.required.valid &&
          campaignName.minLength.valid &&
          email_subject.required.valid &&
          send_customer.required.valid &&
          email_content.required.valid,
      };
    },
  },
  watch: {
    "emailBackground.opacity": function (newVal) {
      this.emailBackground.opacity = this.checkValue(newVal);
    },
    "emailButton.backgroundOpacity": function (newVal) {
      this.emailButton.backgroundOpacity = this.checkValue(newVal);
    },
    "emailButton.textOpacity": function (newVal) {
      this.emailButton.textOpacity = this.checkValue(newVal);
    },
  },
  mounted() {
    this.$eventBus.$on("emitSendTestMail", this.onSendTestMail);
  },
  beforeDestroy() {
    this.$eventBus.$off("emitSendTestMail", this.onSendTestMail);
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
</style>
