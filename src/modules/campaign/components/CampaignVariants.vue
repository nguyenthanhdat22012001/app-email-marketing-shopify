<template>
  <button
    class="w-fit bg-white border border-solid border-light py-2 px-4 rounded  font-medium text-sm text-muted relative"
    @click="showVariants"
  >
    + Add variant
    <v-dropdown v-model="isShowDropdownVariant" class="absolute flex flex-col gap-[5px] bottom-0 left-0 z-50  py-3">
      <a v-for="variant in variants" :key="variant" class="py-[5px] px-4 hover:bg-gray-light text-[#212121] text-left">{{ variant }}</a>
    </v-dropdown>
  </button>
</template>

<script>
import VDropdown from "@/components/VDropDown.vue";
export default {
  components: {
    VDropdown,
  },
  data() {
    return {
      variants: [
        "Customer_Last_name",
        "Customer_First_name",
        "Customer_Full_name",
        "Shop_name",
      ],
      isShowDropdownVariant: false,
    };
  },
  methods: {
    showVariants() {
      console.log(this.isShowDropdownVariant)
      this.isShowDropdownVariant = !this.isShowDropdownVariant;
    },
  },
};
</script>

<style lang="scss" scoped></style>
