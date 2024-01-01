import { type MetaFunction, type LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import PublicLayout from "~/layouts/public";
import moment from "moment";
import { ClientOnly } from "remix-utils/client-only";
import { RichText } from "@graphcms/rich-text-react-renderer";
import PostController from "~/server/controllers/PostController";
import { CommentIcon, ShareIcon, ThumbUpIcon } from "~/components/icons";
import type { PostDocument } from "~/server/types";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Sheet,
  SheetClose,
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

// const comments = [
//   {
//     id: 1,
//     name: "John Doe",
//     comment:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, voluptatibus.",
//     createdAt: "2021-10-10",
//   },
//   {
//     id: 2,
//     name: "John Doe",
//     comment:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, voluptatibus.",
//     createdAt: "2021-10-10",
//   },
//   {
//     id: 3,
//     name: "John Doe",
//     comment:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, voluptatibus.",
//     createdAt: "2021-10-10",
//   },
//   {
//     id: 4,
//     name: "John Doe",
//     comment:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, voluptatibus.",
//     createdAt: "2021-10-10",
//   },
// ];

export default function Blog() {
  const { post, slug, comments } = useLoaderData<{
    slug: string;
    post: PostDocument;
    comments: any[];
  }>();

  return (
    <PublicDetailLayout>
      <section className="flex gap-5 flex-col my-11">
        <h1 className="md:text-6xl text-3xl text-center md:w-[70%] mx-auto">
          {post?.title}
        </h1>
        <p className="text-center md:w-[70%] mx-auto">{post?.description}</p>
        <p className="ml-auto ">
          {moment(post.createdAt).format("MMM DD, YYYY")}
        </p>
      </section>

      <section className="border-y flex items-center justify-between w-full md:w-[50%] gap-7 border-gray-200 py-3 mx-auto px-5">
        <div className="flex items-center gap-5">
          <div className="flex gap-1 items-center cursor-pointer">
            <ThumbUpIcon className="text-gray-500" />
            <p>3k</p>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <div className="flex gap-1 items-center cursor-pointer">
                <CommentIcon className="text-gray-500" />
                <p>123</p>
              </div>
            </SheetTrigger>
            <SheetContent className="md:min-w-[600px] w-[100vw]">
              <SheetHeader>
                <SheetTitle>Responses ({comments.length})</SheetTitle>
                <SheetDescription>
                  <Form className="border-b pb-5 border-gray-400">
                    <div className="flex flex-col gap-4 py-4">
                      <div className="flex flex-col md:flex-row gap-5 w-full">
                        <div className="flex flex-1 flex-col gap-1">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                          />
                        </div>

                        <div className="flex flex-1 flex-col gap-1">
                          <Label htmlFor="email">Email</Label>
                          <Input type="email" name="email" placeholder="" />
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
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                {comments.length === 0 && (
                  <p className="text-center">No comments yet</p>
                )}
                {comments.map((comment) => (
                  <div key={comment.id} className="flex flex-col">
                    <div className="flex flex-col">
                      <p className="font-bold">{comment.name}</p>
                      <p className="ml-3 text-sm">{comment.comment}</p>
                    </div>
                    <p className="ml-auto text-sm text-gray-500">
                      {moment(comment.createdAt).format("MMM DD, YYYY")}
                    </p>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div>
          <ShareIcon className="text-gray-500" />
        </div>
      </section>

      <img
        src={post?.coverImage?.url}
        alt=""
        className="my-5 w-full rounded-md"
      />

      <ClientOnly fallback={<p className="text-center">Loading content</p>}>
        {() => (
          <RichText
            content={post?.content?.raw.children}
            renderers={{
              h1: ({ children }) => (
                <h1 className="md:text-6xl my-4 text-3xl font-bold montserrat-font">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="md:text-5xl my-3 text-2xl font-bold montserrat-font">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="md:text-4xl my-2 text-2xl font-bold montserrat-font">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="my-1.5 md:text-3xl text-xl font-bold montserrat-font">
                  {children}
                </h4>
              ),
              h5: ({ children }) => (
                <h4 className="my-1 md:text-2xl text-lg font-bold montserrat-font">
                  {children}
                </h4>
              ),
              h6: ({ children }) => (
                <h4 className="my-0.5 md:text-xl text-base font-bold montserrat-font">
                  {children}
                </h4>
              ),
              bold: ({ children }) => <strong>{children}</strong>,
              p: ({ children }) => <p className="my-3">{children}</p>,
              ol: ({ children }) => <ol className="my-3 ml-2">{children}</ol>,
              ul: ({ children }) => <ul className="my-3 ml-2">{children}</ul>,
              li: ({ children }) => <li className="my-4"> - {children}</li>,
              a: ({ children, href }) => (
                <a
                  className="text-purple-600 hover:text-purple-800 underline underline-offset-2 transition-all duration-150"
                  href={href}
                  target="_black"
                >
                  {children}
                </a>
              ),
              code: ({ children }) => (
                <code className="rounded-md bg-gray-200 p-1 text-sm">
                  {children}
                </code>
              ),
              blockquote: ({ children }) => (
                <blockquote className="my-3 border-l-2 border-purple-800 pl-4">
                  {children}
                </blockquote>
              ),
              code_block: ({ children }) => (
                <pre className="code-block my-3 bg-gray-200 p-1 text-sm ">
                  {children}
                </pre>
              ),
              img: ({ src, title }) => (
                <img src={src} alt={title} srcset="" className="rounded-sm" />
              ),
            }}
          />
        )}
      </ClientOnly>
    </PublicDetailLayout>
  );
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { slug } = params as { slug: string };
  // const url = new URL(request.url);
  // const slug = url.searchParams.get("slug") as string;

  const postController = new PostController(request);
  const post = await postController.getPostBySlug(slug);
  console.log({ post });

  const commentController = new CommentController(request);
  const comments = await commentController.getCommentsByPost(post.id);

  return { post, slug, comments };
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
