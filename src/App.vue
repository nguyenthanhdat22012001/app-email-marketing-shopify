<template>
  <div id="app">
    <vue-extend-layouts />
  </div>
</template>

<script>
import VueExtendLayouts from "vue-extend-layout";
export default {
  name: "App",
  components: { VueExtendLayouts },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
}
</style>
