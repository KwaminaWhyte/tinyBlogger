import { Form, Link, NavLink, useNavigate } from "@remix-run/react";
import React, { useState, type ReactNode } from "react";
import { SearchIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Moon, Sun } from "lucide-react";
import { Theme, useTheme } from "remix-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";
import axios from "axios";
import type { PostDocument } from "~/server/types";
import moment from "moment";
import Footer from "./footer";
import logo from "~/assets/Penrodes_icon_logo-19.png";

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
  const [, setTheme] = useTheme();
  const [queryy, setQuery] = useState(query);
  const [postsResults, setPostsResults] = useState([]);

  return (
    <div className="flex flex-col">
      <div className="h-16 backdrop-blur-md bg-white/50 dark:bg-background/50 z-50 flex w-full gap-3 fixed top-0 left-0 right-0 items-center">
        <nav className="md:w-[85%] w-[96%] gap-3 mx-auto flex justify-between items-center ">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="font-bold text-purple-700 dark:text-purple-500 hover:text-black montage-font text-lg md:text-xl"
            >
              <img src={logo} alt="" className=" h-10" />
            </Link>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto items-center"
              >
                <SearchIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[725px] top-[16%] translate-y-[-8%]">
              <DialogHeader>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    return navigate(`/search?query=${e.target.query.value}`);
                  }}
                  className="flex flex-1 mt-3 gap-2 w-full items-center bg-gray-100  dark:bg-muted rounded-lg px-3 py-2"
                >
                  <SearchIcon className="text-gray-400 hidden md:flex" />
                  <input
                    name="query"
                    defaultValue={queryy}
                    className="outline-none flex-1 border-none active:outline-none bg-transparent active:border-none"
                    placeholder="Search..."
                    onChange={(e) => {
                      setQuery(e.target.value);
                      axios
                        .get(`/api/search?query=${e.target.value}`)
                        .then((res) => {
                          setPostsResults(res.data.posts);
                        });
                    }}
                    autoFocus
                  />
                </Form>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {postsResults.map((post: PostDocument, index) => (
                  <Link
                    to={`/posts/${post?.slug}`}
                    key={index}
                    className="flex gap-3 flex-1"
                  >
                    <img
                      src={
                        post?.featureImage?.url
                          ? post?.featureImage?.url
                          : "https://th.bing.com/th/id/R.20d3e94846b0317ba981e9b4d3ecdabb?rik=wRXoSyZgG3cbIA&pid=ImgRaw&r=0"
                      }
                      alt=""
                      className="w-44 md:h-24 object-cover bg-gray-100 rounded-sm"
                    />

                    <div className="flex flex-col gap-3 flex-1">
                      <p className="font-semibold">{post.title}</p>
                      <p className="text-gray-600 line-clamp-2">
                        {post?.description}
                      </p>
                      <div className="mt-auto flex flex-col">
                        {/* <p className="font-semibold ">{post?.createdBy?.name}</p> */}
                        <p className="text-gray-500 ml-auto text-xs">
                          {moment(post?.createdAt).format("MMM DD, YYYY")}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <div className="gap-3 items-center flex">
            <Sheet>
              <SheetTrigger asChild className="">
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
              <SheetContent side="left" className="md:max-w-[600px] w-screen">
                <SheetHeader>
                  <SheetTitle>Penrobes</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4 pl-5">
                  {[
                    {
                      category: "Section 1",
                      children: [
                        { label: "item 1", path: "/" },
                        { label: "About", path: "/about" },
                      ],
                    },
                    {
                      category: "Section 2",
                      children: [
                        { label: "item 1", path: "/" },
                        { label: "item 2", path: "/about" },
                        { label: "item 3", path: "/about" },
                        { label: "item 4", path: "/about" },
                        { label: "item 5", path: "/about" },
                      ],
                    },

                    {
                      category: "Secction 3",
                      children: [
                        { label: "item 1", path: "/" },
                        { label: "item 2", path: "/about" },
                        { label: "item 3", path: "/about" },
                      ],
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="border-b border-muted pb-5 flex flex-col gap-3"
                    >
                      <p className="font-bold text-lg">{item.category}</p>

                      <div className="flex flex-col">
                        {item.children.map((child) => (
                          <NavLink
                            key={index}
                            to={child.path}
                            // className={({ isActive }) =>
                            //   isActive
                            //     ? "text-black dark:text-primary font-semibold hover:text-gray-500"
                            //     : "text-gray-800 hover:text-gray-600"
                            // }
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme(Theme.LIGHT)}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme(Theme.DARK)}>
                  Dark
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>

      <main
        className={`md:w-[85%] min-h-screen w-[93%] flex flex-col mt-14 mb-8 mx-auto bg-red-500" ${className}`}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
