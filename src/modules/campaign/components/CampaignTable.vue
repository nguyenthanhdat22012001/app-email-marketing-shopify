<template>
  <v-table align="center">
    <template #table_head_tr>
      <th scope="col" class="pl-5 py-5 pr-3.5">Campaign name</th>
      <th scope="col" class="py-5 px-3.5">Create date</th>
      <th scope="col" class="py-5 px-3.5">Status</th>
      <th scope="col" class="py-5 px-3.5">Progress</th>
      <th scope="col" class="py-5 px-3.5">Total customers</th>
      <th scope="col" class="py-5 px-3.5">Sent</th>
      <th scope="col" class="py-5 px-3.5">Fail</th>
    </template>

    <template #table_body v-if="prop_list_campaign.length > 0">
      <tr
        class="bg-white border-b border-[#EBEBF0]"
        v-for="item in prop_list_campaign"
        :key="item.id"
      >
        <td class="pl-5 py-5 pr-3.5">
          <div class="flex items-center gap-3 font-semibold">
            <img src="@/assets/icons/envelope-open.svg" class="p-[10px] rounded bg-gray-light" alt="" />
            <span class="name-campaign w-[221px]">{{ item.name }}</span>
          </div>
        </td>
        <td class="py-5 px-3.5 text-gray-light border-r border-[#EBEBF0]">{{formatdateNameMonthDY(item.created_at) }}</td>
        <td class="py-5 px-3.5">
          <v-status :class="item.process == 100 ? 'text-success bg-[#E3FFF1]' : 'text-primary bg-[#FAFAFC]'">{{item.status }}</v-status>
        </td>
        <td class="py-5 px-3.5">
          <v-progress-bar class="w-[100px]" :prop_status="item.status" :prop_percent="item.process"></v-progress-bar>
        </td>
        <td class="py-5 px-3.5">{{handleFormatNumberCommas(item.total_customers) }}</td>
        <td class="py-5 px-3.5 text-success font-bold">
          {{ item.send_email_done }}
          <span class="ml-1 font-normal text-gray-light"
            >{{handlePercentByMath(item.total_customers,item.send_email_done)}}</span
          >
        </td>
        <td class="py-5 px-3.5 text-red font-bold">
          {{ item.send_email_fail }}
          <span class="ml-1 font-normal text-gray-light"
            >{{handlePercentByMath(item.total_customers,item.send_email_fail)}}</span
          >
        </td>
      </tr>
    </template>
  </v-table>
</template>

<script>
import VTable from "@/components/VTable.vue";
import VStatus from "@/components/VStatus.vue";
import VProgressBar from "@/components/VProgressBar.vue";

import { handlePercentByMath,handleFormatNumberCommas } from "@/helper/number";
import { formatdateNameMonthDY } from "@/helper/formatDate";
export default {
  components: {
    VTable,
    VStatus,
    VProgressBar,
  },
  props: {
    prop_list_campaign: {
      type: Array,
      default(rawProps) {
        return [];
      },
    },
  },
  methods: {
    handlePercentByMath: handlePercentByMath,
    formatdateNameMonthDY: formatdateNameMonthDY,
    handleFormatNumberCommas: handleFormatNumberCommas,
  },
  data() {
    return {
      selectedCustomer: [],
    };
  },
  computed: {
    percentProgress(id) {
      return this.prop_number / this.prop_total;
    },
  },
};
</script>

<style lang="scss" scoped>

@mixin dotText($line-clamp:2 ) {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: $line-clamp;
    -webkit-box-orient: vertical;
}

.name-campaign{
  @include dotText();
}


</style>
