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

const Update = () => {
  const editorCore = useRef(null);
  const [content, setContent] = useState("");

  const handleSave = useCallback(async () => {
    const savedData = await editorCore.current.save();
    console.log(savedData);
  }, []);

  return (
    <ClientOnly
      fallback={
        <div className="mx-auto w-[80%] py-10">
          <h1 className="text-center text-3xl font-bold">New Blog</h1>
        </div>
      }
    >
      {() => (
        <div className="mx-auto w-[80%] py-10">
          <h1 className="mb-5 text-center text-3xl font-bold">New Blog</h1>

          <Form method="post">
            <textarea
              readOnly={true}
              name="content"
              value={content}
              className="hidden"
            />
            <InputField
              name="title"
              label="Title"
              required={true}
              type="text"
              // value={actionData?.email}
            />

            <InputField
              name="description"
              label="Description"
              required={true}
              type="text"
            />

            <div className="">
              <label
                htmlFor="content"
                className="mb-2 block text-lg font-semibold text-gray-700"
              >
                Content
              </label>

              <CKEditorCustom onChange={(data) => setContent(data)} />
            </div>

            {/* <p onClick={() => handleSave()}>Submit</p> */}
            <p className="mt-11">
              <Button label="Create Post" type="submit" />
            </p>
          </Form>
        </div>
      )}
    </ClientOnly>
  );
};

export default Update;
