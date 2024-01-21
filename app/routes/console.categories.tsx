import {
  type LoaderFunction,
  type ActionFunction,
  type MetaFunction,
} from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import ConsoleLayout from "~/layouts/console";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import PostController from "~/server/controllers/PostController";
import type { CategoryDocument } from "~/server/types";

export default function CreateBlog() {
  const submit = useSubmit();
  const { categories } = useLoaderData<{ categories: CategoryDocument[] }>();

  return (
    <ConsoleLayout className="gap-5 ">
      <Form method="POST" className="flex flex-col gap-3">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" type="text" />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Input id="description" type="text" name="description" />
        </div>

        <Button type="submit">Save</Button>
      </Form>

      <section className="grid grid-cols-2 gap-3">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col bg-gray-50 shadow-lg p-3 rounded-lg"
          >
            <p className="font-semibold">{category.title}</p>
            <p className="ml-11">{category.description}</p>

            <div className="ml-auto flex gap-3">
              <Button
              // onClick={() =>
              //   submit(
              //     {
              //       actionType: "unlist",
              //       category: comment?._id,
              //     },
              //     {
              //       method: "POST",
              //     }
              //   )
              // }
              >
                Update
              </Button>
              <Button
                variant="destructive"
                onClick={() =>
                  submit(
                    {
                      actionType: "delete",
                      comment: category?._id,
                    },
                    {
                      method: "POST",
                    }
                  )
                }
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </section>
    </ConsoleLayout>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const actionType = formData.get("actionType") as string;
  const comment = formData.get("comment") as string;

  const postController = new PostController(request);
  if (actionType == "delete") {
    console.log("something...");
    return await postController.deleteCategory(comment);
  } else {
    return await postController.createCategory({
      title,
      description,
    });
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const postController = new PostController(request);
  const categories = await postController.getCategories();

  return { categories };
};

export const meta: MetaFunction = () => {
  return [
    { title: "Penrobes - Categories" },
    {
      name: "description",
      content: "Blog about anything and everything",
    },
    { name: "og:title", content: "Penrobes" },
    {
      name: "og:description",
      content: "Penrobes Blog about anything and everything",
    },
    {
      name: "og:image",
      content:
        "https://media.istockphoto.com/vectors/letter-b-icon-vector-id521527924?k=6&m=521527924&s=612x612&w=0&h=CuLX6X3KP0BxCSI2qMkHu_hS664SH-jUuS3BtCKMCmg=",
    },
    { name: "og:url", content: "" },
  ];
};
