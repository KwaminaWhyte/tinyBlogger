import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
// import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Table from "@editorjs/table";
import LinkTool from "@editorjs/link";
import NestedList from "@editorjs/nested-list";
import SimpleImage from "@editorjs/simple-image";
import Marker from "@editorjs/marker";
import Embed from "@editorjs/embed";
import Underline from "@editorjs/underline";

export default function Editor({ setContent }) {
  const ejInstance = useRef();
  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
        },
        list: {
          class: NestedList,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: "/api/fetch-link-data", // Your backend endpoint for url data fetching,
          },
        },
        underline: Underline,
        image: SimpleImage,
        marker: {
          class: Marker,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+M",
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              facebook: true,
              twitter: true,
              instagram: true,
              imgur: true,
              codepen: true,
              vimeo: true,
              pinterest: true,
              coub: true,
              github: true,
            },
          },
        },
      },
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: {
        time: new Date().getTime(),
        blocks: [
          {
            type: "header",
            data: {
              text: "This is my awesome editor!",
              level: 1,
            },
          },
        ],
      },
      onChange: async () => {
        let content = await editor.saver.save();
        setContent(content);
        console.log(content);
      },
    });
  };

  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }
    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return <div id="editorjs"></div>;
}
