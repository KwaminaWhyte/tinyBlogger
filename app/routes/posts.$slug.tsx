import {
  type MetaFunction,
  type LoaderFunction,
  type ActionFunction,
} from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import moment from "moment";
import PostController from "~/server/controllers/PostController";
import { CommentIcon, EyeIcon, ShareIcon } from "~/components/icons";
import type { PostDocument } from "~/server/types";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Sheet,
  SheetContent,
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
  const submit = useSubmit();
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
        title: `${post?.title} | Penrobes`,
        text: `${post?.description} | Penrobes`,
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
            <p>{post.views.length}</p>
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
                <input type="hidden" name="actionType" value="comment" />
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
                  <div
                    key={comment._id}
                    className="flex flex-col border-b pb-2 border-muted"
                  >
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

          <div className="flex gap-1 items-center cursor-pointer">
            {post?.likes?.includes(userData.email) ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
              </svg>
            ) : (
              <svg
                onClick={() =>
                  submit(
                    {
                      actionType: "like",
                      postId: post?._id,
                      name: userData.name,
                      email: userData.email,
                    },
                    {
                      method: "POST",
                    }
                  )
                }
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                />
              </svg>
            )}

            <p>{post.likes.length}</p>
          </div>
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
  const actionType = formData.get("actionType") as string;

  if (actionType == "comment") {
    const commentController = new CommentController(request);
    return await commentController.createComment({
      postId,
      name,
      email,
      comment,
      slug,
    });
  } else if (actionType == "like") {
    const postController = new PostController(request);
    return await postController.likePost({
      postId,
      email,
    });
  } else {
    return true;
  }
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { slug } = params as { slug: string };

  const postController = new PostController(request);
  const post = await postController.getPostBySlug(slug);
  await postController.updateViews({ postId: post?._id as string });

  const commentController = new CommentController(request);
  const comments = await commentController.getCommentsByPost(post._id);

  return { post, slug, comments };
};

export const meta: MetaFunction = ({ data }) => {
  const post = data?.post as PostDocument;
  return [
    { title: `${post?.title} | Penrobes` },
    {
      name: "description",
      content: post?.description,
    },
    { name: "og:title", content: `${post?.title} | Penrobes` },
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
