import Header from "@editorjs/header";
import Code from "@editorjs/code";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import LinkTool from "@editorjs/link";
import SimpleImage from "@editorjs/simple-image";

// import Paragraph from "@editorjs/paragraph";
// import Embed from "@editorjs/embed";
// import Warning from "@editorjs/warning";
// import Raw from "@editorjs/raw";
// import Quote from "@editorjs/quote";
// import Marker from "@editorjs/marker";
// import CheckList from "@editorjs/checklist";
// import Delimiter from "@editorjs/delimiter";
// import InlineCode from "@editorjs/inline-code";

export const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: "Enter a header",
      levels: [2, 3, 4],
      defaultLevel: 3,
    },
  },
  code: Code,
  table: Table,
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  image: {
    class: Image,
    config: {
      endpoints: {
        byFile: "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
        byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
      },
    },
  },
  linkTool: LinkTool,
  simpleImage: SimpleImage,

  //   embed: Embed,
  //   warning: Warning,
  //   raw: Raw,
  //   quote: Quote,
  //   marker: Marker,
  //   checklist: CheckList,
  //   delimiter: Delimiter,
  //   inlineCode: InlineCode,
};

// table: {
//     class: Table,
//     inlineToolbar: true,
//     withHeadings: false,
//     config: {
//       rows: 2,
//       cols: 3,
//     },
//   },

// linkTool: {
//     class: LinkTool,
//     config: {
//       endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
//     }
//   }
