import { Link } from "@remix-run/react";
import moment from "moment";
import React from "react";
import type { PostDocument } from "~/server/types";

export default function PostCard({ post }: { post: PostDocument }) {
  return (
    <Link to={`/posts/${post?.slug}`} className="flex-1 gap-3 flex flex-col">
      <img
        src={
          post?.featureImage?.url
            ? post?.featureImage?.url
            : "https://th.bing.com/th/id/R.20d3e94846b0317ba981e9b4d3ecdabb?rik=wRXoSyZgG3cbIA&pid=ImgRaw&r=0"
        }
        alt=""
        className="w-full h-40 object-cover bg-gray-100 rounded-sm"
      />

      <div className="flex-1">
        <p className="font-semibold text-xl">{post.title}</p>
        <p className="text-gray-500 line-clamp-2">{post.description}</p>

        <div className="mt-auto flex flex-col">
          <p className="font-semibold">{post?.createdBy?.name}</p>
          <p className="text-red-500 ml-auto text-xs">
            {moment(post?.createdAt).format("MMMM DD, YYYY")}
          </p>
        </div>
      </div>
    </Link>
  );
}
