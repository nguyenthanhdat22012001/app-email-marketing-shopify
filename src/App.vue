<template>
  <div id="app">
    <v-notify></v-notify>
    <vue-extend-layouts />
  </div>
</template>

<script>
import VueExtendLayouts from "vue-extend-layout";
import VNotify from "@/components/VNotify.vue";
export default {
  name: "App",
  components: { VueExtendLayouts,VNotify },
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
.ck .ck-button .ck-on {
  background: #e2eaf4;
  color: #3d56a6;
}
.ck-editor .ck-toolbar {
  background: #f7f7f9;
  border: 1px solid #ebebf0;
  border-radius: 4px 4px 0px 0px;
  display: none;
}
</style>
