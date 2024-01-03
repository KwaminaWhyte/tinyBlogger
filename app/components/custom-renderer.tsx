import React from "react";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { ClientOnly } from "remix-utils/client-only";

export default function CustomRenderer({ content }: { content: any }) {
  return (
    <ClientOnly fallback={<p className="text-center">Loading content</p>}>
      {() => (
        <RichText
          content={content}
          renderers={{
            h1: ({ children }) => (
              <h1 className="md:text-6xl my-4 text-3xl font-bold montserrat-font">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="md:text-5xl my-3 text-2xl font-bold montserrat-font">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="md:text-4xl my-2 text-2xl font-bold montserrat-font">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="my-1.5 md:text-3xl text-xl font-bold montserrat-font">
                {children}
              </h4>
            ),
            h5: ({ children }) => (
              <h4 className="my-1 md:text-2xl text-lg font-bold montserrat-font">
                {children}
              </h4>
            ),
            h6: ({ children }) => (
              <h4 className="my-0.5 md:text-xl text-base font-bold montserrat-font">
                {children}
              </h4>
            ),
            bold: ({ children }) => <strong>{children}</strong>,
            p: ({ children }) => <p className="my-3">{children}</p>,
            ol: ({ children }) => <ol className="my-3 ml-2">{children}</ol>,
            ul: ({ children }) => <ul className="my-3 ml-2">{children}</ul>,
            li: ({ children }) => <li className="my-1"> - {children}</li>,
            a: ({ children, href }) => (
              <a
                className="text-purple-600 hover:text-purple-800 underline underline-offset-2 transition-all duration-150"
                href={href}
                target="_black"
              >
                {children}
              </a>
            ),
            code: ({ children }) => (
              <code className="rounded-md bg-gray-200 p-1 text-sm text-wrap">
                {children}
              </code>
            ),
            blockquote: ({ children }) => (
              <blockquote className="my-3 border-l-2 border-purple-800 pl-4">
                {children}
              </blockquote>
            ),
            code_block: ({ children }) => (
              <pre className="code-block my-3 bg-gray-200 p-2 text-sm rounded-sm whitespace-break-spaces">
                {children}
              </pre>
            ),
            img: ({ src, title }) => (
              <img
                src={src}
                alt={title}
                className="rounded-sm w-[90%] mx-auto"
              />
            ),
          }}
        />
      )}
    </ClientOnly>
  );
}
