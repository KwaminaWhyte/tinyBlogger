// import { htmlToSlateASTSync } from "@graphcms/html-to-slate-ast";
import { type ActionFunction, type MetaFunction } from "@remix-run/node";
import { useSubmit } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { ClientOnly } from "remix-utils/client-only";
import ConsoleLayout from "~/layouts/console";
import { PlateEditor } from "~/components/plate-editor.client";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import PostController from "~/server/controllers/PostController";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const submit = useSubmit();

  const handleSubmit = () => {
    submit(
      {
        title,
        description,
        slug: genetateSlug(title),
        content: JSON.stringify(content),
      },
      {
        method: "post",
        encType: "multipart/form-data",
      }
    );
  };

  console.log(content);

  return (
    <ConsoleLayout className="gap-5">
      <Button onClick={() => handleSubmit()}>Save</Button>

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
        <Input id="slug" type="text" value={genetateSlug(title)} disabled />
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

      {/* coverImage */}

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
    </ConsoleLayout>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;

  const postController = new PostController(request);
  return await postController.createPost({
    title,
    description,
    slug,
    content: content,
  });
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
