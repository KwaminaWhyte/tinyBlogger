import { useNavigate } from "@remix-run/react";
import React, { type ReactNode } from "react";
import { Toaster } from "~/components/ui/sonner";

export default function PublicDetailLayout({
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
      <div className="h-16 backdrop-blur-md bg-white/50 dark:bg-background/50 z-50 flex w-full gap-3 fixed top-0 left-0 right-0 items-center">
        <nav className="md:w-[75%] w-[96%] mx-auto flex justify-between items-center ">
          <div className="flex items-center gap-3">
            <svg
              onClick={() => navigate(-1)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 p-1 rounded-sm bg-muted cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>

            <p className="font-bold text-lg md:text-xl">Post Details</p>
          </div>
        </nav>
      </div>

      <main
        className={`md:w-[75%] w-[93%] flex flex-col mt-14 mb-8 mx-auto bg-red-500" ${className}`}
      >
        {children}
      </main>

      <Toaster />

      {/* <footer className="md:w-[75%] w-[96%] mx-auto mt-11">
        <p>Footer</p>
      </footer> */}
    </div>
  );
}
