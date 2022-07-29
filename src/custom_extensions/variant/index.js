import { mergeAttributes, Node } from "@tiptap/core";

export default Node.create({
  name: "variant",

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

      background: {
        default: "#003084",
        renderHTML: (attributes) => {
          return {
            style: `background: ${attributes.background}`,
          };
        },
      },
      color: {
        default: '#ffffff',
        renderHTML: attributes => {
          return {
            style: `color: ${attributes.color}`,
          }
        },
      },
      padding: {
        default: '2px',
        renderHTML: attributes => {
          return {
            style: `padding: ${attributes.padding}`,
          }
        },
      },
      borderRadius: {
        default: '4px',
        renderHTML: attributes => {
          return {
            style: `border-radius: ${attributes.borderRadius}`,
          }
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

  renderHTML({ node, HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), `${node.attrs.id}`];
  },

  addNodeView() {
    return ({ editor, node, getPos }) => {
      const { view } = editor;
      console.log(node);
      const dom = document.createElement("span");
      dom.setAttribute("id", `${node.attrs.id}`);
      dom.style =
        "background:#003084;padding:2px;border-radius:4px;color: #ffffff";
      dom.innerHTML = `@${node.attrs.id}`;

      return {
        dom,
      };
    };
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
