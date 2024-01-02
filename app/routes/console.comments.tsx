import {
  type ActionFunction,
  type LoaderFunction,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import ConsoleLayout from "~/layouts/console";
import CommentController from "~/server/controllers/CommentController";

export default function ConsoleComments() {
  const { comments } = useLoaderData();
  console.log(comments);

  return (
    <ConsoleLayout>
      <p>ConsoleComments</p>
    </ConsoleLayout>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const comment = formData.get("comment") as string;
  const postId = formData.get("postId") as string;
  const slug = formData.get("slug") as string;

  const commentController = new CommentController(request);
  return await commentController.createComment({
    postId,
    name,
    email,
    comment,
    slug,
  });
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { slug } = params as { slug: string };
  // const url = new URL(request.url);
  // const slug = url.searchParams.get("slug") as string;

  const commentController = new CommentController(request);
  const comments = await commentController.getUnpublishedComments();

  return { comments };
};

export const meta: MetaFunction = ({ data }) => {
  const post = data?.post;
  return [
    { title: `Comments | Blogger.` },
    {
      name: "description",
      content: post?.description,
    },
    { name: "og:title", content: `Comments | Blogger.` },
    {
      name: "og:description",
      content: post?.description,
    },
    {
      name: "og:image",
      content: post?.coverImage?.url,
    },
    { name: "og:url", content: "https://tinyblogger.vercel.app" },
  ];
};
