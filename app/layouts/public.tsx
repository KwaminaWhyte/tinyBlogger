import { Form, Link, NavLink, useNavigate } from "@remix-run/react";
import React, { type ReactNode } from "react";
import { SearchIcon } from "~/components/icons";

export default function PublicLayout({
  children,
  className,
  query,
}: {
  children: ReactNode;
  className?: string;
  query?: string;
}) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <div className="h-14 backdrop-blur-md bg-white/50 z-50 flex w-full gap-3 fixed top-0 left-0 right-0 items-center">
        <nav className="md:w-[85%] w-[96%] mx-auto flex justify-between items-center ">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="font-bold text-purple-700 hover:text-black montage-font text-lg md:text-xl"
            >
              Blogger.
            </Link>

            <Form
              onSubmit={(e) => {
                e.preventDefault();
                return navigate(`/search?query=${e.target.query.value}`);
              }}
              className="flex gap-2 flex-1 items-center bg-gray-100 rounded-lg px-3 py-2"
            >
              <SearchIcon className="text-gray-400" />
              <input
                name="query"
                defaultValue={query}
                className="outline-none border-none active:outline-none bg-transparent active:border-none"
                placeholder="Search..."
              />
            </Form>
          </div>

          <div className="gap-3 flex">
            {[
              { path: "/", label: "Home" },
              // { path: "/explore", label: "Explore" },
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
        className={`md:w-[85%] w-[96%] flex flex-col mt-14 mb-8 mx-auto bg-red-500" ${className}`}
      >
        {children}
      </main>

      {/* <footer className="md:w-[85%] w-[96%] mx-auto mt-11">
        <p>Footer</p>
      </footer> */}
    </div>
  );
}
