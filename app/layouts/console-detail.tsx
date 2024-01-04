import { Link, NavLink } from "@remix-run/react";
import React, { type ReactNode } from "react";

export default function ConsoleDetailLayout({
  children,
  className,
  rightContent,
}: {
  children: ReactNode;
  className?: string;
  rightContent?: ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="md:w-[75%] w-[96%] mx-auto h-16 backdrop-blur-md bg-white/50 z-50 flex gap-3 fixed top-0 left-0 right-0 items-center">
        <nav className="flex justify-between items-center w-full">
          <Link
            to="/"
            className="font-bold text-purple-700 hover:text-black montage-font text-xl"
          >
            Blogger.
          </Link>

          {rightContent}
        </nav>
      </div>

      <main
        className={`md:w-[75%] w-[96%] flex flex-col mt-20 mb-8 mx-auto bg-red-500" ${className}`}
      >
        {children}
      </main>
    </div>
  );
}
