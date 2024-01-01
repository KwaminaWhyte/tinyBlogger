import React from "react";
import {
  type BaseEditor,
  Editor,
  Element,
  createEditor,
  Descendant,
  Transforms,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
  useSlateStatic,
} from "slate-react";
import { Button } from "./ui/button";
import withEmbeds from "~/lib/withEmbeds";

type CustomText = {
  bold?: boolean;
  italic?: boolean;
  text: string;
};

type CustomElement = {
  type: "paragraph" | "link" | "code" | "h1" | "underline" | "image" | "video";
  children: CustomText[] | CustomElement[];
  href?: string;
  url?: string;
  openInNewTab?: boolean;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: { type: "paragraph"; children: CustomText[] } | CustomElement;
    Text: CustomText;
  }
}

const CustomEditor = {
  handleEmbeds(editor: Editor, url: string) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "video",
    });

    if (match) {
      const [node, path] = match;
      const newProperties: Partial<CustomElement> = {
        url,
      };
      Transforms.setNodes(editor, newProperties, { at: path });
    }
  },
  handlePaste(editor: Editor, event: ClipboardEvent) {
    const text = event.clipboardData.getData("text/plain");
    const html = event.clipboardData.getData("text/html");
    console.log("embed", event.clipboardData.getData("text/html"));
  },

  isBoldMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    });

    return !!match;
  },

  isUnderlineMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.underline === true,
      universal: true,
    });

    return !!match;
  },

  isItalicMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.italic === true,
      universal: true,
    });

    return !!match;
  },

  isCodeBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "code",
    });

    return !!match;
  },

  isLinkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "link",
    });

    return !!match;
  },

  isBulletedListActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "bulleted-list",
    });

    return !!match;
  },

  isNumberedListActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "numbered-list",
    });

    return !!match;
  },

  isBlockQuoteActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "code",
    });

    return !!match;
  },

  isH1Active(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "h1",
    });

    return !!match;
  },

  toggleBoldMark(editor: Editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },

  toggleItalicMark(editor: Editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "italic");
    } else {
      Editor.addMark(editor, "italic", true);
    }
  },

  toggleCodeBlock(editor: Editor) {
    const isActive = CustomEditor.isBlockQuoteActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "code" },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  },

  toggleUnderline(editor: Editor) {
    const isActive = CustomEditor.isUnderlineMarkActive(editor);
    // Transforms.setNodes(
    //   editor,
    //   { type: isActive ? null : "underline" },
    //   { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    // );
    if (isActive) {
      Editor.removeMark(editor, "underline");
    } else {
      Editor.addMark(editor, "underline", true);
    }
  },

  toggleLink(editor: Editor) {
    const isActive = CustomEditor.isLinkActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "link" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },

  toggleBulletedList(editor: Editor) {
    const isActive = CustomEditor.isBulletedListActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "bulleted-list" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },

  toggleNumberedList(editor: Editor) {
    const isActive = CustomEditor.isNumberedListActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "numbered-list" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },

  toggleBlockQuote(editor: Editor) {
    const isActive = CustomEditor.isBlockQuoteActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "block-quote" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },

  toggleH1(editor: Editor) {
    const isActive = CustomEditor.isH1Active(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "h1" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },

  insertLink(editor: Editor, href: string) {
    if (editor.selection) {
      const link: CustomElement = {
        type: "link",
        href,
        openInNewTab: true,
        children: [],
      };
      Transforms.wrapNodes(editor, link, { split: true });
      Transforms.collapse(editor, { edge: "end" });
    }
  },

  insertBulletedList(editor: Editor) {
    const list: CustomElement = { type: "bulleted-list", children: [] };
    Transforms.wrapNodes(editor, list, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  },

  insertNumberedList(editor: Editor) {
    const list: CustomElement = { type: "numbered-list", children: [] };
    Transforms.wrapNodes(editor, list, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  },
};

const initialValue: CustomElement[] = [
  {
    type: "paragraph",
    children: [
      {
        text: "A line of text in a paragraph.",
      },
    ],
  },
  {
    type: "video",
    url: "https://youtu.be/yXd0z1shhoU",
    children: [{ text: "" }],
  },
  {
    type: "image",
    children: [{ text: "" }],
    url: "https://plus.unsplash.com/premium_photo-1665423291654-f937fd6e649e?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function SlateEditor() {
  const editor = React.useMemo(() => withEmbeds(withReact(createEditor())), []);
  const [value, setValue] = React.useState<CustomElement[]>(initialValue);

  const renderElement = React.useCallback((props) => {
    switch (props.element.type) {
      case "link":
        return <LinkElement {...props} />;
      case "code":
        return <CodeBlock {...props} />;
      case "h1":
        return <H1 {...props} />;
      case "underline":
        return <Underline {...props} />;
      case "italic":
        return <Italic {...props} />;
      case "image":
        return <CustomImage {...props} />;
      case "video":
        return <VideoElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = React.useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={(value) => {
        const isAstChang = editor.operations.some(
          (op) => op.type === "set_selection"
        );

        if (isAstChang) {
          const content = JSON.stringify(value);
          localStorage.setItem("content", content);
        }
      }}
    >
      <div className="flex gap-1">
        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }}
          type="button"
        >
          Bold
        </Button>

        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleItalicMark(editor);
          }}
          type="button"
        >
          Italic
        </Button>

        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleUnderline(editor);
          }}
          type="button"
        >
          Underline
        </Button>

        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleCodeBlock(editor);
          }}
          type="button"
        >
          Code Block
        </Button>

        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleLink(editor);
          }}
          type="button"
        >
          Link
        </Button>

        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleBulletedList(editor);
          }}
          type="button"
        >
          Bulleted List
        </Button>

        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleNumberedList(editor);
          }}
          type="button"
        >
          Numbered List
        </Button>

        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleBlockQuote(editor);
          }}
          type="button"
        >
          Block Quote
        </Button>

        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleH1(editor);
          }}
          type="button"
        >
          H1
        </Button>

        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleH1(editor);
          }}
          type="button"
        >
          H2
        </Button>

        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleH1(editor);
          }}
          type="button"
        >
          Image
        </Button>
      </div>

      <Editable
        spellCheck
        autoFocus
        onChange={(value) => {
          const content = JSON.stringify(value);
          // console.log(content);

          // localStorage.setItem("content", content);
        }}
        onPaste={(event) => {
          event.preventDefault();
          CustomEditor.handlePaste(editor, event);
        }}
        className="bg-gray-100 p-2"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
            return;
          }

          switch (event.key) {
            case "`": {
              event.preventDefault();
              CustomEditor.toggleCodeBlock(editor);
              break;
            }

            case "b": {
              event.preventDefault();
              CustomEditor.toggleBoldMark(editor);
              break;
            }

            case "i": {
              event.preventDefault();
              CustomEditor.toggleItalicMark(editor);
              break;
            }

            case "l": {
              event.preventDefault();
              CustomEditor.toggleLink(editor);
              break;
            }

            case "u": {
              event.preventDefault();
              CustomEditor.toggleBulletedList(editor);
              break;
            }

            case "o": {
              event.preventDefault();
              CustomEditor.toggleNumberedList(editor);
              break;
            }

            case "q": {
              event.preventDefault();
              CustomEditor.toggleBlockQuote(editor);
              break;
            }

            case "h": {
              event.preventDefault();
              CustomEditor.toggleH1(editor);
              break;
            }
          }
        }}
      />
    </Slate>
  );
}

