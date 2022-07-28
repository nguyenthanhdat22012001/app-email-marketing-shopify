<template>
  <ckeditor
    :value="value"
    :config="configEditor"
    :editor="editor"
    @ready="onReady"
    class="-mt-[10px] "
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
        resize_enabled: true,
        allowedContent: {
          "p h1": {
            styles: "text-align",
          },
          a: {
            attributes: "!href",
          },
          "strong em": true,
          p: {
            classes: "tip",
          },
          span: {
            classes: "variant",
          },
        },
      },
    };
  },

  methods: {
    onReady(editor) {
      // Insert the toolbar before the editable area.
      const parent = editor.ui.getEditableElement().parentElement;
      if (!parent.querySelector(".ck-toolbar")) {
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
  min-height: 100px;
  border: 1px solid #ebebf0;
}
</style>
