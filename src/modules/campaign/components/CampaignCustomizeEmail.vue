<template>
  <div class="accordion w-[100%] bg-white py-[19px] px-[25px]">
    <div class="accordion-header flex justify-between items-center font-medium">
      <div class="flex gap-2 items-center text-sapphire">
        <img src="@/assets/icons/color.svg" alt="" />
        <h4>Customize email</h4>
      </div>
      <a>
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0937 1.6875 13.0937 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"
            fill="#003084"
          />
        </svg>
      </a>
    </div>

    <div class="accordion-body mt-[25px] flex gap-5 flex-col">
      <div class="accordion-content bg-[#F2F2F5] pt-4 pb-5 px-5 rounded">
        <h5 class="font-bold text-dark mb-[15px]">Banner cover</h5>
        <div
          class="flex justify-between items-center bg-white py-[10px] pl-[10px] pr-[18px] rounded"
        >
          <div class="flex gap-5 items-center">
            <img
              class="w-[89px] h-[60px] object-cover"
              src="https://www.w3schools.com/w3css/img_lights.jpg"
              alt=""
            />
            <span class="text-xs"
              >Accept JPG, PNG, JPEG, GIF file with max size of 5MB</span
            >
          </div>
          <v-button variant="primary" class="py-[9px] px-4 font-medium">
            Change
          </v-button>
        </div>
      </div>

      <div class="accordion-content bg-[#F2F2F5] pt-4 pb-5 px-5 rounded">
        <h5 class="font-bold text-dark mb-[15px]">Background</h5>
        <div class="flex items-center gap-5 py-[10px] pl-[10px] pr-[18px]">
          <div class="flex-1">
            <span>Background color</span>
            <div class="flex items-center bg-white my-5">
              <v-input
                class="flex-1 border-0 py-4 px-[19px]"
                type="text"
                placeholder="FFFFFF"
              ></v-input>
              <span class="pr-[19px]">100%</span>
            </div>
          </div>
          <div class="flex-1">
            <span>Background color</span>
            <div class="flex items-center bg-white my-5">
              <v-input
                class="flex-1 border-0 py-4 px-4"
                type="text"
                placeholder="FFFFFF"
              ></v-input>
              <span class="pr-4 pl-[18px]">100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VButton from "@/components/VButton.vue";
import VInput from "@/components/VInput.vue";

export default {
  components: {
    VButton,
    VInput,
  },
};
</script>
<style></style>
