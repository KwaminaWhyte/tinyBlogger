import { NavLink, Link, Outlet, useLoaderData } from "remix";
import type { LoaderFunction, MetaFunction } from "remix";
import { gql, request } from "graphql-request";
import { CategoryType, PostType } from "~/utils/types";

const categories = [
  {
    id: 3,
    title: "Case Studies",
    slug: "",
  },
  {
    id: 1,
    title: "Featured",
    slug: "featured",
  },
  {
    id: 2,
    title: "Webinars",
    slug: "webinars",
  },
];

export const loader: LoaderFunction = async () => {
  const query = gql`
    query MyQuery {
      posts {
        id
        slug
        title
        description
        createdAt
        featuredImage {
          url
        }
        categories {
          title
          slug
          id
        }
        account {
          username
          photo {
            url
          }
        }
      }
      categories {
        id
        slug
        title
      }
    }
  `;

  const result = await request(
    "https://api-eu-central-1.graphcms.com/v2/cl0z3nic64r6q01xma8ss10wo/master",
    query
  );
  let posts = result.posts;
  let categories = result.categories;

  return { posts, categories };
};

export const meta: MetaFunction = () => {
  return {
    title: "tinyBlog | Featured Blog",
    description: "",
  };
};

function Index() {
  const { posts, categories } = useLoaderData();

  return (
    <>
      <section className="flex overflow-x-auto px-3">
        {posts.map((post: PostType) => (
          <div
            key={post.id}
            style={{
              background: `url('${post.featuredImage.url}')`,
              backgroundSize: "cover",
            }}
            className="m-3 flex h-56 w-[95%] flex-shrink-0 flex-col rounded-lg p-5 hover:bg-top md:w-96"
          >
            <h4 className="mt-5 w-[80%] text-lg font-bold text-white">
              {post.title}
            </h4>

            <Link
              to={`/blog/${post.slug}`}
              className="mr-auto mt-auto rounded-2xl  bg-white py-3 px-4 text-sm font-medium ring-yellow-400 transition-all duration-75 ease-in hover:bg-gray-900 hover:text-white hover:ring-2"
            >
              Read More
            </Link>
          </div>
        ))}
      </section>

      <section className="my-5 flex justify-center border-b border-gray-300 px-3 py-6">
        {categories.map((category: CategoryType) => (
          <NavLink
            to={`/tag/${category.slug}`}
            key={category.id}
            className={({ isActive }) =>
              isActive
                ? "text-md m-1 mx-2 decoration-slice font-extrabold text-black underline underline-offset-8 md:m-5"
                : "m-1 md:m-5"
            }
          >
            <p className="font-medium">{category.title}</p>
          </NavLink>
        ))}
      </section>
      {/* 
      <section className="flex flex-col md:px-3">
        <Outlet />
      </section> */}
    </>
  );
}

export default Index;
