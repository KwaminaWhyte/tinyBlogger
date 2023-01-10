import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import InputField from "~/components/InputField";
import { getSession, register } from "~/utils/session.server";

export async function action({ request }: ActionArgs) {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");

  let user = register({ email, password });

  return user;
}

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("auth_session")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/");
  }
  return {};
}

function Register() {
  let actionData = useActionData();
  console.log(actionData);
  return (
    <div className="mx-auto w-[60%]">
      <h1 className="text-2xl font-bold">Registration Page</h1>

      <Form
        method="post"
        className="my-9 rounded bg-white px-8 pt-6 pb-8 shadow-md"
      >
        <InputField
          name="email"
          label="Email"
          required={true}
          type="email"
          value={actionData?.email}
        />

        <InputField
          name="password"
          label="Password"
          required={true}
          type="password"
          value={actionData?.password}
        />

        <div className="flex items-center justify-between">
          <button
            className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="submit"
          >
            Sign Up
          </button>
          <Link
            to="#"
            className="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
          >
            Forgot Password?
          </Link>
        </div>
      </Form>

      <Link
        to="/auth"
        className="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
      >
        Already have an Account?{" "}
      </Link>
    </div>
  );
}

export default Register;
