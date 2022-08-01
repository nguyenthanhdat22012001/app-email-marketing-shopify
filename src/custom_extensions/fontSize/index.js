// import { Extension } from "@tiptap/core";
// import TextStyle from "@tiptap/extension-text-style";

// /**
//  * FontSize - Custom Extension
//  * editor.commands.setFontSize(e.target.value) :set the font-size.
//  */

// export const FontSize = Extension.create({
//   name: "fontSize",
//   addOptions() {
//     return {
//       types: ["textStyle"],
//     };
//   },
//   addGlobalAttributes() {
//     return [
//       {
//         types: this.options.types,
//         attributes: {
//           fontSize: {
//             default: null,
//             parseHTML: (element) =>
//               element.style.fontSize.replace(/['"]+/g, ""),
//             renderHTML: (attributes) => {
//               if (!attributes.fontSize) {
//                 return {};
//               }
//               return {
//                 style: `font-size: ${attributes.fontSize}`,
//               };
//             },
//           },
//         },
//       },
//     ];
//   },
//   addCommands() {
//     return {
//       setFontSize:
//         (fontSize) =>
//         ({}) => {
//           return setMark("textStyle", { fontSize: fontSize + "px" }).run();
//         },
//       unsetFontSize:
//         () =>
//         ({}) => {
//           return setMark("textStyle", { fontSize: null })
//             .removeEmptyTextStyle()
//             .run();
//         },
//     };
//   },
// });
