// import React from "react";
// // import Output from "editorjs-react-renderer";
// import Blocks from "editorjs-blocks-react-renderer";

// export default function RenderBlog({ content }) {
//   console.log({ content: JSON.parse(content) });

//   //       {/* <Output data={null} /> */}
//   return <p>saf</p>;
// }

// import { EditorParser, EditorRenderer } from "@mobtakr/editorjs-parser";

// const RenderBlog = (props: { content: string }) => {
//   const content = JSON.parse(props.content);
//   const parser = new EditorParser(content?.blocks);

//   const parsedBlocks = parser.parse();
//   return (
//     <>
//       <EditorRenderer parsedBlocks={parsedBlocks} styles={{}} />
//     </>
//   );
// };

// export default RenderBlog;

import { Parser, Table } from "@alkhipce/editorjs-react";

const RenderBlog = (props: { content: string }) => {
  const content = JSON.parse(props.content);

  return (
    <>
      <Parser data={content} />
    </>
  );
};

export default RenderBlog;
