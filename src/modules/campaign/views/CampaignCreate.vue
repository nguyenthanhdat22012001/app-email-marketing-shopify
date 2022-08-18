<template>
  <div
    class="campaign--create-page flex flex-col bg-gray-light gap-[30px] pb-[60px]"
  >
    <div
      class="campaign-create-page--head flex justify-between py-4 pl-[30px] pr-5 bg-white"
    >
      <div class="head--left flex items-center gap-[10px]">
        <v-button
          variant="secondary"
          @click="handleShouldRedirectOrShowModalComfirm()"
          class="px-4 py-3"
          ><img src="@/assets/icons/icon-back.svg" alt=""
        /></v-button>
        <h1 class="font-medium text-lg lead-[22px]">Create new campaign</h1>
      </div>
      <div class="head--right flex items-center gap-[10px]">
        <v-button
          variant="secondary"
          class="py-1 px-5"
          @click="handleShouldRedirectOrShowModalComfirm()"
          >Cancel</v-button
        >
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
              v-model="campaign_name"
              maxlength="255"
            ></v-input>
            <p class="text-light">|</p>
            <p class="text-gray-light w-[60px]">
              {{ campaign_name.length }}/255
            </p>
          </div>
          <div class="text-[12px] leading-5 mt-1 text-red" v-if="formstate">
            <template v-if="!validation.form.campaign_name.required.valid">
              <p class="alert-error">
                {{ validation.form.campaign_name.required.message }}
              </p>
            </template>
            <template
              v-else-if="!validation.form.campaign_name.minLength.valid"
            >
              <p class="alert-error">
                {{ validation.form.campaign_name.minLength.message }}
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
          <div class="text-[12px] leading-5 mt-1 text-red" v-if="formstate">
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
          <div class="text-[12px] leading-5 mt-1 text-red" v-if="formstate">
            <template v-if="!validation.form.email_subject.required.valid">
              <p class="alert-error">
                {{ validation.form.email_subject.required.message }}
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
          <div class="text-[12px] leading-5 mt-1 text-red" v-if="formstate">
            <template v-if="!validation.form.email_content.required.valid">
              <p class="alert-error">
                {{ validation.form.email_content.required.message }}
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
          <campaign-background-customize-email v-model="email_background" />
          <campaign-button-customize-email v-model="email_button" />
        </campaign-customize-email>
      </div>
      <div class="content--right w-[calc(100%*calc(10/19))] break-normal">
        <campaign-preview
          ref="ref_preview"
          :prop_email_content="email_content"
          :prop_email_footer="email_footer"
          :prop_email_subject="email_subject"
          :prop_email_banner="banner_url"
          :prop_email_background="email_background"
          :prop_email_button="email_button"
          @emitChangeTextColorContent="
            (color_text) => (this.email_background.color_text = color_text)
          "
        ></campaign-preview>
      </div>
    </div>
    <div
      class="campaign-create-page--footer flex justify-end gap-4 border-t border-t-light border-t-solid pt-5 mx-5 items-end"
    >
      <v-button
        variant="secondary"
        class="py-1 px-5"
        @click="handleShouldRedirectOrShowModalComfirm()"
        >Cancel</v-button
      >
      <v-button variant="primary" class="py-1 px-7">Save</v-button>
    </div>
    <campaign-modal-select-customer
      v-model="visible_customer_email_modal"
      @emitCloseModal="handleCloseModal"
      @emitHandleAddAvatarSendToCustomer="(data) => (data_customer = data)"
    >
    </campaign-modal-select-customer>
    <v-modal-comfirm
      prop_title="Are you sure cancel. The data can be lost?"
      v-model="visible_confirm_modal"
      @emitCloseModal="visible_confirm_modal = false"
      @emitAgree="redirect('/campaign')"
    >
    </v-modal-comfirm>
    <!-- <div>{{ opacity }}</div> -->
    <div class="hidden">{{ validateScroll }}</div>
  </div>
</template>

<script>
import VButton from "@/components/VButton.vue";
import VInput from "@/components/VInput.vue";
import VTiptapEditor from "@/components/VTiptapEditor.vue";
import VTiptapEditorNotMenu from "@/components/VTiptapEditorNotMenu.vue";
import VAvatar from "@/components/VAvatar.vue";
import VModalComfirm from "@/components/VModalComfirm.vue";

import CampaignInput from "../components/CampaignInput.vue";
import CampaignCustomizeEmail from "../components/CampaignCustomizeEmail.vue";
import CampaignPreview from "../components/CampaignPreview.vue";
import CampaignBackgroundCustomizeEmail from "../components/CampaignBackgroundCustomizeEmail.vue";
import CampaignBannerCover from "../components/CampaignBannerCover.vue";
import CampaignButtonCustomizeEmail from "../components/CampaignButtonCustomizeEmail.vue";
import CampaignModalSelectCustomer from "../components/CampaignModalSelectCustomer.vue";

