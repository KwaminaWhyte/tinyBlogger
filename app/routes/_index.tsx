import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import moment from "moment";
import PublicLayout from "~/layouts/public";
import PostController from "~/server/controllers/PostController";
import type { PostDocument } from "~/server/types";
import fullLogo from "~/assets/Penrodes_logo_Horizintal-16.png";

export default function Index() {
  const { featured, popularPosts, latest, categories } = useLoaderData<{
    featured: PostDocument[];
    popularPosts: PostDocument[];
    latest: PostDocument[];
    categories: any[];
  }>();

  return (
    <PublicLayout className=" min-h-screen gap-11">
      <section className="flex">
        <div className="md:w-[80%] mx-auto h-[35vh] md:my-auto flex flex-col justify-center gap-7">
          <img src={fullLogo} className="" alt="" />

          <p className="text-center md:text-justify">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias
            maxime reiciendis quae porro explicabo iste adipisci culpa quos
            earum doloremque, vitae maiores?
          </p>

          {/* <Link
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 rounded-md px-8"
            to="/explore"
          >
            Explore
          </Link> */}
        </div>

        {/* <div className="w-[50%] hidden md:block">
          <img
            src="https://static.vecteezy.com/system/resources/previews/007/783/955/original/online-education-illustration-concept-flat-illustration-isolated-on-white-background-vector.jpg"
            alt=""
            className="w-full rounded-sm"
          />
        </div> */}
      </section>

      <section className="md:flex hidden gap-3 overflow-x-auto">
        {categories.map((category, index) => (
          <Link
            to={`/categories/${category.slug}`}
            key={index}
            className="bg-slate-900 rounded-xl capitalize px-2 py-1 text-white border text-nowrap"
          >
            {category.title}
          </Link>
        ))}
      </section>

      <section className="">
        <div className="flex border-b-4 border-gray-300">
          <h2 className="underline underline-offset-8 ">Featured </h2>
        </div>

        <div className="flex mt-11 h-fit gap-3 flex-col md:flex-row ">
          <div className="md:w-[65%] w-full flex md:flex-row flex-col gap-3">
            <Link
              to={`/posts/${featured[0]?.slug}`}
              className="flex-1 gap-3 md:w-[65%] w-full flex flex-col"
            >
              <img
                src={
                  featured[0]?.featureImage?.url
                    ? featured[0]?.featureImage?.url
                    : "https://th.bing.com/th/id/R.20d3e94846b0317ba981e9b4d3ecdabb?rik=wRXoSyZgG3cbIA&pid=ImgRaw&r=0"
                }
                alt=""
                className="w-full h-60 object-cover bg-gray-100 rounded-sm"
              />

              <div className="flex-1 flex flex-col gap-2">
                <p className="font-semibold text-xl">{featured[0]?.title}</p>
                <p className="text-gray-600 line-clamp-2">
                  {featured[0]?.description}
                </p>

                <div className="mt-auto flex flex-col">
                  <p className="font-semibold">
                    {featured[0]?.createdBy?.name}
                  </p>
                  <p className="text-gray-500 ml-auto text-xs">
                    {moment(featured[0]?.createdAt).format("MMM DD, YYYY")}
                  </p>
                </div>
              </div>
            </Link>

            <div className="flex-1  gap-3 grid grid-rows-2 ">
              {featured.slice(1, 3).map((post, index) => (
                <Link
                  to={`/posts/${post?.slug}`}
                  key={index}
                  className="flex gap-3  flex-1"
                >
                  <img
                    src={
                      post?.featureImage?.url
                        ? post?.featureImage?.url
                        : "https://th.bing.com/th/id/R.20d3e94846b0317ba981e9b4d3ecdabb?rik=wRXoSyZgG3cbIA&pid=ImgRaw&r=0"
                    }
                    alt=""
                    className="w-44 h-32 md:h-full object-cover bg-gray-100 rounded-sm"
                  />

                  <div className="flex flex-col gap-2 flex-1">
                    <p className="font-semibold">{post.title}</p>
                    <p className="text-gray-600 line-clamp-2">
                      {post.description}
                    </p>

                    <div className="mt-auto flex flex-col">
                      {/* <p className="font-semibold mt-auto">{post?.createdBy?.name}</p> */}
                      <p className="text-gray-500 ml-auto text-xs">
                        {moment(post?.createdAt).format("MMM DD, YYYY")}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="md:w-[35%] w-full grid grid-rows-3 flex-col gap-3">
            {featured.slice(3, 6).map((post, index) => (
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
                  className="w-44 h-32 md:h-32 object-cover bg-gray-100 rounded-sm"
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
        </div>
      </section>

      <section className="min-h-screen flex gap-5 md:flex-row flex-col">
        <div className="flex md:w-[65%]  flex-col gap-3 ">
          <div className="w-full border-b-4 border-gray-300">
            <h2 className="underline underline-offset-8 ">Latest Posts </h2>
          </div>

          <div className="gap-6 grid grid-rows-1 md:grid-cols-2">
            {latest.map((post, index) => (
              <Link
                to={`/posts/${post?.slug}`}
                className="flex-1 gap-3 flex flex-col"
                key={index}
              >
                <img
                  src={
                    post?.featureImage?.url
                      ? post?.featureImage?.url
                      : "https://th.bing.com/th/id/R.20d3e94846b0317ba981e9b4d3ecdabb?rik=wRXoSyZgG3cbIA&pid=ImgRaw&r=0"
                  }
                  alt=""
                  className="w-full h-40 object-cover bg-gray-100 rounded-sm"
                />

                <div className="flex-1">
                  <p className="font-semibold text-xl">{post.title}</p>
                  <p className="text-gray-500 line-clamp-2">
                    {post.description}
                  </p>

                  <div className="mt-auto flex flex-col">
                    <p className="font-semibold">{post?.createdBy?.name}</p>
                    <p className="text-gray-500 ml-auto text-xs">
                      {moment(post?.createdAt).format("MMM DD, YYYY")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="md:w-[35%] flex flex-col gap-3 sticky top-[57px] ">
          <div className="flex border-b-4 border-gray-300">
            <div className="w-full">
              <h2 className="underline underline-offset-8 text">
                Popular Posts
              </h2>
            </div>
          </div>

          {popularPosts.map((post, index) => (
            <Link
              to={`/posts/${post.slug}`}
              key={index}
              className="flex gap-6 w-full"
            >
              <p className="font-semibold text-3xl text-gray-400 w-11">{`0${
                index + 1
              }`}</p>
              <div className="flex-1">
                <p className="font-semibold">{post.title}</p>
                <p className="line-clamp-1 text-gray-600">{post.description}</p>
                <div className="mt-auto flex flex-col">
                  <p className="font-semibold"> {post?.createdBy?.name}</p>
                  <p className="text-gray-500 text-xs ml-auto">
                    {moment(post?.createdAt).format("MMM DD, YYYY")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}

export const loader = async ({ request }) => {
  const postController = new PostController(request);
  const popularPosts = await postController.getPopularPosts();
  const featured = await postController.getFeaturedPosts();
  const latest = await postController.getLatestPosts();
  const categories = await postController.getCategories();

  return { featured, popularPosts, latest, categories };
};

export const meta: MetaFunction = () => {
  return [
    { title: "Penrobes" },
    {
      name: "description",
      content: "Blog about anything and everything",
    },
    { name: "og:title", content: "Penrobes" },
    {
      name: "og:description",
      content: "Penrobes Blog about anything and everything",
    },
    {
      name: "og:image",
      content:
        "https://media.istockphoto.com/vectors/letter-b-icon-vector-id521527924?k=6&m=521527924&s=612x612&w=0&h=CuLX6X3KP0BxCSI2qMkHu_hS664SH-jUuS3BtCKMCmg=",
    },
    { name: "og:url", content: "https://tinyblogger.vercel.app" },
  ];
};
