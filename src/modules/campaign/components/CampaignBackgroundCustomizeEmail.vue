<template lang="">
  <div class="accordion-content bg-[#F2F2F5] pt-4 pb-5 px-5 rounded">
    <h5 class="font-bold text-dark mb-[15px]">Background</h5>
    <div class="flex gap-5">
      <div class="inline-flex flex-1 flex-col gap-[10px]">
        <span class="text-dark">Background color</span>
        <div class="bg-white flex items-center">
          <div
            class="flex flex-1 items-center py-[11px] px-[11px] border-r border-[#EBEBF0]"
          >
            <input type="color" id="color" />
            <label for="color" class="text-xs text-black-light">FFFFFF</label>
          </div>
          <span class="w-[40px] text-center text-xs">100%</span>
        </div>
      </div>
      <div class="inline-flex flex-1 flex-col gap-[10px]">
        <span class="text-dark">Radius</span>
        <div class="bg-white flex items-center">
          <div
            class="flex flex-1 items-center py-[11px] px-[11px] border-r border-[#EBEBF0]"
          >
            <input type="number" class="w-[100%] focus:outline-0 py-[1px]" />
          </div>
          <span class="w-[40px] text-center text-xs">Px</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {

};
</script>
<style lang=""></style>
