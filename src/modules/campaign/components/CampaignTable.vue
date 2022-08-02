<template>
  <v-table align="center">
    <template #table_head_tr>
      <th scope="col" class="py-5 pr-3.5">Campaign name</th>
      <th scope="col" class="py-5 pr-3.5">Create date</th>
      <th scope="col" class="py-5 pr-3.5">Status</th>
      <th scope="col" class="py-5 pr-3.5">Progress</th>
      <th scope="col" class="py-5 pr-3.5">Total customers</th>
      <th scope="col" class="py-5 pr-3.5">Sent</th>
      <th scope="col" class="py-5 pr-3.5">Fail</th>
    </template>

    <template #table_body>
      <tr class="bg-white border-t border-[#EBEBF0]">
        <td class="py-5 pr-3.5">
          <div class="flex items-center gap-3 font-semibold">
            <img src="@/assets/icons/envelope-open.svg" alt="" />
            Black Friday Campaign
          </div>
        </td>
        <td class="py-5 pr-3.5 text-gray-light">Feb 28, 2004</td>
        <td class="py-5 pr-3.5">
          <v-status class="text-primary">running</v-status>
        </td>
        <td width="100px" class="py-5 pr-3.5">
          <v-progress-bar
            :prop_number="500"
            :prop_total="1000"
          ></v-progress-bar>
        </td>
        <td class="py-5 pr-3.5">1,000</td>
        <td class="py-5 pr-3.5 text-success font-bold">
          250 <span class="ml-1 font-normal text-gray-light">(25%)</span>
        </td>
        <td class="py-5 pr-3.5 text-red font-bold">
          35 <span class="ml-1 font-normal text-gray-light">(3%)</span>
        </td>
      </tr>
    </template>
  </v-table>
</template>

<script>
import VTable from "@/components/VTable.vue";
import VStatus from "@/components/VStatus.vue";
import VProgressBar from "@/components/VProgressBar.vue";
export default {
  components: {
    VTable,
    VStatus,
    VProgressBar,
  },
  data() {
    return {
      selectedCustomer: [],
    };
  },
};
</script>

<style lang="scss" scoped></style>
