<template>
  <button
    class="w-fit bg-white border border-solid border-light py-2 px-4 rounded hover:bg-[#ebebeb] font-medium text-sm text-muted relative"
    @click="showVariants"
  >
    + Add variant
    <v-dropdown v-model="isShowDropdownVariant" class="absolute flex flex-col gap-[10px] ">
      <a v-for="variant in variants" :key="variant">{{ variant }}</a>
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
      isShowDropdownVariant: true,
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
