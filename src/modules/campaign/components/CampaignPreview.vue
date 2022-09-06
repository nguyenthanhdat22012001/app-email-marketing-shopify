<template>
  <div class="campaigm-preview flex flex-col gap-[25px] h-full">
    <div class="preview-head flex justify-between items-center">
      <h1 class="font-bold text-lg lead-5">Preview</h1>
      <v-button class="flex gap-[5px]" @click="visibleSendTestMailModal = true">
        <img src="@/assets/icons/send-test.svg" alt="" />
        <p>Send test</p>
      </v-button>
    </div>
    <div
      class="preview-body"
      style="display: flex; flex-direction: column; gap: 20px; height: 100%"
    >
      <div
        style="
          display: flex;
          flex-direction: column;
          font-weight: 700;
          gap: 18px;
          color: #28293d;
          padding: 20px 16px;
          background: #ffffff;
          border-radius: 4px;
          box-shadow: 0px 0px 1px rgba(40, 41, 61, 0.08),
            0px 0.5px 2px rgba(96, 97, 112, 0.16);
        "
      >
        <div style="display: flex; gap: 5px">
          <span style="color: #555770">Subject: </span>
          <span v-html="prop_email_subject" style="line-break: anywhere"></span>
        </div>
        <div class="flex gap-5">
          <img
            src="@/assets/images/avatar-preview.png"
            alt=""
            style="object-fit: contain"
          />
          <div style="display: flex; flex-direction: column; gap: 4px">
            <div style="display: flex; gap: 8px; line-height: 17px">
              <h1 style="font-weight: bold; line-height: 17px">Jessica Tran</h1>
              <p style="color: #8f90a6; line-height: 17px; font-weight: 400">
                jesst@firegroup.com via mailchimpapp.net
              </p>
            </div>
            <p
              style="
                color: #8f90a6;
                line-height: 17px;
                font-size: 14px;
                font-weight: 400;
              "
            >
              to Customer email
            </p>
          </div>
        </div>
      </div>
      <div style="top: 20px" v-show="hideBoxPreview" class="sticky">
        <div style="width: 100%" ref="sticky">
          <table style="width: 100%; margin: 0px auto">
            <tbody>
              <tr>
                <td
                  :style="{
                    borderRadius: ` ${prop_email_background.radius}px ${prop_email_background.radius}px 0px 0px`,
                    overflow: 'hidden',
                  }"
                >
                  <img
                    :src="prop_email_banner"
                    alt=""
                    style="width: 100%; object-fit: cover"
                  />
                </td>
              </tr>
              <tr
                class="preview-email-content"
                :style="{
                  backgroundColor: backgroundColor,
                  color: prop_email_background.color_text,
                }"
              >
                <td
                  class="email--content"
                  style="line-break: anywhere; padding: 28px 30px 25px"
                  v-html="prop_email_content"
                ></td>
              </tr>
              <tr>
                <td
                  style="padding: 0px 30px 36px"
                  :style="{
                    backgroundColor: backgroundColor,
                    borderRadius: `0px 0px ${prop_email_background.radius}px ${prop_email_background.radius}px`,
                  }"
                >
                  <button
                    v-if="prop_email_button.label.length > 0"
                    style="
                      width: 100%;
                      line-height: 18px;
                      font-size: 14px;
                      font-weight: bold;
                      padding: 9px 0px;
                      cursor: pointer;
                    "
                    :style="styleButton()"
                  >
                    {{ prop_email_button.label }}
                  </button>
                </td>
              </tr>
              <tr style="margin-top: 20px">
                <td
                  class="preview--footer"
                  style="
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 18px;
                    color: #555770;
                    display: block;
                    margin-top: 20px;
                  "
                  v-html="prop_email_footer"
                ></td>
              </tr>
              <tr>
                <td
                  class="preview--footer"
                  style="
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 18px;
                    color: #555770;
                  "
                >
                  <a
                    href="#"
                    style="
                      display: block;
                      text-align: center;
                      text-decoration: underline;
                      color: #555770;
                    "
                    >Unsubscribe here</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <campaign-modal-send-mail v-model="visibleSendTestMailModal" />
  </div>
</template>

<script>
import VButton from "@/components/VButton.vue";
import CampaignModalSendMail from "../components/CampaignModalSendMail.vue";
export default {
  components: {
    VButton,
    CampaignModalSendMail,
  },
  props: {
    prop_email_subject: String,
    prop_email_content: String,
    prop_email_footer: String,
    prop_email_banner: String,
    prop_email_background: Object,
    prop_email_button: Object,
  },
  data() {
    return {
      text_email_color: "#28293D",
      visibleSendTestMailModal: false,
    };
  },
  methods: {
    hexToRgbA: function (hex, alpha) {
      let c;
      const alphaParse = alpha / 100;
      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split("");
        if (c.length == 3) {
          c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = "0x" + c.join("");
        return (
          "rgba(" +
          [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
          "," +
          alphaParse +
          ")"
        );
      }
    },
    styleButton() {
      return `background:${this.hexToRgbA(
        this.prop_email_button.background_color,
        this.prop_email_button.background_opacity
      )};color:${this.hexToRgbA(
        this.prop_email_button.text_color,
        this.prop_email_button.text_opacity
      )};border-radius:${this.prop_email_button.radius}px`;
    },
    checkBackgroundLightDark(rgba = "#ffffff") {
      let string_length = rgba?.length - 1;
      let new_string = rgba.substring(5, string_length);
      let rgba_arr = new_string.split(",");
      if (
        rgba_arr[0] * 0.2126 + rgba_arr[1] * 0.7152 + rgba_arr[2] * 0.0722 <
        255 / 2
      ) {
        // dark color
        if (rgba_arr[3] <= 0.3) {
          return true;
        }
        return false;
      } else {
        // light color
        return true;
      }
    },
    handleChangeColorText(rgba) {
      let is_bg_light = this.checkBackgroundLightDark(rgba);
      if (!is_bg_light) {
        this.text_email_color = "#ffffff";
      } else {
        this.text_email_color = "#28293D";
      }
      this.$emit("emitChangeTextColorContent", this.text_email_color);
    },
  },
  computed: {
    backgroundColor() {
      let rgba = this.hexToRgbA(
        this.prop_email_background.color,
        this.prop_email_background.opacity
      );
      this.handleChangeColorText(rgba);
      return rgba;
    },
    hideBoxPreview() {
      if (this.prop_email_banner != "") {
        return true;
      }

      if (this.prop_email_content != "") {
        if (this.prop_email_content.length <= 7) {
          return false;
        }
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.email--content::v-deep {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: revert;
    font-size: revert;
  }
}

.campaigm-preview::v-deep {
  .tiptap_variant {
    background: #003084;
    padding: 2px;
    margin: 0 3px;
    border-radius: 4px;
    color: #ffffff;
  }
}
</style>
