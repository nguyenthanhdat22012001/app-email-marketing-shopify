<template lang="">
  <div class="accordion-content bg-[#F2F2F5] pt-4 pb-5 px-5 rounded">
    <h5 class="font-bold text-dark mb-[15px]">Button</h5>
    <div class="flex gap-5">
      <div class="inline-flex flex-1 flex-col gap-[10px]">
        <span class="text-dark">Label</span>
        <div class="bg-white flex items-center">
          <div
            class="flex flex-1 items-center py-[11px] px-[11px] border-r border-[#EBEBF0]"
          >
            <input
              type="text"
              placeholder="TRY FREE NOW"
              class="w-[100%] focus:outline-0 py-[1px]"
              v-model="email_button.label"
            />
          </div>
        </div>
      </div>

      <div class="inline-flex flex-1 flex-col gap-[10px]">
        <span class="text-dark">Radius</span>
        <div class="bg-white flex items-center">
          <div
            class="flex flex-1 items-center py-[11px] px-[11px] border-r border-[#EBEBF0]"
          >
            <input
              type="number"
              class="w-[100%] focus:outline-0 py-[1px]"
              v-model="email_button.radius"
              max="100"
              min="0"
            />
          </div>
          <span class="w-[40px] text-center text-xs">Px</span>
        </div>
      </div>
    </div>

    <div class="flex gap-5 mt-5">
      <div class="inline-flex flex-1 flex-col gap-[10px]">
        <span class="text-dark">Background color</span>
        <div class="bg-white flex items-center">
          <div
            class="flex flex-1 gap-[5px] items-center py-[11px] px-[11px] border-r border-[#EBEBF0]"
          >
            <input
              type="color"
              id="color"
              class="w-[18px] h-[18px]"
              v-model="email_button.background_color"
            />
            <input
              class="text-xs text-black-light outline-none w-full uppercase"
              v-model="email_button.background_color"
              maxlength="7"
            />
          </div>
          <div class="w-[50px] flex justify-center">
            <input
              min="1"
              max="100"
              v-model="email_button.background_opacity"
              type="number"
              class="w-[24px] text-center text-xs outline-none"
            />%
          </div>
        </div>
      </div>
      <div class="inline-flex flex-1 flex-col gap-[10px]">
        <span class="text-dark">Text color</span>
        <div class="bg-white flex items-center">
          <div
            class="flex flex-1 gap-[5px] items-center py-[11px] px-[11px] border-r border-[#EBEBF0]"
          >
            <input
              type="color"
              id="color"
              class="w-[18px] h-[18px]"
              v-model="email_button.text_color"
            />
            <input
              class="text-xs text-black-light outline-none w-full uppercase"
              v-model="email_button.text_color"
              maxlength="7"
            />
          </div>
          <div class="w-[50px] flex justify-center">
            <input
              min="1"
              max="100"
              v-model="email_button.text_opacity"
              type="number"
              class="w-[24px] text-center text-xs outline-none"
            />%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: Object,
  },
  computed: {
    email_button: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>
<style lang=""></style>
