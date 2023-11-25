// app/sessions.ts
import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
  message: {
    title: string;
    description: string;
    status: string;
  };
};

const secret = process.env.SESSION_SECRET;
if (!secret) {
  throw new Error("No session secret provided");
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__falsh_session",
      httpOnly: true,
      maxAge: 1,
      path: "/",
      sameSite: "lax",
      secrets: [secret],
    },
  });

export { getSession, commitSession, destroySession };
