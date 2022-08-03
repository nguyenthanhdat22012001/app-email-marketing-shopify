<template>
  <div class="flex flex-col gap-[25px] h-full">
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
          <span v-html="emailSubject" style="line-break: anywhere"></span>
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
      <div
        class="sticky top-5"
        style="display: flex; flex-direction: column; gap: 20px"
        ref="sticky"
        v-show="hideBoxPreview"
      >
        <div
          class="preview-content"
          :style="'border-radius:' + emailBackground.radius + 'px'"
        >
          <img
            :src="emailBanner"
            alt=""
            style="width: 100%; object-fit: cover"
          />
          <div
            class="preview-email-content"
            style="
              background: #ffffff;
              padding: 28px 30px 36px;
              display: flex;
              flex-direction: column;
              gap: 30px;
            "
            :style="'background-color:' + backgroundColor"
          >
            <div
              class="email--content"
              style="line-break: anywhere"
              :style="'color:' + text_email_color"
              v-html="emailContent"
            ></div>
            <button
              style="
                width: 100%;
                line-height: 18px;
                font-size: 14px;
                font-weight: bold;
                padding: 9px 0px;
              "
              :style="styleButton()"
            >
              {{ emailButton.label }}
            </button>
          </div>
        </div>

        <div
          class="preview--footer"
          style="
            font-size: 14px;
            font-weight: 400;
            line-height: 18px;
            color: #555770;
          "
        >
          <div v-html="emailFooter"></div>
          <a
            href="#"
            style="
              display: block;
              text-align: center;
              text-decoration: underline;
            "
            >Unsubscribe here</a
          >
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
    emailSubject: String,
    emailContent: String,
    emailFooter: String,
    emailBanner: String,
    emailBackground: Object,
    emailButton: Object,
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
      return `background:${this.emailButton.backgroundColor};color:${this.emailButton.textColor};border-radius:${this.emailButton.radius}px`;
    },
    checkBackgroundLightDark(rgba = "#ffffff") {
      let string_lenght = rgba?.length - 1;
      let new_string = rgba.substring(5, string_lenght);
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
      this.$emit('emitChangeTextColorContent', this.text_email_color)
    },
  },
  computed: {
    backgroundColor() {
      let rgba = this.hexToRgbA(
        this.emailBackground.color,
        this.emailBackground.opacity
      );
      this.handleChangeColorText(rgba);
      return rgba;
    },
    hideBoxPreview() {
      if (this.emailBanner != "") {
        return true;
      }

      if (this.emailContent != "") {
        if (this.emailContent.length <= 7) {
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
.email--content {
  p {
    color: red;
    padding: 2px;
    border-radius: 4px;
  }
}
</style>
