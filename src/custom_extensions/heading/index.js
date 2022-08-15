import Heading from "@tiptap/extension-heading";
import { mergeAttributes } from "@tiptap/core";

/**
 * Heading - Custom extension
 *         this.editor.chain().focus().toggleHeading({ level: value }).run();
 */

export default Heading.extend({
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
    this.options.HTMLAttributes.style = `font-size: ${get_heading.font_size}; line-height: 1.4; font-weight: 500`;
    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
});
