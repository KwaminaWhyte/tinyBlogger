import { useRef, useCallback } from "react";
import { ClientOnly } from "remix-utils";
import { Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import type {
  LoaderFunction,
  MetaFunction,
  ActionFunction,
} from "@remix-run/node";
import { getSession } from "~/utils/session.server";
import CKEditorCustom from "~/components/CKEditorCustom.client";

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
  return {};
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
        <div>
          <h1>New BLog</h1>
        </div>
      }
    >
      {() => (
        <div className="px-5 py-10">
          <h1>NewBLog</h1>

          <Form method="post">
            <p>
              <label>
                Post Title:{" "}
                <input type="text" name="title" className={inputClassName} />
              </label>
            </p>
            <p>
              <label>
                Post Slug:{" "}
                <input type="text" name="slug" className={inputClassName} />
              </label>
            </p>
            <div className="">
              <label htmlFor="markdown">Content</label>

              <CKEditorCustom
                onChange={(data) => console.log(data, "from new blog page!")}
              />
            </div>

            <p onClick={() => handleSave()}>Submit</p>
            <p className="text-right">
              <button
                type="submit"
                className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
              >
                Create Post
              </button>
            </p>
          </Form>
        </div>
      )}
    </ClientOnly>
  );
};

export default NewBLog;
