import React from "react";
import PublicLayout from "~/components/layouts/public";

export default function Explore() {
  return (
    <PublicLayout>
      <p>Explore</p>
    </PublicLayout>
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: "Blogger. -  Explore" },
    {
      name: "description",
      content: "Blog about anything and everything",
    },
    { name: "og:title", content: "Blogger." },
    {
      name: "og:description",
      content: "Blogger. Blog about anything and everything",
    },
    {
      name: "og:image",
      content:
        "https://res.cloudinary.com/app-deity/image/upload/v1700324984/lnjfa1hco96qrbwu11oe.jpg",
    },
    { name: "og:url", content: "https://www.printmoney.money" },
  ];
};
