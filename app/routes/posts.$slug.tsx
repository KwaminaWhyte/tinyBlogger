import {
  type MetaFunction,
  type LoaderFunction,
  type ActionFunction,
} from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import moment from "moment";
import PostController from "~/server/controllers/PostController";
import {
  CommentIcon,
  EyeIcon,
  ShareIcon,
  ThumbUpIcon,
} from "~/components/icons";
import type { PostDocument } from "~/server/types";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Textarea } from "~/components/ui/textarea";
import CommentController from "~/server/controllers/CommentController";
import PublicDetailLayout from "~/layouts/public-detail";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ClientOnly } from "remix-utils/client-only";
import { PlateEditor } from "~/components/plate-editor.client";

export default function Blog() {
  const actionData = useActionData();
  const { post, slug, comments } = useLoaderData<{
    slug: string;
    post: PostDocument;
    comments: any[];
  }>();
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

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

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    setOpen(false);
    if (actionData?._id) {
      toast("Comment has been submitted", {
        description:
          "Your comment has been submitted successfully and is awaiting moderation.",
      });

      localStorage.setItem(
        "userData",
        JSON.stringify({ name: actionData.name, email: actionData.email })
      );
    }
  }, [actionData]);

  return (
    <PublicDetailLayout>
      <section className="rounded-md  relative flex flex-col gap-5 my-11 h-96 items-center justify-center bg-black/70 p-4 ">
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
          src={post?.featureImage?.url}
          alt=""
          className="w-full absolute -z-10 h-full object-cover rounded-md"
        />
      </section>

      <section className="border-y flex items-center justify-between mb-5 w-full md:w-[50%] gap-7 border-gray-200 py-3 mx-auto px-5">
        <div className="flex items-center gap-5">
          <div className="flex gap-1 items-center cursor-pointer">
            <EyeIcon className="text-gray-500" />
            <p>2k</p>
          </div>

          <div className="flex gap-1 items-center cursor-pointer">
            <ThumbUpIcon className="text-gray-500" />
            <p>1k</p>
          </div>

          <Sheet open={open} onOpenChange={() => setOpen(!open)}>
            <SheetTrigger asChild>
              <div className="flex gap-1 items-center cursor-pointer">
                <CommentIcon className="text-gray-500" />
                <p>{comments.length}</p>
              </div>
            </SheetTrigger>
            <SheetContent className="md:min-w-[600px] w-[100vw]">
              <SheetHeader>
                <SheetTitle>Responses ({comments.length})</SheetTitle>
              </SheetHeader>
              <Form method="POST" className="border-b pb-5 border-gray-400">
                <input type="hidden" name="postId" value={post._id} />
                <input type="hidden" name="slug" value={slug} />
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex flex-col md:flex-row gap-5 w-full">
                    <div
                      className={`"flex flex-1 flex-col gap-1 ${
                        userData.name != "" ? "hidden" : ""
                      }`}
                    >
                      <Label htmlFor="name">Name</Label>
                      <Input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        defaultValue={userData.name}
                      />
                    </div>

                    <div
                      className={`"flex flex-1 flex-col gap-1 ${
                        userData.email != "" ? "hidden" : ""
                      }`}
                    >
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        placeholder=""
                        defaultValue={userData.email}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label htmlFor="comment">Comment</Label>
                    <Textarea name="comment" placeholder="Your comment" />
                  </div>
                </div>

                <SheetFooter>
                  <Button type="submit">Comment</Button>
                </SheetFooter>
              </Form>

              <div className="grid gap-4 py-4">
                {comments.length === 0 && (
                  <p className="text-center">No comments yet</p>
                )}
                {comments.map((comment) => (
                  <div key={comment._id} className="flex flex-col">
                    <div className="flex flex-col">
                      <p className="font-bold">{comment.name}</p>
                      <p className="ml-3 text-sm">{comment.comment}</p>
                    </div>
                    <p className="ml-auto text-sm text-gray-500">
                      {moment(comment.createdAt).format("MMM DD, YYYY - H:m a")}
                    </p>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div>
          <ShareIcon onClick={handleShare} className="text-gray-500" />
        </div>
      </section>

      <section className="flex gap-3 overflow-x-auto mb-5 items-center w-full justify-center">
        {post.categories.map((category, index) => (
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
            forClients={true}
            readOnly={true}
            value={JSON.parse(post?.content)}
            initialValue={JSON.parse(post?.content)}
          />
        )}
      </ClientOnly>
    </PublicDetailLayout>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const comment = formData.get("comment") as string;
  const postId = formData.get("postId") as string;
  const slug = formData.get("slug") as string;

  const commentController = new CommentController(request);
  return await commentController.createComment({
    postId,
    name,
    email,
    comment,
    slug,
  });
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { slug } = params as { slug: string };

  const postController = new PostController(request);
  const post = await postController.getPostBySlug(slug);

  const commentController = new CommentController(request);
  const comments = await commentController.getCommentsByPost(post._id);

  return { post, slug, comments };
};

export const meta: MetaFunction = ({ data }) => {
  const post = data?.post as PostDocument;
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
      content: post?.featureImage?.url,
    },
    { name: "og:url", content: "https://tinyblogger.vercel.app" },
  ];
};
