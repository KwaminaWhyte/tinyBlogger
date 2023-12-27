import { type MetaFunction, type LoaderFunction } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import React, { Suspense } from "react";
import PublicLayout from "~/components/layouts/public";
import PostController from "~/server/controllers/PostController";
import moment from "moment";
import { ClientOnly } from "remix-utils/client-only";
import RenderBlog from "~/components/render-blog.client";

export default function Blog() {
  const { blog, slog } = useLoaderData();
  const [name] = useOutletContext();
  console.log(JSON.parse(blog?.content));

  return (
    <PublicLayout>
      <section className="flex gap-5 flex-col my-11">
        <h1 className="md:text-6xl text-3xl text-center md:w-[70%] mx-auto">
          {blog?.title}
        </h1>

        <p className="text-center md:w-[70%] mx-auto">{blog?.description}</p>

        <p className="ml-auto ">
          {moment(blog.createdAt).format("MMM DD, YYYY")} - 10 mins Read
        </p>
      </section>

      <ClientOnly fallback={<p>Loading Editor, please be patient...</p>}>
        {() => <RenderBlog content={blog.content} />}
      </ClientOnly>
    </PublicLayout>
  );
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { slug } = params as { slug: string };

  // const url = new URL(request.url);
  // const slug = url.searchParams.get("slug") as string;

  const postController = await new PostController(request);
  const blog = await postController.getBlog(slug);
  console.log({ blog, slug });

  return { blog, slug };
};

export const meta: MetaFunction = ({ data }) => {
  console.log(data, "from meta");

  return [
    { title: `${data?.blog?.title} | Blogger.` },
    {
      name: "description",
      content: data?.post?.description,
    },
    { name: "og:title", content: `  ${data?.post?.title} Blogger.` },
    {
      name: "og:description",
      content: data?.post?.description,
    },
    {
      name: "og:image",
      content:
        "https://res.cloudinary.com/app-deity/image/upload/v1700324984/lnjfa1hco96qrbwu11oe.jpg",
    },
    { name: "og:url", content: "https://www.printmoney.money" },
  ];
};
