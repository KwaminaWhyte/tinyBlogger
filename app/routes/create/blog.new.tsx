import { useRef, useCallback, useEffect, useState } from "react";
import { ClientOnly } from "remix-utils";
import { Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import type { MetaFunction, ActionFunction, LoaderArgs } from "@remix-run/node";
import { getSession } from "~/utils/session.server";
import CKEditorCustom from "~/components/CKEditorCustom.client";
import InputField from "~/components/InputField";
import Button from "~/components/Button";

export const meta: MetaFunction = () => {
  return {
    title: "tinyBlogger | New Blog",
    description: "",
  };
};

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("auth_session")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/auth");
  }
  return { user: session.get("auth_user") };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const description = formData.get("description");
  const content = formData.get("content");

  let data = {
    slug,
    title,
    description,
    content,
  };
  console.log(data);

  return data;
  // return redirect("/posts/admin");
};

const NewBLog = () => {
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
              type="hidden"
              readOnly={true}
              name="content"
              value={content}
            />
            <InputField
              name="title"
              label="Title"
              required={true}
              type="text"
              // value={actionData?.email}
            />

            <InputField
              name="slug"
              label="Slug"
              required={true}
              type="text"
              // dissable
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
            <p className="text-right">
              <Button label="Create Post" type="submit" />
            </p>
          </Form>
        </div>
      )}
    </ClientOnly>
  );
};

export default NewBLog;
