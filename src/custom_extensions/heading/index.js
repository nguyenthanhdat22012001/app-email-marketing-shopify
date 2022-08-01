import Heading from "@tiptap/extension-heading";
import { mergeAttributes } from "@tiptap/core";

/**
 * Heading - Custom extension
 *         this.editor.chain().focus().toggleHeading({ level: value }).run();
 */

export default Heading.extend({
  name: "heading",

  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {},
    };
  },

  content: "inline*",

  group: "block",

  defining: true,

  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: false,
      },
    };
  },

  parseHTML() {
    return this.options.levels.map((level) => ({
      tag: `h${level}`,
      attrs: { level },
    }));
  },

  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level = hasLevel ? node.attrs.level : this.options.levels[0];
    let arr_heading = [
      {
        level: 1,
        font_size: "2em",
      },
      {
        level: 2,
        font_size: "1.5em",
      },
      {
        level: 3,
        font_size: "1.17em",
      },
      {
        level: 4,
        font_size: "1em",
      },
      {
        level: 5,
        font_size: "0.83em",
      },
      {
        level: 6,
        font_size: "0.67em",
      },
    ];
    let get_heading = arr_heading.find((item) => item.level == level);
    this.options.HTMLAttributes.style = `font-size: ${get_heading.font_size};`;
    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setHeading:
        (attributes) =>
        ({ commands }) => {
          if (!this.options.levels.includes(attributes.level)) {
            return false;
          }

          return commands.setNode(this.name, attributes);
        },
      toggleHeading:
        (attributes) =>
        ({ commands }) => {
          if (!this.options.levels.includes(attributes.level)) {
            return false;
          }

          return commands.toggleNode(this.name, "paragraph", attributes);
        },
    };
  },
});
