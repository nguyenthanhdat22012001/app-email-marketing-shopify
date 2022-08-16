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
  <table class="w-full border-collapse text-left relative">
    <thead
      class="text-xs sticky top-0 text-gray-light bg-white font-semibold z-[1]"
    >
      <tr class="bg-white z-10 ">
        <slot name="table_head_tr"></slot>
      </tr>
    </thead>

    <tbody class="">
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
