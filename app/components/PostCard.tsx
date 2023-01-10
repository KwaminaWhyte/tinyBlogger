import moment from "moment";
import { Link } from "@remix-run/react";
import type { PostType } from "~/utils/types";

function PostCard({ post }: { post: PostType }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="my-3 border-b border-gray-300 py-3 md:py-8"
    >
      <div className="flex items-center">
        <img
          src={post.cover_image}
          className="mr-3 h-8 w-8 rounded-full"
          alt=""
        />
        <p className="text-md font-medium">{post.account.username}</p>
      </div>

      <div className="flex items-center">
        <div className="mr-8">
          <p className="my-2 font-bold">{post.title}</p>

          <p className="my-4 hidden md:flex">{post.description}</p>

          <div className="flex flex-col md:flex-row md:items-center">
            <p className="mr-3 text-sm">
              {moment(post.created_at).format("MMMM Do")} . 20min read
            </p>

            <div className="flex flex-wrap">
              {post.categories.map((category) => (
                <Link
                  className="mx-1 rounded-lg bg-gray-200 py-1 px-2 text-sm transition-all duration-200 hover:bg-slate-300"
                  to={`/tag/${category.slug}`}
                  key={category.id}
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <img
          src={post.cover_image}
          className="ml-auto h-12 w-12 rounded-sm md:h-32 md:w-32"
          alt=""
        />
      </div>
    </Link>
  );
}

export default PostCard;
