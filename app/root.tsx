import { type ReactNode } from "react";
import { type LinksFunction, type MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import NavigationBar from "./components/NavigationBar";
import style from "./tailwind.css";

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

export const meta: MetaFunction = () => {
  return {
    title: "tinyBlog",
    description: "tinyBlog. The best :)",
  };
};

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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
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
  return (
    <>
      <NavigationBar />

      <main className="flex min-h-screen flex-col bg-slate-50 pt-20">
        {children}
      </main>
    </>
  );
};
