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
              v-model="emailButton.label"
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
              v-model="emailButton.radius"
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
            class="flex flex-1 items-center py-[11px] px-[11px] border-r border-[#EBEBF0]"
          >
            <input
              type="color"
              id="color"
              v-model="emailButton.backgroundColor"
            />
            <input
              class="text-xs text-black-light outline-none w-full uppercase"
              v-model="emailButton.backgroundColor"
            />
          </div>
          <div class="w-[50px] flex justify-center">
            <input
              min="1"
              max="100"
              v-model="emailButton.backgroundOpacity"
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
            class="flex flex-1 items-center py-[11px] px-[11px] border-r border-[#EBEBF0]"
          >
            <input type="color" id="color" v-model="emailButton.textColor" />
            <input
              class="text-xs text-black-light outline-none w-full uppercase"
              v-model="emailButton.textColor"
            />
          </div>
          <div class="w-[50px] flex justify-center">
            <input
              min="1"
              max="100"
              v-model="emailButton.textOpacity"
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
    emailButton: {
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
