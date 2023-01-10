import type { ReactNode } from "react";
import {
  type LinksFunction,
  type MetaFunction,
  type LoaderArgs,
  type ActionArgs,
  redirect,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { destroySession, getSession } from "./utils/session.server";
import style from "./tailwind.css";
import NavigationBar from "./components/NavigationBar";

export const links: LinksFunction = () => {
  return [
    // {
    //   rel: "icon",
    //   href: "/favicon.png",
    //   type: "image/png",
    // },
    {
      rel: "stylesheet",
      href: style,
    },
    // {
    //   rel: "preload",
    //   href: "/images/banner.jpg",
    //   as: "image",
    // },
  ];
};
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "tinyBlogger",
  description: "tinyBlogger. The best :)",
  "og:image": `https://www.logolynx.com/images/logolynx/d3/d346364714a1cb9a90e4841d8a7aede5.png`,
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("auth_session")) {
    return { isAuthenticated: true, user: session.get("auth_user") };
  }
  return { isAuthenticated: false, user: null };
}

export async function action({ request }: ActionArgs) {
  //   const { error } = await supabase.auth.signOut();

  const session = await getSession(request.headers.get("Cookie"));
  return redirect("?index", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

const Document = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

const Layout = ({ children }: { children: ReactNode }) => {
  let { isAuthenticated, user } = useLoaderData();

  return (
    <>
      <NavigationBar isAuthenticated={isAuthenticated} user={user} />

      <main className="flex min-h-screen flex-col bg-slate-50 pt-20">
        {children}
      </main>
    </>
  );
};
