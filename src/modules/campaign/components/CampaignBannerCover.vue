<template lang="">
  <div class="accordion-content bg-[#F2F2F5] pt-4 pb-5 px-5 rounded">
    <h5 class="font-bold text-dark mb-[15px]">Banner cover</h5>
    <div
      class="flex justify-between items-center bg-white py-[10px] pl-[10px] pr-[18px] rounded"
    >
      <div class="flex gap-5 items-center">
        <img
          v-if="url"
          :src="url"
          class="w-[89px] h-[60px] object-cover"
          alt=""
        />

        <span class="w-[187px] text-xs"
          >Accept JPG, PNG, JPEG, GIF file with max size of 5MB</span
        >
      </div>
      <v-button
        variant="primary"
        class="relative py-[9px] px-4 font-medium cursor-pointer"
      >
        Change
        <input
          type="file"
          @change="onFileChange"
          class="opacity-0 absolute top-0 left-0 bottom-0 right-0 cursor-pointer"
        />
      </v-button>
    </div>
  </div>
</template>
<script>
import VButton from "@/components/VButton.vue";
import notify from "@/helper/notify";

export default {
  components: {
    VButton,
  },
  data() {
    return {
      url: null,
      base64: "",
    };
  },
  methods: {
    async onFileChange(e) {
      const file = e.target.files[0];
      let is_image = this.validateFileImage(file);
      if (is_image) {
        this.url = URL.createObjectURL(file);
        this.$emit("input", this.url);
        this.$emit("emitUpdateBannerEmail", file);
      } else {
        notify.showNotify(
          "error",
          "image error",
          "Accept JPG, PNG, JPEG, GIF file with max size of 5MB"
        );
      }
    },
    validateFileImage(file) {
      const maxSize = 5000000;
      let image = file;
      if (!image.type.includes("image")) {
        return false;
      }

      if (image.size > maxSize) {
        return false;
      }

      return true;
    },
    // getBase64FromUrl(file) {
    //   return new Promise((resolve) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);

    //     reader.onloadend = () => {
    //       const base64data = reader.result;
    //       resolve(base64data);
    //     };
    //   });
    // },
  },
};
</script>
<style lang=""></style>
