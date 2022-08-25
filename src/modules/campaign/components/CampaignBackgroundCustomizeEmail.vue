<template>
  <div class="accordion-content bg-[#F2F2F5] pt-4 pb-5 px-5 rounded">
    <h5 class="font-bold text-dark mb-[15px]">Background</h5>

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
              v-model="background.color"
              class="w-[18px] h-[18px]"
            />
            <input
              class="text-xs text-black-light outline-none w-full uppercase"
              v-model="background.color"
               pattern="[A-Za-z]"
              maxlength="7"
            />
          </div>
          <div class="w-[50px] flex justify-center">
            <input
              v-model="background.opacity"
              type="number"
              maxlength="3"
              class="w-[24px] text-center text-xs outline-none"
            />%
          </div>
        </div>
      </div>
      <div class="inline-flex flex-1 flex-col gap-[10px]">
        <span class="text-dark">Radius</span>
        <div class="bg-white flex items-center flex-1">
          <div
            class="flex flex-1 items-center py-[11px] px-[11px] border-r border-[#EBEBF0]"
          >
            <input
              class="text-xs text-black-light outline-none w-full uppercase"
              v-model="background.radius"
              type="number"
              max="100"
              min="0"
            />
          </div>
          <div class="w-[50px] flex justify-center">Px</div>
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
    background: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    checkValidateNumber(e) {
      // console.log(this.background.opacity)
      if (e.keyCode != 8 && this.background.opacity > 100) {
        this.background.opacity = 100;
        e.preventDefault();
      }
    },
  },
};
</script>
<style lang="scss" scope></style>
