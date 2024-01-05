import {
  type ActionFunction,
  type LoaderFunction,
  type MetaFunction,
} from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import moment from "moment";
import React from "react";
import ConsoleLayout from "~/layouts/console";
import PostController from "~/server/controllers/PostController";
import type { PostDocument } from "~/server/types";

export default function ConsoleIndex() {
  const { unpublishedPosts, publishedPosts } = useLoaderData<{
    unpublishedPosts: PostDocument[];
    publishedPosts: PostDocument[];
    categories: PostDocument[];
  }>();
  console.log(unpublishedPosts);

  return (
    <ConsoleLayout className="gap-5">
      <section className="flex flex-col gap-3">
        <div className="w-full border-b-4 border-gray-300">
          <h2 className="underline underline-offset-8 ">Unpublished Posts </h2>
        </div>

        <div className="gap-6 grid grid-rows-1 md:grid-cols-3">
          {unpublishedPosts.map((post, index) => (
            <Link
              to={`/console/posts/${post?._id}`}
              className="flex-1 gap-3 flex flex-col"
              key={index}
            >
              <img
                src={
                  post?.featureImage?.url
                    ? post?.featureImage?.url
                    : "https://th.bing.com/th/id/R.20d3e94846b0317ba981e9b4d3ecdabb?rik=wRXoSyZgG3cbIA&pid=ImgRaw&r=0"
                }
                alt=""
                className="w-full h-40 object-cover bg-gray-100 rounded-sm"
              />

              <div className="flex-1">
                <p className="font-semibold text-xl">{post.title}</p>
                <p className="text-gray-500 line-clamp-2">{post.description}</p>

                <div className=" flex flex-col">
                  <p className="font-semibold">{post?.createdBy?.name}</p>
                  <p className="text-gray-500 ml-auto text-xs">
                    {moment(post?.createdAt).format("MMM DD, YYYY")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <div className="w-full border-b-4 border-gray-300">
          <h2 className="underline underline-offset-8 ">Published Posts </h2>
        </div>

        <div className="gap-6 grid grid-rows-1 md:grid-cols-3">
          {publishedPosts.map((post, index) => (
            <Link
              to={`/console/posts/${post?._id}`}
              className="flex-1 gap-3 flex flex-col"
              key={index}
            >
              <img
                src={
                  post?.featureImage?.url
                    ? post?.featureImage?.url
                    : "https://th.bing.com/th/id/R.20d3e94846b0317ba981e9b4d3ecdabb?rik=wRXoSyZgG3cbIA&pid=ImgRaw&r=0"
                }
                alt=""
                className="w-full h-40 object-cover bg-gray-100 rounded-sm"
              />

              <div className="flex-1">
                <p className="font-semibold text-xl">{post.title}</p>
                <p className="text-gray-500 line-clamp-2">{post.description}</p>

                <div className="mt-auto flex flex-col">
                  <p className="font-semibold">{post?.createdBy?.name}</p>
                  <p className="text-gray-500 ml-auto text-xs">
                    {moment(post?.createdAt).format("MMM DD, YYYY")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </ConsoleLayout>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const postController = new PostController(request);
  return await postController.createCategory({
    title,
    description,
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  const postController = new PostController(request);
  const unpublishedPosts = await postController.getUnpublishedPosts();
  const publishedPosts = await postController.getPosts();

  return { unpublishedPosts, publishedPosts };
};

export const meta: MetaFunction = () => {
  return [
    { title: "Blogger. - Categories" },
    {
      name: "description",
      content: "Blog about anything and everything",
    },
    { name: "og:title", content: "Blogger." },
    {
      name: "og:description",
      content: "Blogger. Blog about anything and everything",
    },
    {
      name: "og:image",
      content:
        "https://media.istockphoto.com/vectors/letter-b-icon-vector-id521527924?k=6&m=521527924&s=612x612&w=0&h=CuLX6X3KP0BxCSI2qMkHu_hS664SH-jUuS3BtCKMCmg=",
    },
    { name: "og:url", content: "" },
  ];
};
