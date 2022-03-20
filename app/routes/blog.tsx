import { NavLink, Link, Outlet } from "remix";
import type { LoaderFunction, MetaFunction } from "remix";

const posts = [
  {
    id: 1,
    title: "Understanding the Mobile Delivery Gap",
    img: "https://images.unsplash.com/photo-1557494935-80981e7acd73?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 2,
    title: "Building the New Marketwatch app",
    img: "https://images.unsplash.com/photo-1647134301880-cff5bb819bf4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80",
  },
  {
    id: 3,
    title: "Using Web Component's in Ionic (Polymer Con)",
    img: "https://images.unsplash.com/photo-1646771099827-477a8335a304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
  },
  {
    id: 4,
    title: "Napa group speeds up development",
    img: "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=739&q=80",
  },
  {
    id: 5,
    title: "Sense corp Accelerate the app cycle with tailwind",
    img: "https://images.unsplash.com/photo-1533022139390-e31c488d69e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
  },
  {
    id: 5,
    title: "The best(Best-ish) programming Guide",
    img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
];

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
  return "asfjbasuf ";
};

export const meta: MetaFunction = () => {
  return {
    title: "tinyBlog | Featured Blog",
    description: "",
  };
};

function Index() {
  return (
    <>
      <section className="flex overflow-x-auto px-3">
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              background: `url('${post.img}')`,
              backgroundSize: "cover",
            }}
            className="m-3 flex h-56 w-[95%] flex-shrink-0 flex-col rounded-lg p-5 hover:bg-top md:w-96"
          >
            <h4 className="mt-5 w-[80%] text-lg font-bold text-white">
              {post.title}
            </h4>

            <Link
              to={`/blog/${post.id}`}
              className="mr-auto mt-auto rounded-2xl  bg-white py-3 px-4 text-sm font-medium ring-yellow-400 transition-all duration-75 ease-in hover:bg-gray-900 hover:text-white hover:ring-2"
            >
              Read More
            </Link>
          </div>
        ))}
      </section>

      <section className="my-5 flex justify-center border-b border-gray-300 px-3 py-6">
        {categories.map((category) => (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-md m-1 mx-2 decoration-slice font-extrabold text-black underline underline-offset-8 md:m-5"
                : "m-1 md:m-5"
            }
            to={`/blog/${category.slug}`}
            key={category.id}
          >
            <p className="font-medium">{category.title}</p>
          </NavLink>
        ))}
      </section>

      <section className="flex flex-col md:px-3">
        <Outlet />
      </section>
    </>
  );
}

export default Index;
