import { type MetaFunction, type LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import PublicLayout from "~/layouts/public";
import moment from "moment";
import PostController from "~/server/controllers/PostController";

export default function CategoryDetails() {
  const { category, slug, posts, categories, sections } = useLoaderData<{
    category: any;
    posts: any[];
    categories: any[];
    sections: any[];
  }>();
  console.log(posts);

  return (
    <PublicLayout data={{ sections, categories }}>
      <section className="flex gap-5 flex-col my-11">
        <h1 className="md:text-6xl text-3xl text-center md:w-[70%] mx-auto">
          {category?.title}
        </h1>

        <p className="text-center md:w-[70%] mx-auto">
          {category?.description}
        </p>
      </section>

      {/* <img
        src={post?.coverImage?.url}
        alt=""
        className="my-5 w-full rounded-md"
      /> */}

      <section className="grid md:grid-cols-3 grid-cols-1 gap-4 ">
        {posts.map((post, index) => (
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
              <p className="text-gray-500 line-clamp-2">{post.description}</p>

              <div className="mt-auto flex flex-col">
                <p className="font-semibold">{post?.createdBy?.name}</p>
                <p className="text-red-500 ml-auto text-xs">
                  {moment(post?.createdAt).format("MMM DD, YYYY")}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </PublicLayout>
  );
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { slug } = params as { slug: string };
  // const url = new URL(request.url);
  // const slug = url.searchParams.get("slug") as string;

  const postController = new PostController(request);
  const category = await postController.getCategoryBySlug(slug);
  const posts = await postController.getPostByCategory(category?._id);

  const categories = await postController.getCategories();
  const sections = await postController.getSections();

  return { category, slug, posts, categories, sections };
};

export const meta: MetaFunction = ({ data }) => {
  const category = data?.category;
  return [
    { title: `${category?.title} | Penrobes` },
    {
      name: "description",
      content: category?.description,
    },
    { name: "og:title", content: `${category?.title} | Penrobes` },
    {
      name: "og:description",
      content: category?.description,
    },
    {
      name: "og:image",
      content: category?.coverImage?.url,
    },
    { name: "og:url", content: "https://tinyblogger.vercel.app" },
  ];
};
