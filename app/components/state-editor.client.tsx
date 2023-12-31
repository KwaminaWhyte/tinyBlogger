import { is } from "node_modules/cheerio/lib/esm/api/traversing";
import React from "react";
import {
  BaseEditor,
  Editor,
  Element,
  createEditor,
  Descendant,
  Transforms,
} from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { Button } from "./ui/button";

type CustomText = {
  bold?: boolean;
  italic?: boolean;
  text: string;
};

type CustomElement = {
  type: "paragraph" | "link";
  children: CustomText[] | CustomElement[];
  href?: string;
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
  isBoldMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
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
    // Transforms.setNodes(
    //   editor,
    //   { type: isActive ? null : "italic" },
    //   { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    // );
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
      case "italic":
        return <Italic {...props} />;
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
            CustomEditor.toggleItalicMark(editor);
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
        onChange={(value) => {
          const content = JSON.stringify(value);
          console.log(content);

          // localStorage.setItem("content", content);
        }}
        onPaste={(event) => {
          event.preventDefault();
          const text = event.clipboardData.getData("text/plain");
          const html = event.clipboardData.getData("text/html");
          console.log(event.clipboardData.getData("text/html"));

          // const ast = htmlToSlateASTSync(html);
          // console.log(ast);
          // const fragment = Reac
          // Transforms.insertFragment(editor, fragment);
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

const withEmbeds = (editor: Editor) => {
  const { isVoid, isInline, insertData } = editor;

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    console.log("data", data.getData("text/plain"));

    const html = data.getData("text/html");

    if (text) {
      return insertData(data);
    }

    if (html) {
      const parse = new DOMParser().parseFromString(html, "text/html");
      const fragment = deserialize(parse.body);
      Transforms.insertFragment(editor, fragment);
      return;
    }
    return insertData(data);
  };

  // editor.isVoid = (element) => {
  //   return element.type === "image" ? true : isVoid(element);
  // };

  return editor;
};

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
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
