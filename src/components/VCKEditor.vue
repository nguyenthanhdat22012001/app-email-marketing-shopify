<template>
  <ckeditor
    :value="value"
    :config="configEditor"
    :editor="editor"
    @ready="onReady"
  ></ckeditor>
</template>

<script>
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
export default {
  props: {
    value: String,
  },
  data() {
    return {
      editor: DecoupledEditor,
      configEditor: {
        toolbar: {
          items: [
            "heading",
            "fontSize",
            "|",
            "bold",
            "italic",
            "underline",
            "|",
            "alignment",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
          ],
        },
        resize_enabled:true
      },
    };
  },
  methods: {
    onReady(editor) {
      // Insert the toolbar before the editable area.
      if (!document.querySelector(".ck-toolbar")) {
        editor.ui
          .getEditableElement()
          .parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
          );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ck-editor__editable {
  min-height: 200px;
  border: 1px solid #EBEBF0;
}
</style>
