<!--  EX
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
-->

<template>
  <table class="w-full text-left">
    <thead class="text-xs text-gray-light font-semibold">
      <tr class="bg-white">
        <slot name="table_head_tr"></slot>
      </tr>
    </thead>

    <tbody>
      <slot name="table_body"></slot>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["value"],
};
</script>

<style lang="scss" scoped></style>
