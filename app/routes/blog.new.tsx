import React from "react";
import type { LoaderFunction, MetaFunction } from "remix";

export const loader: LoaderFunction = async () => {
  return "asfjbasuf ";
};

export const meta: MetaFunction = () => {
  return {
    title: "tinyBlog | New Blog",
    description: "",
  };
};

function NewBLog() {
  return (
    <div>
      <h1>NewBLog</h1>

      <h2>Tools to create a new blog post</h2>
    </div>
  );
}

export default NewBLog;
