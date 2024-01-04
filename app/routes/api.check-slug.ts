import { json, type LoaderFunction } from "@remix-run/node";
import PostController from "~/server/controllers/PostController";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug") as string;

  return await new PostController(request).checkSlug(slug);
};
