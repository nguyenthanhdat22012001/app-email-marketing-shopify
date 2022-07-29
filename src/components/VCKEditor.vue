<template>
  <ckeditor
    :value="value"
    :config="configEditor"
    :editor="editor"
    @ready="onReady"
    @input="onEditorInput"
    class="-mt-[10px]"
  ></ckeditor>
</template>

<script>
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor";
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
      },
      uiColor: "#333",
    };
  },

  methods: {
    onReady(editor) {
      const parent = editor.ui.getEditableElement().parentElement;
      const toolbarStyle = editor.ui.view.toolbar.element.style;
      toolbarStyle.backgroundColor = "#F7F7F9";
      toolbarStyle.border = "1px solid #EBEBF0";

      const node = document.createElement('span');
      node.innerText="hello"
      node.style.color = 'red'
      editor.ui.getEditableElement().appendChild(node)
      console.log(node)
      if (!parent.querySelector(".ck-toolbar")) {
        editor.ui
          .getEditableElement()
          .parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
          );
      }

    },
    onEditorInput(data) {
      this.$emit("input", data);
    },
  },
};
</script>

<style lang="scss" scope>
.ck.ck-editor__editable_inline {
  min-height: 100px;
  border: 1px solid #ebebf0;
  border-top-left-radius: 0px;
}

.ck-editor__editable span {
  padding: 2px;
  border-radius: 4px;
}
.ck-button {
  color: red;
}
</style>
