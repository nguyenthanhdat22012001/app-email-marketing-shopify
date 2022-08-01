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
    let arr_heading = [
      {
        level: 1,
        font_size: 32,
      },
      {
        level: 2,
        font_size: 24,
      },
      {
        level: 3,
        font_size: 18.72,
      },
      {
        level: 4,
        font_size: 16,
      },
      {
        level: 5,
        font_size: 13.28,
      },
      {
        level: 6,
        font_size: 10.72,
      },
    ];
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) =>
              element.style.fontSize.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (attributes.heading) {
                return {
                  style: `font-size: ${attributes.fontSize}`,
                };
              } else {
                if (!attributes.fontSize) {
                  return {};
                }
                return {
                  style: `font-size: ${attributes.fontSize}`,
                };
              }

              // if (!attributes.fontSize) {
              //   return {};
              // }
              // return {
              //   style: `font-size: ${attributes.fontSize}`,
              // };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize, heading = null) =>
        ({ commands }) => {
          commands.setMark("textStyle", {
            fontSize: fontSize ? fontSize + "px" : null,
            heading: heading,
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
