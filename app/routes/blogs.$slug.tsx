import { MetaFunction, type LoaderFunction } from "@remix-run/node";
import React from "react";
import PublicLayout from "~/components/layouts/public";

export default function Blog() {
  return (
    <PublicLayout>
      <section className="flex gap-5 flex-col my-11">
        <h1 className="text-6xl text-center w-[70%] mx-auto">
          Debugging Skill to make you Invinsible
        </h1>

        <p className="text-center w-[70%] mx-auto">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
          accusantium libero quaerat tenetur quasi? Distinctio quaerat obcaecati
          laboriosam similique, deleniti quos nisi, ipsa dolores cumque quia,
          pariatur sit exercitationem iure.
        </p>

        <p className="ml-auto ">Nov 22, 2023 - 10 mins Read</p>
      </section>

      <p>Blog</p>
    </PublicLayout>
  );
}

export const loader: LoaderFunction = async ({ request, params }) => {
  console.log(params);

  const url = new URL(request.url);
  const ss = url.searchParams.get("");

  return {
    post: {
      title: "Taking debugging to the next level",
      description: "some descriptions",
    },
  };
};

export const meta: MetaFunction = ({ data }) => {
  console.log(data, "from meta");

  return [
    { title: `  ${data?.post?.title} Blogger.` },
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
