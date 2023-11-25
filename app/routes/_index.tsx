import type { MetaFunction } from "@remix-run/node";
import PublicLayout from "~/components/layouts/public";
import { Button } from "~/components/ui/button";

export default function Index() {
  return (
    <PublicLayout className=" min-h-screen">
      <section className="flex">
        <div className="w-[50%] flex flex-col justify-center gap-6">
          <h1 className="text-7xl">Welcome to Blogger.</h1>

          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias
            maxime reiciendis quae porro recusandae dolorum unde aut, illo
            error, voluptatibus obcaecati explicabo iste adipisci culpa quos
            earum doloremque, vitae maiores?
          </p>

          <Button>Explore</Button>
        </div>

        <div className="w-[50%]">
          <img
            src="https://static.vecteezy.com/system/resources/previews/007/783/955/original/online-education-illustration-concept-flat-illustration-isolated-on-white-background-vector.jpg"
            alt=""
            className="w-full"
          />
        </div>
      </section>

      <section className="min-h-screen">
        <h2>Featured </h2>
      </section>

      <section className="min-h-screen">
        <h2>Latest Posts</h2>
      </section>
    </PublicLayout>
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: "Blogger." },
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
