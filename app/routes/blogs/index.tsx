import { type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import type { CategoryType, PostType } from "~/utils/types";
import supabase from "~/utils/supabase";
import moment from "moment";

export const meta: MetaFunction = () => {
  return {
    title: "tinyBlogger | Featured Blog",
    description: "",
  };
};

export const loader: LoaderFunction = async () => {
  const { data } = await supabase
    .from("blogs")
    .select(
      "id,title,description,cover_image, slug, profile (id, username, profile_img), created_at)"
    );

  let categories = [
    { id: 3, slug: "asfjb45_af", title: "Category 1" },
    { id: 2, slug: "amfb8&7_86", title: "Category 2" },
    { id: 1, slug: "fassf546456", title: "Category 3" },
    { id: 6, slug: "fassf_a3434", title: "Category 4" },
  ];
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
            className="m-3 flex h-56 w-[95%] flex-shrink-0 flex-col rounded-lg hover:bg-top md:w-96"
          >
            <div className="relative top-0 right-0 flex h-full w-full flex-col rounded-lg bg-black/70 p-3">
              <h4 className="my-2 w-[90%] text-lg font-bold text-white">
                {post.title}
              </h4>
              <p className="text-white"> {post.description}</p>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center text-white">
                  <img
                    src={post?.profile?.profile_img}
                    className="mr-3 h-11 w-11 rounded-full object-cover"
                    alt=""
                  />
                  <div>
                    <p className="font-bold">{post?.profile?.username}</p>
                    <p className="text-sm">
                      {moment(post?.created_at).format("MMMM Do, YYYY")}
                      {/* . 12 min read */}
                    </p>
                  </div>
                </div>

                <Link
                  to={`/blogs/@${post.profile.username}/${post.slug}`}
                  className="ml-auto rounded-2xl bg-white py-3 px-4 text-sm font-medium ring-yellow-400 transition-all duration-75 ease-in hover:bg-gray-900 hover:text-white hover:ring-2"
                >
                  Read More
                </Link>
              </div>
            </div>
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
