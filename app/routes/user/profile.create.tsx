import React from "react";
import { redirect, type ActionArgs } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import InputField from "~/components/InputField";
import Button from "~/components/Button";
import supabase from "~/utils/supabase";
import { getSession } from "~/utils/session.server";

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  let user = session.get("auth_user");

  let formData = await request.formData();
  let username = formData.get("username");
  // let password = formData.get("password");

  const { data, statusText, error, status } = await supabase
    .from("profile")
    .insert({
      username: username,
      auth_id: user?.id,
      profile_img: "https://picsum.photos/200/300",
    })
    .select("*")
    .single();

  if (statusText === "Created") {
    return redirect(`/user/profile`);
  }
}

function update() {
  return (
    <div>
      <Form
        method="post"
        className="my-9 rounded-xl bg-white px-8 pt-6 pb-8 shadow-md"
      >
        <div className="mb-2">
          {/* {actionData?.message && (
            <p className="text-lg font-semibold text-red-500">
              {actionData?.message}
            </p>
          )} */}
        </div>
        <InputField
          name="username"
          label="Username"
          // required
          type="text"
          // value={actionData?.email}
          // error={inputError?.email}
        />

        <div className="flex items-center justify-between">
          <Button label="Sign In" type="submit" loading={false} />
        </div>
      </Form>
    </div>
  );
}

export default update;
