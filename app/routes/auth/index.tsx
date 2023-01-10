import { Form, Link, useActionData } from "@remix-run/react";
import { type ActionArgs, type LoaderArgs, redirect } from "@remix-run/node";
import InputField from "~/components/InputField";
import { createUserSession, getSession, login } from "~/utils/session.server";
import Button from "~/components/Button";

export async function action({ request }: ActionArgs) {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let data = {
    email,
    password,
    redirectTo: "/",
  };

  let session = await login(data);
  console.log(session);
  return await createUserSession(session, "/");
}

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("auth_session")) {
    return redirect("/");
  }
  return {};
}

function Login() {
  let actionData = useActionData();
  console.log(actionData);

  return (
    <div className="mx-auto w-[60%]">
      <h1 className="text-2xl font-bold">Login Page</h1>

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
          <Button label="Sign In" type="submit" />
          <Link
            to="#"
            className="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
          >
            Forgot Password?
          </Link>
        </div>
      </Form>

      <Link
        to="/auth/register"
        className="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
      >
        You Don't have an Account?
      </Link>
    </div>
  );
}

export default Login;
