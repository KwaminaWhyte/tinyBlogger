import React from "react";
import { ClientOnly } from "remix-utils";
import { Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import type {
  LoaderFunction,
  MetaFunction,
  ActionFunction,
} from "@remix-run/node";
import { gql } from "graphql-request";
// import { createReactEditorJS } from "react-editor-js";

import client from "~/utils/apolloClient";
// import { EDITOR_JS_TOOLS } from "~/utils/editorJsTools.client";
import CKEditorCustom from "~/components/CKEditorCustom.client";

// const ReactEditorJS = createReactEditorJS();
export const meta: MetaFunction = () => {
  return {
    title: "tinyBlog | New Blog",
    description: "",
  };
};
export const loader: LoaderFunction = async () => {
  return "asfjbasuf ";
};
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const description = formData.get("description");
  const content = formData.get("markdown");

  let data = {
    slug,
    title,
    description,
    content,
  };

  const query = gql`
    query newPost($slug: String!) {
      category(where: { slug: $slug }) {
        title
        posts {
          id
          slug
          title
          description
          createdAt
          featuredImage {
            url
          }
          categories {
            title
            slug
            id
          }
          account {
            username
            photo {
              url
            }
          }
        }
      }
    }
  `;

  const result = await client.request(query, data);

  return redirect("/posts/admin");
};

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

const NewBLog = () => {
  const editorCore = React.useRef(null);

  // const handleInitialize = React.useCallback((instance) => {
  //   editorCore.current = instance;
  // }, []);

  const handleSave = React.useCallback(async () => {
    const savedData = await editorCore.current.save();
    console.log(savedData);
  }, []);

  return (
    <ClientOnly
      fallback={
        <div>
          <h1>NewBLog</h1>
        </div>
      }
    >
      {() => (
        <div className="px-5 py-10">
          <h1>NewBLog</h1>

          <Form method="post">
            <p>
              <label>
                Post Title:{" "}
                <input type="text" name="title" className={inputClassName} />
              </label>
            </p>
            <p>
              <label>
                Post Slug:{" "}
                <input type="text" name="slug" className={inputClassName} />
              </label>
            </p>
            <div className="">
              <label htmlFor="markdown">Content</label>

              <CKEditorCustom
                onChange={(data) => console.log(data, "from new blog page!")}
              />

              {/* <ReactEditorJS
                holder="editorjs"
                // defaultValue={blocks}
                tools={EDITOR_JS_TOOLS}
                onInitialize={handleInitialize}
                placeholder={`Let's write an awesome blog!`}
                inlineToolbar={true}
              /> */}
            </div>

            <p onClick={() => handleSave()}>Submit</p>
            <p className="text-right">
              <button
                type="submit"
                className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
              >
                Create Post
              </button>
            </p>
          </Form>
        </div>
      )}
    </ClientOnly>
  );
};

export default NewBLog;
