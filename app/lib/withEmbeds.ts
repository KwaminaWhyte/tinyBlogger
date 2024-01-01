import { type Editor, Transforms } from "slate";

const withEmbeds = (editor: Editor) => {
  const { isVoid } = editor;
  editor.isVoid = (element) =>
    element.type === "video" ? true : isVoid(element);
  return editor;

  //   const { isVoid, isInline, insertData } = editor;

  //   editor.insertData = (data) => {
  //     const text = data.getData("text/plain");
  //     console.log("data", data.getData("text/plain"));

  //     const html = data.getData("text/html");

  //     if (text) {
  //       return insertData(data);
  //     }

  //     if (html) {
  //       const parse = new DOMParser().parseFromString(html, "text/html");
  //       const fragment = deserialize(parse.body);
  //       Transforms.insertFragment(editor, fragment);
  //       return;
  //     }
  //     return insertData(data);
  //   };

  //   // editor.isVoid = (element) => {
  //   //   return element.type === "image" ? true : isVoid(element);
  //   // };

  //   return editor;
};

export default withEmbeds;
