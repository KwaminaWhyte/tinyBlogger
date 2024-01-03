import { Form, Link, NavLink, useNavigate } from "@remix-run/react";
import React, { type ReactNode } from "react";
import { SearchIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

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
        <nav className="md:w-[85%] w-[96%] gap-3 mx-auto flex justify-between items-center ">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="font-bold text-purple-700 hover:text-black montage-font text-lg md:text-xl"
            >
              Blogger.
            </Link>
          </div>

          <Form
            onSubmit={(e) => {
              e.preventDefault();
              return navigate(`/search?query=${e.target.query.value}`);
            }}
            className="flex flex-1 gap-2 md:min-w-72 items-center bg-gray-100 rounded-lg px-3 py-2"
          >
            <SearchIcon className="text-gray-400 hidden md:flex" />
            <input
              name="query"
              defaultValue={query}
              className="outline-none flex-1 border-none active:outline-none bg-transparent active:border-none"
              placeholder="Search..."
            />
          </Form>

          <Sheet>
            <SheetTrigger asChild>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <p>contents</p>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <div className="gap-3 hidden md:flex">
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
        className={`md:w-[80%] w-[93%] flex flex-col mt-14 mb-8 mx-auto bg-red-500" ${className}`}
      >
        {children}
      </main>

      <footer className="md:w-[75%] w-[96%] mx-auto mt-11">
        <p>Footer</p>
      </footer>
    </div>
  );
}
