<template>
  <div>
    <div class="flex items-center w-[100%] border border-light rounde">
      <editor-content
        :editor="editor"
        class="flex-1 editor-field max-h-[100px] overflow-auto bg-white p-3 border-r border-light"
      />
      <span class="text-gray-light w-[60px] text-center"
        >{{ editor ? editor.storage.characterCount.characters() : 0 }}/{{
          limit
        }}</span
      >
    </div>

    <div v-if="prop_open_variant" class="mt-4">
      <v-dropdown-variant @emitClickVariant="onClickVariant" />
    </div>
  </div>
</template>

<script>
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-2";
import Paragraph from "@tiptap/extension-paragraph";
import CharacterCount from "@tiptap/extension-character-count";
import Text from "@tiptap/extension-text";
import Variant from "@/custom_extensions/variant/index";
import TextStyle from "@tiptap/extension-text-style";
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
      limit: 78,
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
        TextStyle,
        CharacterCount.configure({
          limit: this.limit,
        }),
      ],
      content: this.prop_email_content,
      editorProps: {
        handleDOMEvents: {
          keydown: (view, event) => {
            if (event.key === "Enter") {
              event.preventDefault();
            }
            return false;
          },
        },
      },
    });

    this.editor.on("update", ({ editor }) => {
      let string = editor.getHTML();
      let htmlObject = document.createElement("div");
      htmlObject.style = "white-space: pre-wrap;";
      htmlObject.innerHTML = string;
      let newString = htmlObject.outerHTML;
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
  line-break: anywhere;
  .tiptap_variant {
    background: #003084;
    padding: 2px;
    margin: 0 3px;
    border-radius: 4px;
    color: #ffffff;
  }
}
.ProseMirror [contenteditable="false"] {
  white-space: normal;
}
</style>
