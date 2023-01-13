import { Form, Link, useActionData } from "@remix-run/react";
import { useState, useEffect } from "react";
import { type ActionArgs, type LoaderArgs, redirect } from "@remix-run/node";
import InputField from "~/components/InputField";
import { createUserSession, getSession, login } from "~/utils/session.server";
import Button from "~/components/Button";

export async function action({ request }: ActionArgs) {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");

  let inputError = {};
  if (password == "") {
    inputError["password"] = "Password Field is required!";
  }
  if (email == "") {
    inputError["email"] = "Email Field is required!";
  }

  if (Object.keys(inputError).length != 0) {
    console.log(inputError);
    return inputError;
  }

  let data = await login({
    email,
    password,
  });

  if (data?.status == 400) {
    return {
      name: data.name,
      message: data.message,
      status: data.status,
    };
  }
  console.log(data, "front");
  return await createUserSession(data, "/user/profile");
}

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("auth_session")) {
    return redirect("/");
  }
  return {};
}

function Login() {
  const [inputError, setInputError] = useState({});
  let actionData = useActionData();

  useEffect(() => {
    setInputError(actionData);
  }, [actionData]);

  return (
    <div className="mx-auto box-border w-[90%] md:w-[40%]">
      <h1 className="text-3xl font-bold">Login</h1>

      <Form
        method="post"
        className="my-9 rounded-xl bg-white px-8 pt-6 pb-8 shadow-md"
      >
        <div className="mb-2">
          {actionData?.message && (
            <p className="text-lg font-semibold text-red-500">
              {actionData?.message}
            </p>
          )}
        </div>
        <InputField
          name="email"
          label="Email"
          // required
          type="email"
          value={actionData?.email}
          error={inputError?.email}
        />

        <InputField
          name="password"
          label="Password"
          // required
          type="password"
          value={actionData?.password}
          error={inputError?.password}
        />

        <div className="flex items-center justify-between">
          <Link
            to="#"
            className="inline-block align-baseline text-sm font-bold text-gray-500 hover:text-gray-800 hover:underline"
          >
            Forgot Password?
          </Link>

          <Button label="Sign In" type="submit" loading={false} />
        </div>
      </Form>

      <Link
        to="/auth/register"
        className="inline-block align-baseline text-sm font-bold text-gray-500 hover:text-gray-800 hover:underline"
      >
        You Don't have an Account?
      </Link>
    </div>
  );
}

export default Login;