import { api } from "@/plugins";
import { mapMutations } from "vuex";
import notify from "@/helper/notify";
export default {
  components: {
    VButton,
    VInput,
    VAvatar,
    VModalComfirm,
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
      campaign_name: "",
      email_content: "",
      email_footer: `<p style="text-align: center">Copyright 2010-2022 Firegroup, all rights reserved.</p>`,
      email_subject: "",
      visible_customer_email_modal: false,
      visible_confirm_modal: false,
      email_banner: "",
      banner_url: "",
      email_background: {
        color: "#ffffff",
        opacity: 100,
        radius: 3,
        color_text: "#28293D",
      },
      email_button: {
        background_color: "#003084",
        background_opacity: 100,
        text_color: "#ffffff",
        text_opacity: 100,
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
    ...mapMutations({
      setLoading: "setLoading",
    }),
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
    hanldeCheckIsHaveData() {
      if (
        this.validation.form.campaign_name.required.valid ||
        this.validation.form.email_subject.required.valid ||
        this.validation.form.send_customer.required.valid ||
        this.validation.form.email_content.required.valid
      ) {
        return true;
      }
      return false;
    },
    handleShouldRedirectOrShowModalComfirm() {
      let is_check = this.hanldeCheckIsHaveData();
      if (is_check) {
        this.visible_confirm_modal = true;
      } else {
        this.redirect("/campaign");
      }
    },
    handleGetDataCreateCampaign() {
      let el_preview_body = this.$refs.ref_preview.$el.children[1];
      let el_preview_content = el_preview_body.children[1];
      const cloneNode = el_preview_content.cloneNode(true);
      const table = cloneNode.querySelector("table");
      table.style.width = "600px";
      let data = {
        name: this.campaign_name,
        subject: this.email_subject,
        content: this.email_content,
        footer: this.email_footer,
        color_content: this.email_background.color_text,
        background_banner: this.email_banner,
        background_color: this.email_background.color,
        background_radius: `${this.email_background.radius}px`,
        button_label: this.email_button.label,
        button_radius: `${this.email_button.radius}px`,
        button_background_color: this.email_button.background_color,
        button_text_color: this.email_button.text_color,
        preview_email: cloneNode.outerHTML,
        myshopify_domain: this.$store.state.auth.user
          ? this.$store.state.auth.user.domain
          : "",
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
          all_customer: this.data_customer.select_all,
          list_customer_except: JSON.stringify(
            this.data_customer.list_customer_except
          ),
          list_mail_customers: JSON.stringify(
            this.data_customer.list_customer_selected
          ),
        };
        await this.handleSendMailApi(newData);
        // this.$router.push({ name: "campaign" });
      }
    },
    async handleSendMailApi(data) {
      this.setLoading(true);
      try {
        let res = await api.CAMPAIGN.postSendMail(data);
        if (res.status) {
          notify.showNotify("success", "Create campaign success !");
        }
      } catch (error) {
        console.log("error", error);
      }
      this.setLoading(false);
    },
    // handle send test mail
    async onSendTestMail(email) {
      this.formstate = true;
      this.validateScroll();
      if (this.validation.valid) {
        let data = this.handleGetDataCreateCampaign();
        let newData = { ...data, send_email: email };
        await this.handleSendTestMailApi(newData);
      }
    },
    async handleSendTestMailApi(data) {
      this.setLoading(true);
      try {
        let res = await api.CAMPAIGN.postTestMail(data);
        this.$refs.ref_preview.$el.children[1].children[1].style.width =
          "unset";
        if (res.status) {
          notify.showNotify("success", "Send mail test success !");
        }
      } catch (error) {
        console.log("error", error);
      }
      this.setLoading(false);
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
      const campaign_name = {
        required: {
          valid: this.campaign_name ? true : false,
          message: "This field is required !",
        },
        minLength: {
          valid: this.campaign_name.length >= 6 ? true : false,
          message: "Min length 6 character !",
        },
      };
      const email_subject = {
        required: {
          valid: this.email_subject.length > 49 ? true : false,
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
          valid: this.email_content.length > 49 ? true : false,
          message: "This field is required !",
        },
      };
      return {
        form: {
          campaign_name,
          email_subject,
          send_customer,
          email_content,
        },
        valid:
          campaign_name.required.valid &&
          campaign_name.minLength.valid &&
          email_subject.required.valid &&
          send_customer.required.valid &&
          email_content.required.valid,
      };
    },
  },
  watch: {
    "email_background.opacity": function (newVal) {
      this.email_background.opacity = this.checkValue(newVal);
    },
    "email_button.backgroundOpacity": function (newVal) {
      this.email_button.backgroundOpacity = this.checkValue(newVal);
    },
    "email_button.text_opacity": function (newVal) {
      this.email_button.text_opacity = this.checkValue(newVal);
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

/* .v-enter {
  transform: translate(100%, 0);
}
.v-leave-to {
  transform: translate(100%, 0);
} */
</style>
