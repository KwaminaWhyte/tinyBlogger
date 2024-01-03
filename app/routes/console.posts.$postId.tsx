import { type MetaFunction, type LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import moment from "moment";
import PostController from "~/server/controllers/PostController";
import ConsoleLayout from "~/layouts/console";
import CustomRenderer from "~/components/custom-renderer";
import { EyeIcon, ShareIcon, ThumbUpIcon } from "~/components/icons";

export default function Blog() {
  const { post } = useLoaderData<{ post: any }>();

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${post?.title} | Blogger.`,
        text: `${post?.description} | Blogger.`,
        url: window.location.href,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <ConsoleLayout>
      <section className="rounded-md  relative flex flex-col gap-5 my-11 h-96 items-center justify-center bg-black/70 p-4 ">
        <h1 className="md:text-6xl text-white text-3xl text-center md:w-[70%] mx-auto">
          {post?.title}
        </h1>
        <p className="text-center text-white md:w-[70%] mx-auto">
          {post?.description}
        </p>
        <p className="ml-auto text-white">
          {moment(post.createdAt).format("MMMM DD, YYYY")}
        </p>
        <img
          src={post?.coverImage?.url}
          alt=""
          className="w-full absolute -z-10 h-full object-cover rounded-md"
        />
      </section>

      <section className="border-y flex items-center justify-between mb-5 w-full md:w-[50%] gap-7 border-gray-200 py-3 mx-auto px-5">
        <div className="flex items-center gap-5">
          <div className="flex gap-1 items-center cursor-pointer">
            <EyeIcon className="text-gray-500" />
            <p>2k</p>
          </div>

          <div className="flex gap-1 items-center cursor-pointer">
            <ThumbUpIcon className="text-gray-500" />
            <p>1k</p>
          </div>
        </div>

        <div>
          <ShareIcon onClick={handleShare} className="text-gray-500" />
        </div>
      </section>

      <section className="flex gap-3 overflow-x-auto mb-5 items-center w-full justify-center">
        {post?.categories?.map((category, index) => (
          <Link
            to={`/categories/${category.slug}`}
            key={index}
            className="bg-slate-900 rounded-xl capitalize px-2 py-1 text-white border text-nowrap"
          >
            {category.title}
          </Link>
        ))}
      </section>
      <CustomRenderer content={JSON.parse(post?.content)} />
    </ConsoleLayout>
  );
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { postId } = params as { postId: string };

  const postController = new PostController(request);
  const post = await postController.getPostById(postId);

  return { post };
};

export const meta: MetaFunction = ({ data }) => {
  const post = data?.post;
  return [
    { title: `${post?.title} | Blogger.` },
    {
      name: "description",
      content: post?.description,
    },
    { name: "og:title", content: `${post?.title} | Blogger.` },
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

// http://localhost:3000/console/blogs/clqwnzh3vbwe80buq8k5if1eh
