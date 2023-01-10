import { useRef, useCallback } from "react";
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
  const content = formData.get("markdown");

  let data = {
    slug,
    title,
    description,
    content,
  };

  return redirect("/posts/admin");
};

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

const NewBLog = () => {
  const editorCore = useRef(null);
  const handleSave = useCallback(async () => {
    const savedData = await editorCore.current.save();
    console.log(savedData);
  }, []);

  return (
    <ClientOnly
      fallback={
        <div className="w-full p-6">
          <h1 className="text-center text-3xl font-bold">New BLog</h1>
        </div>
      }
    >
      {() => (
        <div className="mx-auto w-[80%] py-10">
          <h1 className="text-center text-3xl font-bold">New BLog</h1>

          <Form method="post">
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

            <div className="">
              <label
                htmlFor="markdown"
                className="mb-2 block text-lg font-semibold text-gray-700"
              >
                Content
              </label>

              <CKEditorCustom
                onChange={(data) => console.log(data, "from new blog page!")}
              />
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
