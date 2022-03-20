import { Outlet } from "remix";
import type { LoaderFunction, MetaFunction } from "remix";

export const loader: LoaderFunction = async () => {
  return "asfjbasuf ";
};

export const meta: MetaFunction = () => {
  return {
    title: "tinyBlog | Sign in or Register a new Account",
    description: "Create a new account or signin to continue",
  };
};

function Auth() {
  return (
    <div>
      <h1>Auth Page</h1>

      <Outlet />
    </div>
  );
}

export default Auth;
