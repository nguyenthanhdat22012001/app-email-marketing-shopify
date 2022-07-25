<template>
  <div
    class="vue-sidebar w-[230px] h-screen text-white bg-gradient-to-br from-bg-primary to-bg-primary-light fixed top-0 left-0"
  >
    <h1>Logo</h1>
    <nav>
      <router-link :to="{ name: 'customer' }">Customer</router-link>
      <router-link :to="{ name: 'campaign' }">Campaign</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style lang="scss" scoped></style>
