import { mergeAttributes, Node } from "@tiptap/core";
/**
 * FontSize - Custom node
 *      this.editor.chain().focus().setVariant({ id: value }).run();
 */

export default Node.create({
  name: "variant",

  addOptions() {
    return {
      HTMLAttributes: {
        style:
          "background:#003084;padding:2px; margin:0 3px;border-radius:4px;color: #ffffff",
        class: "tiptap_variant",
      },
    };
  },

  group: "inline",

  inline: true,

  selectable: false,

  atom: true,
  whitespace: "pre",

  addAttributes() {
    return {
      id: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span",
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      `${node.attrs.id}`,
    ];
  },

  addCommands() {
    return {
      setVariant:
        (variant) =>
        ({ commands }) => {
          commands.insertContent([
            {
              type: "variant",
              attrs: { id: variant.id },
            },
          ]);
        },
    };
  },
});