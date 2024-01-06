import {
  type LoaderFunction,
  type ActionFunction,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { ClientOnly } from "remix-utils/client-only";
import { PlateEditor } from "~/components/plate-editor.client";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import PostController from "~/server/controllers/PostController";
import axios from "axios";
import ConsoleDetailLayout from "~/layouts/console-detail";
import type { CategoryDocument } from "~/server/types";

export default function CreateBlog() {
  const { categories } = useLoaderData<{ categories: CategoryDocument[] }>();
  const submit = useSubmit();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [base64String, setBase64String] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryClick = (category: string) => {
    const index = selectedCategories.indexOf(category);

    if (index === -1) {
      setSelectedCategories(selectedCategories.concat(category));
    } else {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setBase64String(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    axios
      .get("/api/check-slug?slug=" + genetateSlug(title))
      .then((res) => {
        if (res.data.status == 400) {
          setSlug(genetateSlug(title) + "-1");
        } else {
          setSlug(genetateSlug(title));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [title]);

  return (
    <ConsoleDetailLayout
      className="gap-5"
      title="Create Post"
      rightContent={
        <div className="flex items-center gap-3">
          {/* <p
            className={`text-xs px-2 py-1 text-white font-semibold rounded-lg bg-opacity-85 ${
              post.stage == "DRAFT" ? "bg-red-500 " : "bg-green-600"
            } text-foreground`}
          >
            {post.stage}
          </p> */}

          <Button
            onClick={() =>
              submit(
                {
                  title,
                  description,
                  slug: genetateSlug(title),
                  content: JSON.stringify(content),
                  featureImage: base64String,
                  categories: JSON.stringify(selectedCategories),
                },
                {
                  method: "post",
                  encType: "multipart/form-data",
                }
              )
            }
            variant="outline"
          >
            Save
          </Button>
        </div>
      }
    >
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" type="text" value={slug} disabled />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="description">Categories</Label>
        <div className="flex gap-3">
          {categories.map((category) => (
            <p
              onClick={() => handleCategoryClick(category?._id)}
              key={category?._id}
              className={`px-2 py-1  rounded-xl text-white cursor-pointer capitalize ${
                selectedCategories.includes(category?._id)
                  ? "ring-2 ring-primary ring-offset-2 bg-primary"
                  : "bg-primary/80"
              }`}
            >
              {category.title}
            </p>
          ))}
        </div>
      </div>

      <div className="flex gap-5 items-center">
        <div className="flex flex-col">
          <img
            src={
              base64String
                ? base64String
                : "https://th.bing.com/th/id/R.20d3e94846b0317ba981e9b4d3ecdabb?rik=wRXoSyZgG3cbIA&pid=ImgRaw&r=0"
            }
            alt=""
            className="w-60 border border-gray-200 h-36 object-cover rounded-lg "
          />
        </div>

        <div className="flex flex-col gap-3">
          <Input
            type="file"
            id="image"
            name="image"
            accept=".png,.jpg,jpeg"
            onChange={handleImageChange}
          />
        </div>
      </div>

      <ClientOnly fallback={<p>Loading Editor, please be patient...</p>}>
        {() => (
          <PlateEditor
            onChange={setContent}
            value={content}
            initialValue={[
              {
                id: "1",
                type: "p",
                children: [{ text: "Hello, World!" }],
              },
            ]}
          />
        )}
      </ClientOnly>
    </ConsoleDetailLayout>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const featureImage = formData.get("featureImage") as string;
  const categories = formData.get("categories") as string;

  const postController = new PostController(request);
  return await postController.createPost({
    title,
    description,
    slug,
    content: content,
    featureImage,
    categories: JSON.parse(categories),
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  const postController = new PostController(request);
  const categories = await postController.getCategories();

  return { categories };
};

export const meta: MetaFunction = () => {
  return [
    { title: "Blogger. - Create Post" },
    {
      name: "description",
      content: "Blog about anything and everything",
    },
    { name: "og:title", content: "Blogger." },
    {
      name: "og:description",
      content: "Blogger. Blog about anything and everything",
    },
    {
      name: "og:image",
      content:
        "https://media.istockphoto.com/vectors/letter-b-icon-vector-id521527924?k=6&m=521527924&s=612x612&w=0&h=CuLX6X3KP0BxCSI2qMkHu_hS664SH-jUuS3BtCKMCmg=",
    },
    { name: "og:url", content: "" },
  ];
};

const genetateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};
