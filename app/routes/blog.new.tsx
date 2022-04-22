import { Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import type {
  LoaderFunction,
  MetaFunction,
  ActionFunction,
} from "@remix-run/node";
import { gql } from "graphql-request";

import client from "~/utils/apolloClient";

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
  return (
    <div>
      <h1>NewBLog</h1>

      <h2>Tools to create a new blog post</h2>

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
        <p>
          <label htmlFor="markdown">Markdown:</label>
          <br />
          <textarea
            id="markdown"
            rows={20}
            name="markdown"
            className={`${inputClassName} font-mono`}
          />
        </p>
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
  );
};

export default NewBLog;
