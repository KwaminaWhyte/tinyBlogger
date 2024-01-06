import { useNavigate } from "@remix-run/react";
import React, { type ReactNode } from "react";
import { Toaster } from "~/components/ui/sonner";

export default function ConsoleDetailLayout({
  children,
  className,
  rightContent,
  title,
}: {
  children: ReactNode;
  className?: string;
  rightContent?: ReactNode;
  title?: string;
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <div className="h-16 backdrop-blur-md bg-white/50 z-50 flex gap-3 fixed top-0 left-0 right-0 items-center">
        <nav className="md:w-[75%] w-[96%] mx-auto flex justify-between items-center ">
          <div className="flex items-center gap-3">
            <svg
              onClick={() => navigate(-1)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 p-1 rounded-sm bg-gray-100 cursor-pointer text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>

            <p className="font-semibold text-base">{title}</p>
          </div>

          {rightContent}
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
