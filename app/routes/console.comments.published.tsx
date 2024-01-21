import {
  type ActionFunction,
  type LoaderFunction,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import moment from "moment";
import React from "react";
import { Button } from "~/components/ui/button";
import CommentController from "~/server/controllers/CommentController";
import type { CommentDocument } from "~/server/types";

export default function ConsoleComments() {
  const submit = useSubmit();
  const { comments } = useLoaderData<{ comments: CommentDocument[] }>();

  return (
    <div>
      <section>
        <h3>Published </h3>
      </section>

      <section className="grid grid-cols-2 gap-3">
        {comments.map((comment, index) => (
          <div
            key={index}
            className="flex flex-col bg-gray-50 shadow-lg p-3 rounded-lg"
          >
            <div className="flex gap-3 items-center">
              <p className="font-semibold">
                {comment.name} - {comment.email}
              </p>
            </div>
            <p className="ml-11">{comment.comment}</p>
            <p className="ml-auto">
              {moment(comment.createdAt).format("MMM DD, YYYY - H:m a")}
            </p>
            <div className="ml-auto flex gap-3">
              <Button
                variant="destructive"
                onClick={() =>
                  submit(
                    {
                      actionType: "unlist",
                      comment: comment?._id,
                    },
                    {
                      method: "POST",
                    }
                  )
                }
              >
                Unlist
              </Button>
              <Button
                onClick={() =>
                  submit(
                    {
                      actionType: "publish",
                      comment: comment?._id,
                    },
                    {
                      method: "POST",
                    }
                  )
                }
              >
                Publish
              </Button>
            </div>
          </div>
        ))}
      </section>
    </div>
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
  const comments = await commentController.getPublishedComments();

  return { comments };
};

export const meta: MetaFunction = ({ data }) => {
  const post = data?.post;
  return [
    { title: `Comments | Penrobes` },
    {
      name: "description",
      content: post?.description,
    },
    { name: "og:title", content: `Comments | Penrobes` },
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
