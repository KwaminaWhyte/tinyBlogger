import React from "react";
import { Link } from "remix";
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

function Index() {
  return (
    <>
      <section
        id="default-carousel"
        data-carousel="slide"
        className="relative w-full md:my-5 md:px-5"
      >
        <div className="relative h-56 overflow-hidden sm:h-64 md:rounded-lg xl:h-80 2xl:h-96">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="absolute inset-0 translate-x-0 transform transition-all duration-700 ease-in-out"
              data-carousel-item={index ? "active" : ""}
            >
              <img
                src={`${post.img}`}
                className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
                alt="..."
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3">
          {posts.map((post, index) => (
            <button
              key={post.id}
              type="button"
              className="h-3 w-3 rounded-full bg-white dark:bg-gray-800"
              aria-current={index ? "true" : "false"}
              aria-label={`Slide ${index}`}
              data-carousel-slide-to={index}
            ></button>
          ))}
        </div>

        <button
          type="button"
          className="group absolute top-0 left-0 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
          data-carousel-prev=""
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10">
            <svg
              className="h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            <span className="hidden">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="group absolute top-0 right-0 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
          data-carousel-next=""
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10">
            <svg
              className="h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            <span className="hidden">Next</span>
          </span>
        </button>
      </section>

      <section className="flex flex-wrap justify-between px-3">
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              background: `url('${post.img}')`,
              backgroundSize: "cover",
            }}
            className="my-2 flex h-56 flex-col rounded-lg p-5 hover:bg-top md:m-3 md:w-[30%]"
          >
            <h4 className="mt-5 w-[80%] text-lg font-bold text-white">
              {post.title}
            </h4>

            <Link
              to={`/blog/${post.id}`}
              className="mr-auto mt-auto rounded-md bg-white py-3 px-4 text-sm font-medium transition-all duration-75 ease-in hover:bg-gray-900 hover:text-white"
            >
              Read More
            </Link>
          </div>
        ))}
      </section>
    </>
  );
}

export default Index;
