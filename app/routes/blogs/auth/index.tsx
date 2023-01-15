import { useRef, useCallback, useEffect, useState } from "react";
import { ClientOnly } from "remix-utils";
import { Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import type { MetaFunction, ActionFunction, LoaderArgs } from "@remix-run/node";
import { checkUserProfile, getSession } from "~/utils/session.server";
import CKEditorCustom from "~/components/CKEditorCustom.client";
import InputField from "~/components/InputField";
import Button from "~/components/Button";
import supabase from "~/utils/supabase";
import { createSlug } from "~/utils/createSlug";
// contains all blogs of the logged in user
export const meta: MetaFunction = () => {
  return {
    title: "tinyBlogger | New Blog",
    description: "",
  };
};

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("auth_session")) {
    return redirect("/auth");
  }

  return await checkUserProfile(request, { user: session.get("auth_user") });
}

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  let user = session.get("auth_user");

  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const content = formData.get("content");

  const { data, statusText, error, status } = await supabase
    .from("blogs")
    .insert({
      title: title,
      description: description,
      slug: createSlug(title),
      content: content,
      user: user?.id,
      cover_image: "https://picsum.photos/200/300",
    })
    .select("*")
    .single();

  if (statusText === "Created") {
    return redirect(`/kwamina/blogs/${data?.slug}`);
  }
  return { error, status };
};

const Index = () => {
  const editorCore = useRef(null);
  const [content, setContent] = useState("");

  const handleSave = useCallback(async () => {
    const savedData = await editorCore.current.save();
    console.log(savedData);
  }, []);

  return (
    <div className="mx-auto w-[80%] py-10">
      <h1 className="mb-5 text-center text-3xl font-bold">My Blogs</h1>
    </div>
  );
};

// option to create new blog
// option to view blog
// option to view draft
// option to schedule blog
// option to publish blog
// option to delete blog
// option to edit blog

// filters
// option to view all published blogs
// option to view all scheduled blogs
// option to view all blogs by category
// option to view all blogs by tag
// option to view all blogs by date
// option to view all blogs by search
export default Index;
