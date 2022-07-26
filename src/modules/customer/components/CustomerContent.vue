<template>
  <v-table align="center">
    <template #table_head_tr>
      <v-checkbox
        scope="col"
        v-model="selectedCustomer"
        prop_input_value="2"
        class="py-5 pl-[30px]"
      />
      <th scope="col" class="py-5 pr-3.5">Customer name</th>
      <th scope="col" class="py-5 pr-3.5">Phone</th>
      <th scope="col" class="py-5 pr-3.5">Email</th>
      <th scope="col" class="py-5 pr-3.5">Orders</th>
      <th scope="col" class="py-5 pr-3.5">Spent</th>
      <th scope="col" class="py-5 pr-3.5">Create date</th>
    </template>

    <template #table_body>
      <tr class="bg-white border-t border-[#EBEBF0]">
        <v-checkbox
          scope="col"
          v-model="selectedCustomer"
          prop_input_value="1"
          class="py-[22px] pl-[30px] translate-y-2/4"
        />

        <td class="py-5 pr-3.5 ">
          <v-avatar name="Phuong Nguyen" class="mr-3"/>Phuong Nguyen
        </td>
        <td class="py-5 pr-3.5">+84 093567890</td>
        <td class="py-5 pr-3.5 text-primary">Example@gmail.com</td>
        <td class="py-5 pr-3.5">68 Orders</td>
        <td class="py-5 pr-3.5">$37.45</td>
        <td class="py-5 pr-3.5 text-muted">Feb 28, 2004</td>
      </tr>
    </template>
  </v-table>
</template>

<script>
import VTable from "@/components/VTable.vue";
import VCheckbox from "@/components/VCheckbox.vue";
import VAvatar from "@/components/VAvatar.vue";
export default {
  components: {
    VTable,
    VCheckbox,
    VAvatar,
  },
  data() {
    return {
      selectedCustomer: [],
    };
  },
};
</script>

<style lang="scss" scoped></style>