const Leaf = (props) => {
  let children = props.children;
  if (props.leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (props.leaf.code) {
    children = <code>{children}</code>;
  }
  if (props.leaf.italic) {
    children = <em>{children}</em>;
  }
  if (props.leaf.underline) {
    children = <u className="underline">{children}</u>;
  }

  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {children}
    </span>
  );
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const LinkElement = (props) => {
  return (
    <a
      {...props.attributes}
      href={props.element.href}
      target={props.element.openInNewTab ? "_blank" : "_self"}
      rel="noopener noreferrer"
    >
      {props.children}
    </a>
  );
};

const CodeBlock = (props) => {
  return (
    <pre {...props.attributes} style={{ backgroundColor: "red" }}>
      <code>{props.children}</code>
    </pre>
  );
};

const Italic = (props) => {
  return (
    <em {...props.attributes} className="italic">
      {props.children}
    </em>
  );
};

const H1 = (props) => {
  return (
    <h1 {...props.attributes} className="text-6xl">
      {props.children}
    </h1>
  );
};

const Underline = (props) => {
  return (
    <u {...props.attributes} className="underline">
      {props.children}
    </u>
  );
};

const CustomImage = (props) => {
  return (
    <img
      {...props.attributes}
      src={props.element.url}
      alt={props.element.alt}
    />
  );
};

const VideoElement = ({ attributes, children, element }) => {
  const editor = useSlateStatic();
  const { url } = element;
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <div
          style={{
            padding: "75% 0 0 0",
            position: "relative",
          }}
        >
          <iframe
            title="test"
            src={`${url}`}
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <UrlInput
          url={url}
          onChange={(val) => {
            const path = ReactEditor.findPath(editor, element);
            const newProperties: Partial<Element> = {
              url: val,
            };
            Transforms.setNodes<Element>(editor, newProperties, {
              at: path,
            });
          }}
        />
      </div>
      {children}
    </div>
  );
};

const UrlInput = ({ url, onChange }) => {
  const [value, setValue] = React.useState(url);
  return (
    <input
      value={value}
      onClick={(e) => e.stopPropagation()}
      style={{
        marginTop: "5px",
        boxSizing: "border-box",
      }}
      onChange={(e) => {
        const newUrl = e.target.value;
        setValue(newUrl);
        onChange(newUrl);
      }}
    />
  );
};
