import { type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import PostController from "~/server/controllers/PostController";

export default function ConsolePosts() {
  const { posts } = useLoaderData<{ posts: any[] }>();

  return <div>ConsolePosts</div>;
}

export const loader: LoaderFunction = async ({ request }) => {
  const postController = new PostController(request);
  const posts = await postController.getPosts();

  return { posts };
};

export const meta: MetaFunction = ({ data }) => {
  return [
    { title: `Posts | Penrobes` },
    {
      name: "description",
      content: "Lists of all posts",
    },
    { name: "og:title", content: `Posts | Penrobes` },
    {
      name: "og:description",
      content: "Lists of all posts",
    },
    {
      name: "og:image",
      content:
        "https://tinyblogger.vercel.app/build/_assets/Penrodes_icon_logo-19-5CJYJWAK.png",
    },
    { name: "og:url", content: "https://tinyblogger.vercel.app" },
  ];
};

// http://localhost:3000/console/posts/clqwnzh3vbwe80buq8k5if1eh
