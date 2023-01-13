import { createCookieSessionStorage, redirect } from "@remix-run/node";
import supabase from "./supabase";
import type { Session } from "@supabase/supabase-js";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
  redirectTo: string;
}) {
  const {
    data: { session },
    error,
  } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.log(error);
    return error;
  }

  console.log(session);
  return session;
}

export async function register({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    console.log(error);
    return error;
  }

  console.log({ ...data?.user });
  return { ...data.user };
}

// const { SESSION_SECRET } = process.env;
// if (!SESSION_SECRET) throw new Error("SESSION_SECRET is not set!");

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: true,
      httpOnly: true,
      path: "/",
      //   sameSite: "lax",
      secrets: ["s3cret1"],
    },
  });
export { getSession, commitSession, destroySession };

export async function createUserSession(
  auth_session: Session,
  redirectTo: string
) {
  const session = await getSession();
  session.set("auth_session", auth_session.access_token);
  session.set("auth_user", auth_session.user);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export const checkUserProfile = async (request: any, returnData: any) => {
  const session = await getSession(request.headers.get("Cookie"));
  let user = session.get("auth_user");

  const { data } = await supabase
    .from("profile")
    .select("*")
    .eq("auth_id", user?.id)
    .single();

  if (data != null) {
    return returnData;
  }

  return redirect("/user/profile/create");
};
