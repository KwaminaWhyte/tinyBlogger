import {
  type ActionFunction,
  type LoaderFunction,
  type MetaFunction,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { IoIosChatbubbles, IoIosHeart, IoIosShare } from "react-icons/io";
import moment from "moment";
import type { CommentType, PostType } from "~/utils/types";
import supabase from "~/utils/supabase";
import InputField from "~/components/InputField";
import TextArea from "~/components/TextArea";
import Button from "~/components/Button";
import { useEffect, useState } from "react";

export const meta: MetaFunction = ({ data }) => {
  return {
    title: `tinyBlogger | ${data?.blog?.title}`,
    description: `${data?.blog?.description}`,
    "og:image": `${data?.blog?.cover_image}`,
  };
};

export const action: ActionFunction = async ({ request }) => {
  // const session = await getSession(request.headers.get("Cookie"));
  // let user = session.get("auth_user");
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const content = formData.get("content");
  const blog_id = formData.get("blog_id");

  const { data, statusText, error, status } = await supabase
    .from("comments")
    .insert({
      name: name,
      email: email,
      content: content,
      blog_id: blog_id,
    })
    .select("*")
    .single();

  // console.log(data, statusText, error, status);

  // if (statusText === "Created") {
  //   return redirect(`/kwamina/blogs/${data?.slug}`);
  // }
  return { name: name, email: email };
  // error, status };
};

export const loader: LoaderFunction = async ({ params }) => {
  const { data: blog, error: blogError } = await supabase
    .from("blogs")
    .select("*, profile ( id, username, profile_img ) ")
    .eq("slug", params.slug)
    .single();

  const { data: comments, error: commentError } = await supabase
    .from("comments")
    .select("*")
    .eq("blog_id", blog?.id)
    .order("created_at", { ascending: false });

  return { blog, comments };
};

function Blog() {
  const { blog, comments } = useLoaderData();
  let actionData = useActionData();
  const [isAlready, setIsAlready] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  useEffect(() => {
    setCommentValue("");
    if (localStorage.getItem("name")) {
      setIsAlready(true);
    }

    if (actionData) {
      localStorage.setItem("name", actionData.name);
      localStorage.setItem("email", actionData.email);
    }
  }, [actionData]);

  return (
    <div className="flex w-full flex-col md:flex-row">
      <section className="my-5  border-gray-300  md:w-[60%] md:border-r ">
        <div className="min-h-screen px-3 md:px-8">
          <div className="flex items-center py-5">
            <img
              src={blog?.profile?.profile_img}
              className="mr-3 h-11 w-11 rounded-full object-cover"
              alt=""
            />
            <div>
              <p className="font-bold">{blog?.profile?.username}</p>
              <p className="text-sm">
                {moment(blog?.created_at).format("MMMM Do, YYYY")}
                {/* . 12 min read */}
              </p>
            </div>
          </div>

          <h1 className="my-3 text-justify text-3xl font-bold md:text-4xl">
            {blog?.title}
          </h1>
          <p className="text-xl md:text-2xl">{blog?.description}</p>

          <img
            src={blog?.cover_image}
            alt=""
            className="my-4 w-full rounded-md"
          />

          <section
            className="mt-11"
            dangerouslySetInnerHTML={{ __html: blog?.content }}
          />
        </div>

        <div className="sticky bottom-0 mt-11 flex h-14 items-center border-b border-t border-gray-300 bg-slate-50 px-6 text-gray-600 md:px-11">
          <div className="mr-5 flex">
            <IoIosHeart size={23} />
            <p className="ml-2">200</p>
          </div>

          <div className="flex">
            <IoIosChatbubbles size={23} />
            <p className="ml-2">30</p>
          </div>

          <IoIosShare size={23} className="ml-auto" />
        </div>

        <Form method="post" className="mx-auto mt-11 px-3 md:px-8">
          <input type="hidden" name="blog_id" value={blog?.id} />
          {isAlready ? (
            <>
              <input
                type="hidden"
                name="name"
                value={localStorage.getItem("name") || ""}
              />

              <input
                type="hidden"
                name="email"
                value={localStorage.getItem("email") || ""}
              />
            </>
          ) : (
            <>
              <InputField name="name" label="Name" type="text" />

              <InputField name="email" label="Email Address" type="email" />
            </>
          )}

          <TextArea
            label="Content"
            name="content"
            defaultValue={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          <Button label="Comment" type="submit" />
        </Form>

        <div className="px-3 py-4 md:px-8">
          <p className="font-bold">Comments ({comments?.length})</p>

          <div className="mt-6">
            {comments?.map((comment: CommentType) => (
              <div key={comment?.id} className="my-3">
                <div className="flex">
                  <img src="" className="mr-3 h-11 w-11 rounded-full" alt="" />
                  <div>
                    <p className="font-bold">{comment?.name}</p>
                    <p className="text-sm">
                      {moment(comment?.created_at).format("MMMM Do, YYYY")}
                    </p>
                  </div>
                </div>
                <p className="ml-4">{comment?.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="my-5 px-3 md:w-[40%] md:px-8">
        <p>asfasf</p>
      </section>
    </div>
  );
}

export default Blog;
