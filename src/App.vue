<template>
  <div id="app" class="relative">
    <v-notify></v-notify>
    <vue-extend-layouts />
    <v-loading-app></v-loading-app>
  </div>
</template>

<script>
import VueExtendLayouts from "vue-extend-layout";
import VNotify from "@/components/VNotify.vue";
import VLoadingApp from "@/components/VLoadingApp.vue";
export default {
  name: "App",
  components: { VueExtendLayouts, VNotify, VLoadingApp },
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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

/* # custom scroll # */

/* width */
::-webkit-scrollbar {
    width: 7px;
    height: 7px;
}
  
/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px; 
}
   
/* Handle */
::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 10px;
}
  
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555; 
}

</style>
