import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import moment from "moment";
import PublicLayout from "~/components/layouts/public";
import { Button } from "~/components/ui/button";
import PostController from "~/server/controllers/PostController";
import type { BlogDocument } from "~/server/types";
import { GraphQLClient, gql } from "graphql-request";

// npm install @apollo/client graphql
// const posts = [
//   {
//     title: "Google Just Showed Us the Future of Gaming",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
//     image: "https://picsum.photos/200",
//   },
//   {
//     title: "How a limitless Internet Blinds Us to the Real World",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
//     image: "https://picsum.photos/200",
//   },
//   {
//     title: "post 3",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
//     image: "https://picsum.photos/200",
//   },
//   {
//     title: "Orgernize the Content Moderators",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
//     image: "https://picsum.photos/200",
//   },
//   {
//     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
//     image: "https://picsum.photos/200",
//   },
//   {
//     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
//     image: "https://picsum.photos/200",
//   },
//   {
//     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
//     image: "https://picsum.photos/200",
//   },
//   {
//     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
//     image: "https://picsum.photos/200",
//   },
// ];

export default function Index() {
  const { featured, posts } = useLoaderData<{
    featured: BlogDocument[];
    posts: BlogDocument[];
  }>();

  return (
    <PublicLayout className=" min-h-screen">
      <section className="flex">
        <div className="md:w-[50%] flex flex-col justify-center gap-6">
          <h1 className="md:text-7xl text-3xl">Welcome to Blogger.</h1>

          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias
            maxime reiciendis quae porro explicabo iste adipisci culpa quos
            earum doloremque, vitae maiores?
          </p>

          <Button>Explore</Button>
        </div>

        <div className="w-[50%] hidden md:blocks">
          <img
            src="https://static.vecteezy.com/system/resources/previews/007/783/955/original/online-education-illustration-concept-flat-illustration-isolated-on-white-background-vector.jpg"
            alt=""
            className="w-full "
          />
        </div>
      </section>

      <section className=" mt-24">
        <div className="flex border-b-4 border-gray-300">
          <h2 className="underline underline-offset-8 ">Featured </h2>
        </div>

        <div className="flex mt-11 gap-3 flex-col md:flex-row ">
          <div className="md:w-[65%] w-full flex flex-col gap-3">
            <Link
              to={`/blogs/${featured[0]?.slug}`}
              className="flex-1 gap-3 md:w-[65%] w-full flex flex-col"
            >
              <img
                src={featured[0]?.coverImage?.url}
                alt=""
                className="w-full h-60 object-cover"
              />

              <div className="flex-1 flex flex-col gap-2">
                <p className="font-semibold text-xl">{featured[0]?.title}</p>
                <p className="text-gray-800 line-clamp-2">
                  {featured[0]?.description}
                </p>

                <div className="mt-auto">
                  <p className="font-semibold">
                    {featured[0]?.createdBy?.name}
                  </p>
                  <p className="text-gray-500">
                    {moment(featured[0]?.createdAt).format("MMM DD, YYYY")}
                    {/* - 5 mins read */}
                  </p>
                </div>
              </div>
            </Link>

            <div className="flex-1 flex flex-col justify-between ">
              {featured.slice(1, 3).map((post, index) => (
                <div key={index} className="flex gap-3">
                  <img
                    src={post.coverImage.url}
                    alt=""
                    className="w-44 object-cover"
                  />

                  <div className="flex flex-col gap-2 flex-1">
                    <p className="font-semibold">{post.title}</p>
                    <p className="text-gray-800 line-clamp-2">
                      {post.description}
                    </p>

                    <div className="mt-auto ">
                      {/* <p className="font-semibold mt-auto">{post?.createdBy?.name}</p> */}
                      <p className="text-gray-500">
                        {moment(post?.createdAt).format("MMM DD, YYYY")} - 5
                        mins read
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-[35%] flex justify-between flex-col gap-3">
            {featured.slice(3, 6).map((post, index) => (
              <div key={index} className="flex gap-3">
                <img
                  src={post.coverImage.url}
                  alt=""
                  className="w-32 object-cover"
                />

                <div className="flex flex-col gap-3 flex-1">
                  <p className="font-semibold">{post.title}</p>

                  <div className="mt-auto">
                    {/* <p className="font-semibold ">{post?.createdBy?.name}</p> */}
                    <p className="text-gray-500 ">
                      {moment(post?.createdAt).format("MMM DD, YYYY")} - 5 mins
                      read
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="min-h-screen mt-24 flex gap-3 md:flex-row flex-col">
        <div className="flex md:w-[65%]  flex-col gap-3 ">
          <div className="w-full border-b-4 border-gray-300">
            <h2 className="underline underline-offset-8 ">Latest Posts </h2>
          </div>

          <div className="md:w-[65%] gap-6 grid grid-rows-1 md:grid-cols-2">
            {posts.map((post, index) => (
              <Link
                to={`/blogs/${post?.slug}`}
                className="flex-1 gap-3 flex flex-col"
                key={index}
              >
                <img
                  src={post?.coverImage?.url}
                  alt=""
                  className="w-full h-60 object-cover"
                />

                <div className="flex-1">
                  <p className="font-semibold text-xl">{post.title}</p>
                  <p className="text-gray-500 line-clamp-2">
                    {post.description}
                  </p>

                  <div className="mt-auto">
                    <p className="font-semibold">{post?.createdBy?.name}</p>
                    <p className="text-gray-500">
                      {moment(post?.createdAt).format("MMM DD, YYYY")} - 5 mins
                      read
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="md:w-[35%] flex flex-col gap-3">
          <div className="flex border-b-4 border-gray-300">
            <div className="w-full">
              <h2 className="underline underline-offset-8 ">Popular Posts </h2>
            </div>
          </div>

          {posts.slice(0, 5).map((post, index) => (
            <div key={index} className="flex gap-6 ">
              <p className="font-semibold text-3xl text-gray-400 w-11">{`0${
                index + 1
              }`}</p>
              <div>
                <p>{post.title}</p>
                <div className="mt-auto">
                  <p className="font-semibold"> {post?.createdBy?.name}</p>
                  <p className="text-gray-500">
                    {moment(post?.createdAt).format("MMM DD, YYYY")} - 5 mins
                    read
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}

const GetFeaturedPostsQuery = gql`
  query ($featured: Boolean!) {
    posts(where: { featured: $featured }, last: 10) {
      title
      slug
      createdAt
      description
      featured
      coverImage {
        id
        url
      }
      createdBy {
        id
        name
      }
    }
  }
`;

export const loader = async ({ request }) => {
  const hygraph = new GraphQLClient(
    "https://api-eu-central-1.hygraph.com/v2/cl0z3nic64r6q01xma8ss10wo/master"
  );

  const postController = new PostController(request);
  const posts = await postController.getPosts();
  // const featured = await postController.getFeaturedBlogs();

  const { posts: featured } = await hygraph.request(GetFeaturedPostsQuery, {
    featured: true,
  });

  return { featured, posts };
};

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
        "https://media.istockphoto.com/vectors/letter-b-icon-vector-id521527924?k=6&m=521527924&s=612x612&w=0&h=CuLX6X3KP0BxCSI2qMkHu_hS664SH-jUuS3BtCKMCmg=",
    },
    { name: "og:url", content: "https://tinyblogger.vercel.app" },
  ];
};
