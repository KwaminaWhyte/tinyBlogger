import {
  type MetaFunction,
  type LoaderFunction,
  type ActionFunction,
} from "@remix-run/node";
import {
  Link,
  useActionData,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import moment from "moment";
import PostController from "~/server/controllers/PostController";
import { EyeIcon, ShareIcon, ThumbUpIcon } from "~/components/icons";
import { ClientOnly } from "remix-utils/client-only";
import { PlateEditor } from "~/components/plate-editor.client";
import { useEffect, useState } from "react";
import ConsoleDetailLayout from "~/layouts/console-detail";
import type { PostDocument } from "~/server/types";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";

export default function Blog() {
  const submit = useSubmit();
  const actionData = useActionData();
  const { post, postId } = useLoaderData<{
    post: PostDocument;
    postId: string;
  }>();
  const [content, setContent] = useState(JSON.parse(post.content));
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [base64String, setBase64String] = useState("");

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${post?.title} | Blogger.`,
        text: `${post?.description} | Blogger.`,
        url: window.location.href,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleSubmit = (actionType: string) => {
    submit(
      {
        actionType,
        postId,
        title,
        description,
        // slug: genetateSlug(title),
        content: JSON.stringify(content),
        featureImage: base64String,
      },
      {
        method: "post",
        encType: "multipart/form-data",
      }
    );
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
    if (actionData) {
      console.log(actionData);
      toast(`Post Updated`, {
        description: `Post ${
          actionData.stage == "PUBLISHED" ? "Saved and Published" : "Saved"
        }`,
      });
    }
  }, [actionData]);

  return (
    <ConsoleDetailLayout
      title="Review Post"
      rightContent={
        <div className="flex items-center gap-3">
          <p
            className={`text-xs px-2 py-1 text-white font-semibold rounded-lg bg-opacity-85 ${
              post.stage == "DRAFT" ? "bg-red-500 " : "bg-green-600"
            } text-foreground`}
          >
            {post.stage}
          </p>

          <Button onClick={() => handleSubmit("update")} variant="outline">
            Save
          </Button>

          <Button onClick={() => handleSubmit("update-publish")}>
            Save & Publish
          </Button>
        </div>
      }
    >
      <section className="flex flex-col gap-3">
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
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
      </section>

      <section className="rounded-md  relative flex flex-col gap-5 my-8 h-96 items-center justify-center bg-black/70 p-4 ">
        <h1 className="md:text-6xl text-white text-3xl text-center md:w-[70%] mx-auto">
          {post?.title}
        </h1>
        <p className="text-center text-white md:w-[70%] mx-auto">
          {post?.description}
        </p>
        <p className="ml-auto text-white">
          {moment(post.createdAt).format("MMMM DD, YYYY")}
        </p>
        <img
          src={base64String ? base64String : post?.featureImage?.url}
          alt=""
          className="w-full absolute -z-10 h-full object-cover rounded-md"
        />
      </section>

      <div className="flex flex-col gap-3 mx-auto">
        <Input
          type="file"
          id="image"
          name="image"
          accept=".png,.jpg,jpeg"
          onChange={handleImageChange}
        />
      </div>

      <section className="border-y flex items-center justify-between my-5 w-full md:w-[50%] gap-7 border-gray-200 py-3 mx-auto px-5">
        <div className="flex items-center gap-5">
          <div className="flex gap-1 items-center cursor-pointer">
            <EyeIcon className="text-gray-500" />
            <p>{post.views.length}</p>
          </div>

          <div className="flex gap-1 items-center cursor-pointer">
            <ThumbUpIcon className="text-gray-500" />
            <p>{post.likes.length}</p>
          </div>
        </div>

        <div>
          <ShareIcon onClick={handleShare} className="text-gray-500" />
        </div>
      </section>

      <section className="flex gap-3 overflow-x-auto mb-5 items-center w-full justify-center">
        {post?.categories?.map((category, index) => (
          <Link
            to={`/categories/${category.slug}`}
            key={index}
            className="bg-slate-900 rounded-xl capitalize px-2 py-1 text-white border text-nowrap"
          >
            {category.title}
          </Link>
        ))}
      </section>

      <ClientOnly fallback={<p>Loading Editor, please be patient...</p>}>
        {() => (
          <PlateEditor
            onChange={setContent}
            value={content}
            initialValue={JSON.parse(post?.content)}
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
  const postId = formData.get("postId") as string;
  const actionType = formData.get("actionType") as string;
  const featureImage = formData.get("featureImage") as string;

  const postController = new PostController(request);

  if (actionType == "update") {
    return await postController.updatePost(postId, {
      title,
      description,
      content: content,
      featureImage,
    });
  } else if (actionType == "update-publish") {
    return await postController.updateAndPublishPost(postId, {
      title,
      description,
      content: content,
      featureImage,
    });
  }
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { postId } = params as { postId: string };

  const postController = new PostController(request);
  const post = await postController.getPostById(postId);

  return { post, postId };
};

export const meta: MetaFunction = ({ data }) => {
  const post = data?.post;
  return [
    { title: `${post?.title} | Blogger.` },
    {
      name: "description",
      content: post?.description,
    },
    { name: "og:title", content: `${post?.title} | Blogger.` },
    {
      name: "og:description",
      content: post?.description,
    },
    {
      name: "og:image",
      content: post?.coverImage?.url,
    },
    { name: "og:url", content: "https://tinyblogger.vercel.app" },
  ];
};

// http://localhost:3000/console/posts/clqwnzh3vbwe80buq8k5if1eh
