<template>
  <ckeditor :editor="editor" :value="value" :config="editorConfig"></ckeditor>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  props: {
    value: String,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: {
            items: [ 'bold', 'italic', 'underline', 'strikethrough', 'code','subscript', 'superscript'  ]
        }
      },
    };
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped></style>
