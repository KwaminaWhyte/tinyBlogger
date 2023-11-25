import type { MetaFunction } from "@remix-run/node";
import PublicLayout from "~/components/layouts/public";
import { Button } from "~/components/ui/button";

const posts = [
  {
    title: "Google Just Showed Us the Future of Gaming",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
    image: "https://picsum.photos/200",
  },
  {
    title: "How a limitless Internet Blinds Us to the Real World",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
    image: "https://picsum.photos/200",
  },
  {
    title: "post 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
    image: "https://picsum.photos/200",
  },
  {
    title: "Orgernize the Content Moderators",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
    image: "https://picsum.photos/200",
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
    image: "https://picsum.photos/200",
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
    image: "https://picsum.photos/200",
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
    image: "https://picsum.photos/200",
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
    image: "https://picsum.photos/200",
  },
];

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

      <section className="">
        <div className="flex border-b-4 border-gray-300">
          <h2 className="underline underline-offset-8 ">Featured </h2>
        </div>

        <div className="flex mt-11 gap-3 ">
          <div className="w-[65%] flex gap-3">
            <div className="flex-1 gap-3 flex flex-col">
              <img
                src={posts[0].image}
                alt=""
                className="w-full h-60 object-cover"
              />

              <div className="flex-1">
                <p className="font-semibold text-xl">{posts[0].title}</p>
                <p className="text-gray-500 line-clamp-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus quas quod
                </p>

                <div className="mt-auto">
                  <p className="font-semibold">Erick Brentford</p>
                  <p className="text-gray-500">Mar 20, 2023 - 5 mins read</p>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col  justify-between ">
              {posts.slice(1, 3).map((post, index) => (
                <div key={index} className="flex gap-3">
                  <img src={post.image} alt="" className="w-44 object-cover" />

                  <div className="flex flex-col gap-3 flex-1">
                    <p className="font-semibold">{post.title}</p>
                    <p>sak fashgoas gadsogh agiaiogh</p>

                    <div className="mt-auto ">
                      <p className="font-semibold mt-auto">Erick Brentford</p>
                      <p className="text-gray-500">
                        Mar 20, 2023 - 5 mins read
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-[35%] flex justify-between flex-col gap-3">
            {posts.slice(3, 6).map((post, index) => (
              <div key={index} className="flex gap-3">
                <img src={post.image} alt="" className="w-32 object-cover" />

                <div className="flex flex-col gap-3 flex-1">
                  <p className="font-semibold">{post.title}</p>

                  <div className="mt-auto">
                    <p className="font-semibold ">Erick Brentford</p>
                    <p className="text-gray-500 ">Mar 20, 2023 - 5 mins read</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="min-h-screen mt-24">
        <div className="flex border-b-4 border-gray-300">
          <div className="w-[65%] ">
            <h2 className="underline underline-offset-8 ">Latest Posts </h2>
          </div>
          <div className="w-[35%] ">
            <h2 className="underline underline-offset-8 ">Popular Posts </h2>
          </div>
        </div>

        <div className="flex mt-11 gap-5">
          <div className="w-[65%] gap-6 grid grid-cols-2">
            {posts.map((post, index) => (
              <div className="flex-1 gap-3 flex flex-col" key={index}>
                <img
                  src={posts[0].image}
                  alt=""
                  className="w-full h-60 object-cover"
                />

                <div className="flex-1">
                  <p className="font-semibold text-xl">{posts[0].title}</p>
                  <p className="text-gray-500 line-clamp-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatibus quas quod
                  </p>

                  <div className="mt-auto">
                    <p className="font-semibold">Erick Brentford</p>
                    <p className="text-gray-500">Mar 20, 2023 - 5 mins read</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-[35%] flex flex-col gap-3">
            {posts.slice(0, 5).map((post, index) => (
              <div key={index} className="flex gap-6 ">
                <p className="font-semibold text-3xl text-gray-400 w-11">{`0${
                  index + 1
                }`}</p>
                <div>
                  <p>{post.title}</p>
                  <div className="mt-auto">
                    <p className="font-semibold">Erick Brentford</p>
                    <p className="text-gray-500">Mar 20, 2023 - 5 mins read</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
