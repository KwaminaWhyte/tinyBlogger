import { type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { IoIosChatbubbles, IoIosHeart, IoIosShare } from "react-icons/io";
import moment from "moment";
import type { CommentType, PostType } from "~/utils/types";
import supabase from "~/utils/supabase";

export const meta: MetaFunction = ({ data }) => {
  return {
    title: `tinyBlogger | ${data?.title}`,
    description: `${data?.description}`,
    "og:image": `${data?.cover_image}`,
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const { data: blog, error: blogError } = await supabase
    .from("blogs")
    .select("*, profile ( id, username, profile_img ) ")
    .eq("slug", params.slug)
    // .limit(1)
    .single();

  const { data: comments, error: commentError } = await supabase
    .from("comments")
    .select("*")
    .eq("blog_id", blog?.id);

  console.log(comments);

  return { blog, comments };
};

function Blog() {
  const { blog, comments } = useLoaderData();

  return (
    <div className="flex w-full flex-col md:flex-row">
      <section className="my-5  border-gray-300  md:w-[60%] md:border-r ">
        <div className="min-h-screen px-3 md:px-8">
          <div className="flex items-center py-5">
            <img
              src={blog?.profile?.profile_img}
              className="mr-3 h-11 w-11 rounded-full object-cover"
              alt=""
            />
            <div>
              <p className="font-bold">{blog?.profile?.username}</p>
              <p className="text-sm">
                {moment(blog?.created_at).format("MMMM Do, YYYY")}
                {/* . 12 min read */}
              </p>
            </div>
          </div>

          <h1 className="my-3 text-justify text-3xl font-bold md:text-4xl">
            {blog?.title}
          </h1>
          <p className="text-xl md:text-2xl">{blog?.description}</p>

          <img
            src={blog?.cover_image}
            alt=""
            className="my-4 w-full rounded-md"
          />

          <section
            className="mt-11"
            dangerouslySetInnerHTML={{ __html: blog?.content }}
          />
        </div>

        <div className="sticky bottom-0 mt-11 flex h-14 items-center border-b border-t border-gray-300 bg-slate-50 px-6 text-gray-600 md:px-11">
          <div className="mr-5 flex">
            <IoIosHeart size={23} />
            <p className="ml-2">200</p>
          </div>

          <div className="flex">
            <IoIosChatbubbles size={23} />
            <p className="ml-2">30</p>
          </div>

          <IoIosShare size={23} className="ml-auto" />
        </div>

        <div className="min-h-screen px-3 py-4 md:px-8">
          <p className="font-bold">Comments ({comments.length})</p>

          <div className="mt-6">
            {comments?.map((comment: CommentType) => (
              <div key={comment?.id} className="my-3">
                <div className="flex">
                  <img src="" className="mr-3 h-11 w-11 rounded-full" alt="" />
                  <div>
                    <p className="font-bold">{comment?.name}</p>
                    <p className="text-sm">
                      {moment(comment?.created_at).format("MMMM Do, YYYY")}
                    </p>
                  </div>
                </div>
                <p className="ml-4">{comment?.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="my-5 px-3 md:w-[40%] md:px-8">
        <p>asfasf</p>
      </section>
    </div>
  );
}

export default Blog;
