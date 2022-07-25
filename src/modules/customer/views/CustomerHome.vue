<template>
  <div>
    <v-button @click="showMessage" variant="secondary">Button</v-button>
    <v-select-input v-model="selectValue">
      <option value="1">Create date</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </v-select-input>
    <v-select-sort v-model="select_sort">
      <option value="1">Sort</option>
      <option value="2">up</option>
    </v-select-sort>
    <v-input v-model="inputValue" type="number" />
    <p>{{ inputValue }}</p>
    <div>
      <VTable>
        <template #table_head_tr>
          <th scope="col" class="py-5 pr-3.5">Product name</th>
          <th scope="col" class="py-5 pr-3.5">Phone</th>
          <th scope="col" class="py-5 pr-3.5">Phone</th>
          <th scope="col" class="py-5 pr-3.5">Phone</th>
          <th scope="col" class="py-5 pr-3.5">Phone</th>
          <th scope="col" class="py-5 pr-3.5">Phone</th>
          <th scope="col" class="py-5 pr-3.5">Phone</th>
        </template>

        <template #table_body>
          <tr class="bg-white border-t border-[#EBEBF0]">
            <td class="py-5 pr-3.5">Phuong Nguyen</td>
            <td class="py-5 pr-3.5">Phuong Nguyen</td>
            <td class="py-5 pr-3.5">Phuong Nguyen</td>
            <td class="py-5 pr-3.5">Phuong Nguyen</td>
            <td class="py-5 pr-3.5">Phuong Nguyen</td>
            <td class="py-5 pr-3.5">Phuong Nguyen</td>
            <td class="py-5 pr-3.5">+84 093567890</td>
          </tr>
        </template>
      </VTable>
    </div>


<v-select-number-range id="btn-1"></v-select-number-range>

  </div>
</template>

<script>
import VButton from "@/components/VButton.vue";
import VSelectInput from "@/components/VSelectInput.vue";
import VSelectSort from "@/components/VSelectSort.vue";
import VInput from "@/components/VInput.vue";
import VTable from "@/components/VTable.vue";
import VSelectNumberRange from "@/components/VSelectNumberRange.vue";

export default {
  data() {
    return {
      selectValue: 1,
      select_sort: 1,
      inputValue: "hello",
    };
  },
  components: {
    VButton,
    VSelectInput,
    VInput,
    VSelectSort,
    VTable,
    VSelectNumberRange,
  },
  methods: {
    showMessage() {
      console.log("click");
    },
  },
  watch: {
    select_sort() {
      console.log(this.select_sort);
    },
  },
};
</script>

<style lang="scss" scoped></style>
