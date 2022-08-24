import {
  Mark,
  mergeAttributes,
} from "@tiptap/core";

export default Mark.create({
  name: "font_size",

  content: "inline*",
  group: "block",
  draggable: false,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      size: {
        default: null,
        renderHTML: (attributes) => {
          if (!attributes.size) {
            return {};
          }

          return {
            style: `font-size: ${attributes.size}px;`,
          };
        },
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

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (attributes) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes);
        },
      unsetFontSize:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});
