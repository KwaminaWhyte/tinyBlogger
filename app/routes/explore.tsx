import React from "react";
import PublicLayout from "~/layouts/public";

export default function Explore() {
  return (
    <PublicLayout>
      <p>Explore</p>
    </PublicLayout>
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: "Penrobes -  Explore" },
    {
      name: "description",
      content: "Blog about anything and everything",
    },
    { property: "og:title", content: "Penrobes" },
    {
      name: "og:description",
      content: "Penrobes Blog about anything and everything",
    },
    {
      name: "og:image",
      content:
        "https://tinyblogger.vercel.app/build/_assets/Penrodes_icon_logo-19-5CJYJWAK.png",
    },
    { name: "og:url", content: "" },
  ];
};
