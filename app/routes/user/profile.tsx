import React from "react";
import { type LoaderArgs, redirect } from "@remix-run/node";
import { getSession } from "~/utils/session.server";

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("auth_session")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/auth");
  }
  return {};
}

function profile() {
  return <div>profile</div>;
}

export default profile;
