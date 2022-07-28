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
        
      },
    };
  },
  mounted() {},
  methods: {
    onReady(editor) {
    
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
    onEditorInput(data){
      this.$emit("input",data)
    }
  },
};
</script>

<style lang="scss" scope>
.ck-editor__editable {
  min-height: 100px;
  border: 1px solid #ebebf0;
}
.ck-editor__editable span{
  padding:2px;
  border-radius:4px;
}
</style>
