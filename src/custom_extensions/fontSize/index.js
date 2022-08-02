import { Extension } from "@tiptap/core";

/**
 * FontSize - Custom Extension
 *   this.editor.chain().focus().setFontSize(value).run();
 */

export default Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) =>
              element.style.fontSize.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ commands }) => {
          commands.setMark("textStyle", {
            fontSize: fontSize + "px",
          });
        },
      unsetFontSize:
        () =>
        ({ commands }) => {
          return commands
            .setMark("textStyle", { fontSize: null })
            .removeEmptyTextStyle();
        },
    };
  },
});
