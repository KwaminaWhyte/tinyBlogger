import {
  type ActionFunction,
  type LoaderFunction,
  type MetaFunction,
} from "@remix-run/node";
import { NavLink, Outlet, useLoaderData, useSubmit } from "@remix-run/react";
import moment from "moment";
import React from "react";
import { Button } from "~/components/ui/button";
import ConsoleLayout from "~/layouts/console";
import CommentController from "~/server/controllers/CommentController";
import type { CommentDocument } from "~/server/types";

export default function ConsoleComments() {
  const { comments } = useLoaderData<{ comments: CommentDocument[] }>();

  return (
    <ConsoleLayout>
      <section>
        <h3>Comments</h3>
      </section>

      <section className="flex gap-3 mt-5 mb-6 bg-gray-100 p-2 items-center">
        {[
          { path: "", name: "Unublished" },
          { path: "/published", name: "Published" },
          { path: "/unlisted", name: "Unlisted" },
        ].map((comSection) => (
          <NavLink
            end={false}
            key={comSection.name}
            to={`/console/comments${comSection.path}`}
            className="hover:text-gray-700"
          >
            {comSection.name}
          </NavLink>
        ))}
      </section>

      <Outlet />
    </ConsoleLayout>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const comment = formData.get("comment") as string;
  const actionType = formData.get("actionType") as string;

  const commentController = new CommentController(request);
  if (actionType == "publish") {
    return await commentController.publishComment(comment);
  } else if (actionType == "unlist") {
    return await commentController.unlistComment(comment);
  }
};

export const loader: LoaderFunction = async ({ request, params }) => {
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
