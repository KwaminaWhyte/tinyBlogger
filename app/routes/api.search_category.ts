import { json, type LoaderFunction } from "@remix-run/node";
import PostController from "~/server/controllers/PostController";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") as string;

  const postController = new PostController(request);
  const categories = await postController.searchCategories(query);

  return json(categories);
};
