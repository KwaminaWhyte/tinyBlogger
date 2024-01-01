import { type MetaFunction, type LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import PublicLayout from "~/components/layouts/public";
import moment from "moment";
import { ClientOnly } from "remix-utils/client-only";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { GraphQLClient, gql } from "graphql-request";
import PostController from "~/server/controllers/PostController";

export default function CategoryDetails() {
  const { category, slug, posts } = useLoaderData<{
    category: any;
    posts: any[];
  }>();
  console.log({ category, posts });

  return (
    <PublicLayout>
      <section className="flex gap-5 flex-col my-11">
        <h1 className="md:text-6xl text-3xl text-center md:w-[70%] mx-auto">
          {category?.title}
        </h1>

        <p className="text-center md:w-[70%] mx-auto">
          {category?.description}
        </p>
      </section>

      {/* <img
        src={post?.coverImage?.url}
        alt=""
        className="my-5 w-full rounded-md"
      /> */}

      <section className="grid grid-cols-3 gap-4 ">
        {posts.map((post, index) => (
          <Link
            to={`/blogs/${post?.slug}`}
            className="flex-1 gap-3 flex flex-col"
            key={index}
          >
            <img
              src={post?.coverImage?.url}
              alt=""
              className="w-full h-40 object-cover"
            />

            <div className="flex-1">
              <p className="font-semibold text-xl">{post.title}</p>
              <p className="text-gray-500 line-clamp-2">{post.description}</p>

              <div className="mt-auto">
                <p className="font-semibold">{post?.createdBy?.name}</p>
                <p className="text-gray-500">
                  {moment(post?.createdAt).format("MMM DD, YYYY")}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </PublicLayout>
  );
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { slug } = params as { slug: string };
  // const url = new URL(request.url);
  // const slug = url.searchParams.get("slug") as string;

  const postController = await new PostController(request);
  const category = await postController.getCategoryBySlug(slug);
  const posts = await postController.getPostByCategory(category.id);

  return { category, slug, posts };
};

export const meta: MetaFunction = ({ data }) => {
  const category = data?.category;
  return [
    { title: `${category?.title} | Blogger.` },
    {
      name: "description",
      content: category?.description,
    },
    { name: "og:title", content: `${category?.title} | Blogger.` },
    {
      name: "og:description",
      content: category?.description,
    },
    {
      name: "og:image",
      content: category?.coverImage?.url,
    },
    { name: "og:url", content: "https://tinyblogger.vercel.app" },
  ];
};
