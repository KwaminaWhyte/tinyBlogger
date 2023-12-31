import { Link, NavLink } from "@remix-run/react";
import React, { type ReactNode } from "react";

export default function ConsoleLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex flex-col">
      <div className="md:w-[85%] w-[96%] mx-auto h-20 backdrop-blur-md bg-white/50 z-50 flex gap-3 fixed top-0 left-0 right-0 items-center">
        <nav className="flex justify-between items-center w-full">
          <Link
            to="/"
            className="font-bold text-purple-700 hover:text-black montage-font text-xl"
          >
            Blogger.
          </Link>

          <div className="gap-3 flex">
            {[
              { path: "/console", label: "Dashboard" },
              { path: "/console/blogs/create", label: "Create" },
              // { path: "/about", label: "About" },
            ].map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "text-black font-semibold hover:text-gray-600"
                    : "text-gray-800 hover:text-gray-600"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>

      <main
        className={`md:w-[85%] w-[96%] flex flex-col mt-20 mb-8 mx-auto bg-red-500" ${className}`}
      >
        {children}
      </main>
    </div>
  );
}
