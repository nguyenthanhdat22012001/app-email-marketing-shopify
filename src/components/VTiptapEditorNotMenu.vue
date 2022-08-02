<template>
  <div>
    <editor-content
      :editor="editor"
      class="editor-field bg-white p-3 border border-light rounded"
    />
    <div v-if="prop_open_variant" class="mt-4">
      <v-dropdown-variant @emitClickVariant="onClickVariant" />
    </div>
  </div>
</template>

<script>
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-2";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Variant from "@/custom_extensions/variant/index";
import VDropdownVariant from "./VDropdownVariant.vue";

export default {
  components: {
    EditorContent,
    VDropdownVariant,
  },
  props: {
    prop_email_content: {
      default: "",
    },
    prop_open_variant: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      editor: null,
    };
  },
  methods: {
    onClickVariant(value) {
      this.editor.chain().focus().setVariant({ id: value }).run();
    },
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Paragraph,
        Text,
        Variant,
      ],
      content: this.prop_email_content,
    });

    this.editor.on("update", ({ editor }) => {
      let newString = editor.getHTML();
      this.$emit("emitUpdateEmailContent", newString);
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss" scoped>
.editor-field::v-deep(.ProseMirror) {
  outline: none;
//   min-height: 112px;
//   padding: 12px 5px;
  line-break: anywhere;
}
.ProseMirror [contenteditable="false"] {
  white-space: normal;
}


</style>
