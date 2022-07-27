<template>
  <ckeditor  :value="value" :config="editorConfig"></ckeditor>
</template>

<script>
// import ClassicEditor from "@ckeditor/ckeditor5-custom";
// import EditorCustom from "ckeditor-custom";
export default {
  props: {
    value: String,
  },
  data() {
    return {
      editorConfig: {
        
      },
    };
  },
  mounted() {
    // console.log(EditorCustom)
  },
};
</script>

<style lang="scss" scoped></style>
