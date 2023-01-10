import { type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import type { CategoryType, PostType } from "~/utils/types";
import supabase from "~/utils/supabase";

export const meta: MetaFunction = () => {
  return {
    title: "tinyBlogger | Featured Blog",
    description: "",
  };
};

export const loader: LoaderFunction = async () => {
  const { data } = await supabase
    .from("blogs")
    .select("id,title,description,cover_image");
  console.log(data);

  let categories = [{ id: 3, slug: "fassf_asfas", title: "asfasf" }];
  let posts = data;
  return { posts, categories };
};

function Index() {
  const { posts, categories } = useLoaderData();

  return (
    <>
      <section className="flex overflow-x-auto px-3">
        {posts?.map((post: PostType) => (
          <div
            key={post.id}
            style={{
              background: `url('${post.cover_image}')`,
              backgroundSize: "cover",
            }}
            className="m-3 flex h-56 w-[95%] flex-shrink-0 flex-col rounded-lg p-5 hover:bg-top md:w-96"
          >
            <h4 className="mt-5 w-[80%] text-lg font-bold text-white">
              {post.title}
            </h4>
            <p> {post.description}</p>
            <Link
              to={`/blog/${post.id}`}
              className="mr-auto mt-auto rounded-2xl  bg-white py-3 px-4 text-sm font-medium ring-yellow-400 transition-all duration-75 ease-in hover:bg-gray-900 hover:text-white hover:ring-2"
            >
              Read More
            </Link>
          </div>
        ))}
      </section>

      <section className="my-5 flex justify-center border-b border-gray-300 px-3 py-6">
        {categories?.map((category: CategoryType) => (
          <NavLink
            to={`/tag/${category.slug}`}
            key={category.id}
            className={({ isActive }) =>
              isActive
                ? "text-md m-1 mx-2 decoration-slice font-extrabold text-black underline underline-offset-8 md:m-5"
                : "m-1 md:m-5"
            }
          >
            <p className="font-medium">{category.title}</p>
          </NavLink>
        ))}
      </section>

      {/* <section className="flex flex-col md:px-3">
        <Outlet />
      </section> */}
    </>
  );
}

export default Index;
