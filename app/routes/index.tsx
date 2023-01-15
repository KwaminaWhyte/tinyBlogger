import { type LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import moment from "moment";

import supabase from "~/utils/supabase";
import { getSession } from "~/utils/session.server";
import type { CategoryType, PostType } from "~/utils/types";
import PostCard from "~/components/PostCard";

export const loader: LoaderFunction = async ({ request }) => {
  // const session = await getSession(request.headers.get("Cookie"));
  // console.log(session.get("auth_user"), "cookie");
  const { data, error } = await supabase
    .from("blogs")
    .select(
      "id,title,description,cover_image,slug, profile (id, username, profile_img), created_at)"
    );

  // console.log(data, error);

  let posts = data;
  let categories = [];

  return { posts, categories };
};

export default function Index() {
  const { posts, categories } = useLoaderData();

  return (
    <>
      <section className="flex h-96 flex-col justify-center border-b border-black px-3 md:px-12">
        <h1 className="text-5xl font-bold md:text-8xl">Stay curious.</h1>

        <p className="my-9 text-xl md:w-2/3 md:text-3xl">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>

        <Link
          to="/blogs"
          className="mr-auto rounded-2xl bg-black py-3 px-6 font-medium text-white shadow-md shadow-gray-400 ring-black transition-all duration-75 hover:bg-yellow-400 hover:text-black hover:ring-2"
        >
          Start Reading
        </Link>
      </section>

      <section className="mx-auto flex flex-col border-b border-gray-400 px-3 py-4 md:w-full md:px-12">
        <p className="mb-5 font-bold">TRENDING</p>

        <div className="flex flex-wrap justify-between">
          {posts?.map((post: PostType) => (
            <Link
              to={`/blogs/@${post.profile.username}/${post.slug}`}
              key={post.id}
              className="my-3 md:w-[29%]"
            >
              <div className="flex items-center">
                <img
                  src={post.profile.profile_img}
                  className="mr-3 h-10 w-10 rounded-full"
                  alt=""
                />
                <div>
                  <p className="text-sm font-medium">{post.profile.username}</p>
                  <p className="text-sm">
                    {moment(post.created_at).format("MM DD, YYYY")} - 17mins
                    read{" "}
                  </p>
                </div>
              </div>
              <p className="my-2 font-bold">{post.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto flex min-h-screen flex-col py-4 md:w-full md:flex-row md:px-12">
        <div className="flex flex-col md:w-[60%] md:pr-8">
          {posts?.map((post: PostType) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="sticky top-28 mt-20 md:w-[40%] md:pl-5">
          <p className="mb-5 font-bold">DISCOVER MORE OF WHAT MATTERS TO YOU</p>

          <div className="flex flex-wrap">
            {categories?.map((category: CategoryType) => (
              <Link
                to={`/tag/${category.slug}`}
                key={category.id}
                className="m-1 rounded-md border border-gray-400 py-1 px-5"
              >
                <p>{category.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
