import { useState, useEffect } from "react";
import { type ActionArgs, type LoaderArgs, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import Button from "~/components/Button";
import InputField from "~/components/InputField";
import { getSession, register } from "~/utils/session.server";
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

  let data = register({
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
  return redirect("/verify_email");
  // return data;
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
  const [inputError, setInputError] = useState({});
  let actionData = useActionData();

  useEffect(() => {
    setInputError(actionData);
  }, [actionData]);

  return (
    <div className="mx-auto box-border w-[90%] md:w-[40%]">
      <h1 className="text-3xl font-bold">Registration</h1>

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
          // required={true}
          type="email"
          value={actionData?.email}
          error={inputError?.email}
        />

        <InputField
          name="password"
          label="Password"
          // required={true}
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
          <Button label="Sign Up" type="submit" />
        </div>
      </Form>

      <Link
        to="/auth"
        className="inline-block align-baseline text-sm font-bold text-gray-500 hover:text-gray-800 hover:underline"
      >
        Already have an Account?{" "}
      </Link>
    </div>
  );
}

export default Register;
