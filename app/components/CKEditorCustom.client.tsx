import React from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor.client";
import { CKEditor } from "@ckeditor/ckeditor5-react";

function CKEditorCustom({ onChange }: { onChange: any }) {
  return (
    <CKEditor
      editor={Editor}
      data="<p>Hello, Write some awesome blog :)</p>"
      onReady={(editor: any) => {
        // You can store the "editor" and use when it is needed.
        console.log("Editor is ready to use!", editor);
      }}
      onChange={(event: any, editor: any) => {
        const data = editor.getData();
        // console.log({ event, editor, data });
        onChange(data);
      }}
      onBlur={(event: any, editor: any) => {
        console.log("Blur.", editor);
      }}
      onFocus={(event: any, editor: any) => {
        console.log("Focus.", editor);
      }}
    />
  );
}

export default CKEditorCustom;
