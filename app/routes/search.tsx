import { type MetaFunction, type LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import PublicLayout from "~/layouts/public";
import moment from "moment";
import PostController from "~/server/controllers/PostController";

export default function CategoryDetails() {
  const { categories, posts, query } = useLoaderData<{
    categories: any[];
    posts: any[];
    query: string;
  }>();
  console.log({ categories, posts });

  return (
    <PublicLayout query={query}>
      <section className="my-7">
        <h2 className="text-3xl font-semibold">
          Results for <span className="font-bold">{query}</span>{" "}
        </h2>
      </section>

      <section className="flex gap-3 my-5 overflow-x-auto">
        {categories?.map((category, index) => (
          <Link
            to={`/categories/${category.slug}`}
            key={index}
            className="bg-slate-900 rounded-xl capitalize px-2 py-1 text-white border text-nowrap"
          >
            {category.title}
          </Link>
        ))}
      </section>

      <section className="grid md:grid-cols-3 grid-cols-1 gap-4 ">
        {posts.map((post, index) => (
          <Link
            to={`/blogs/${post?.slug}`}
            className="flex-1 gap-3 flex flex-col"
            key={index}
          >
            <img
              src={post?.coverImage?.url}
              alt=""
              className="w-full h-40 object-cover rounded-sm"
            />

            <div className="flex-1">
              <p className="font-semibold text-xl">{post.title}</p>
              <p className="text-gray-500 line-clamp-2">{post.description}</p>

              <div className="mt-auto flex flex-col">
                <p className="font-semibold">{post?.createdBy?.name}</p>
                <p className="text-gray-500 ml-auto">
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
  const url = new URL(request.url);
  const query = url.searchParams.get("query") as string;

  const postController = new PostController(request);
  const categories = await postController.searchCategories(query);
  const posts = await postController.searchPosts(query);

  return { categories, posts, query };
};

export const meta: MetaFunction = ({ data }) => {
  const { query } = data;
  return [
    { title: `${query} - Search | Blogger.` },
    {
      name: "description",
      content: `Search results for ${query}`,
    },
    { name: "og:title", content: `${query} - Search | Blogger.` },
    {
      name: "og:description",
      content: `Search results for ${query}`,
    },
    // {
    // name: "og:image",
    // content: category?.coverImage?.url,
    // },
    { name: "og:url", content: "https://tinyblogger.vercel.app" },
  ];
};
