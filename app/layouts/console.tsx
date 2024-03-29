import { Link, NavLink } from "@remix-run/react";
import React, { type ReactNode } from "react";
import { Toaster } from "~/components/ui/sonner";
import logo from "~/assets/Penrodes_icon_logo-19.png";

export default function ConsoleLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex flex-col">
      <div className="h-16 backdrop-blur-md bg-background/50 z-50 flex gap-3 fixed top-0 left-0 right-0 items-center">
        <nav className="flex md:w-[75%] w-[96%] mx-auto justify-between items-center ">
          <Link
            to="/console"
            className="font-bold text-purple-700 hover:text-black montage-font text-xl"
          >
            <img src={logo} alt="" className=" h-10" />
          </Link>

          <div className="gap-3 flex">
            {[
              { end: true, path: "/console", label: "Dashboard" },
              {
                end: true,
                path: "/console/posts/create",
                label: "Create Post",
              },
              {
                end: true,
                path: "/console/categories",
                label: "Categories",
              },
              { end: false, path: "/console/comments", label: "Comments" },
              // { path: "/about", label: "About" },
            ].map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  isActive
                    ? " font-semibold hover:text-gray-600"
                    : " hover:text-gray-600"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>

      <main
        className={`md:w-[75%] w-[96%] flex flex-col mt-20 mb-8 mx-auto bg-red-500" ${className}`}
      >
        {children}
      </main>

      <Toaster />
    </div>
  );
}
