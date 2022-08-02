<template>
  <div class="flex flex-col gap-[25px] h-full">
    <div class="preview-head flex justify-between items-center">
      <h1 class="font-bold text-lg lead-5">Preview</h1>
      <v-button class="flex gap-[5px]">
        <img src="@/assets/icons/send-test.svg" alt="" />
        <p>Send text</p>
      </v-button>
    </div>
    <div class="preview-body flex flex-col gap-5 h-full">
      <div
        class="preview-subject font-bold flex flex-col gap-[18px] text-sm text-dark px-5 py-5 pb-4 bg-white rounded shadow-content"
      >
        <div class="subject--title flex gap-[5px]">
          <span class="text-muted text-sm">Subject: </span>
          <span v-html="emailSubject"></span>
        </div>
        <div class="flex gap-5">
          <img
            src="@/assets/images/avatar-preview.png"
            alt=""
            class="object-contain"
          />
          <div class="flex flex-col gap-1">
            <div class="flex gap-2">
              <h1 class="font-bold text-sm text-dark lead-5">Jessica Tran</h1>
              <p class="text-muted text-sm text-gray-light font-normal">
                jesst@firegroup.com via mailchimpapp.net
              </p>
            </div>
            <p class="text-muted text-sm text-gray-light font-normal">
              to Customer email
            </p>
          </div>
        </div>
      </div>
      <div class="sticky top-5 flex flex-col gap-5" ref="sticky">
        <div
          class="preview-content overflow-hidden"
          :style="'border-radius:' + emailBackground.radius + 'px'"
        >
          <img :src="emailBanner" alt="" class="w-full object-cover" />
          <div
            class="preview-email-content bg-white pt-7 pb-9 px-[30px] flex flex-col gap-[30px]"
            :style="'background-color:' + backgroundColor"
          >
            <div
              class="email--content"
              style="line-break: anywhere"
              :style="'color:' + email_color"
              v-html="emailContent"
            ></div>
            <v-button
              class="w-full justify-center font-bold text-sm lead-[18px]"
              :style="styleButton()"
              >{{ emailButton.label }}</v-button
            >
          </div>
        </div>

        <div
          class="preview--footer text-center font-small text-muted text-sm lead-[18px]"
        >
          <div v-html="emailFooter"></div>
          <a href="#" class="underline">Unsubscribe here</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VButton from "@/components/VButton.vue";
export default {
  components: {
    VButton,
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
      email_color: "#28293D",
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
    checkBackgroundLightDark(rgba) {
      let string_lenght = rgba.length - 1;
      let new_string = rgba.substring(5, string_lenght);
      let rgba_arr = new_string.split(",");
      if (
        rgba_arr[0] * 0.2126 + rgba_arr[1] * 0.7152 + rgba_arr[2] * 0.0722 <
        255 / 2
      ) {
        // dark color
        if(rgba_arr[3] <= 0.3){
          return true
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
        this.email_color = "#ffffff";
      } else {
        this.email_color = "#28293D";
      }
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
