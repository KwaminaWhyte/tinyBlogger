import { Outlet } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  return "asfjbasuf ";
};

export const meta: MetaFunction = () => {
  return {
    title: "tinyBlogger | Sign in or Register a new Account",
    description: "Create a new account or signin to continue",
  };
};

function Auth() {
  return (
    <div className="flex min-h-screen flex-col justify-center">
      {/* <h1 className="text-center">Auth Page</h1> */}

      <Outlet />
    </div>
  );
}

export default Auth;
