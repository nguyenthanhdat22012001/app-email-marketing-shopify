<template>
  <div class="customer-content--head px-5 pt-5 flex gap-5">
    <div
      class="search-bar flex gap-[10px] rounded border border-solid border-light p-[10px] flex-1"
    >
      <img src="@/assets/icons/search.svg" alt="" />
      <v-input
        placeholder="Search customers by name, phone, email..."
        v-model="searchText"
        class="flex-1"
      />
    </div>
    <div class="filter flex gap-[10px] items-center">
      <div>
        <v-select-input v-model="filterCreate">
          <option value="">Create date</option>
        </v-select-input>
        <v-select-input v-model="filterSpent">
          <option value="">Total spent</option>
        </v-select-input>
        <v-select-input v-model="filterOrder">
          <option value="">Total order</option>
        </v-select-input>
      </div>
      <v-select-sort v-model="filterSort">
        <option value="">Sort</option>
      </v-select-sort>
    </div>
  </div>
</template>

<script>
import VInput from "@/components/VInput.vue";
import VSelectInput from "@/components/VSelectInput.vue";
import VSelectSort from "@/components/VSelectSort.vue";
export default {
  components: {
    VInput,
    VSelectInput,
    VSelectSort,
  },
  data() {
    return {
      searchText: "",
      filterCreate: "",
      filterSort: "",
      filterOrder: "",
      filterSpent: "",
    };
  },
};
</script>

<style lang="scss" scoped></style>
