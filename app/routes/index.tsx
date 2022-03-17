import { Link } from "remix";

const trending = [
  {
    id: 1,
    title: "Vladimir Putin Has Already Won, but Nobody Wants to Admit It",
    createdAt: "asfas",
    read: "5min read",
    writer: "Jon Doe",
    img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  },
  {
    id: 2,
    title: "Cornerstone of early 2000s LA rotations, Odalis Perez passes away",
    createdAt: "asfas",
    read: "5min read",
    writer: "Smithy Sam",
    img: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  },
  {
    id: 3,
    title: "Apple: M1 Ultra Meanings and Consequences",
    createdAt: "asfas",
    read: "5min read",
    writer: "Ellen Whyte",
    img: "https://images.unsplash.com/photo-1526382925646-27b5eb86796e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  },
  {
    id: 4,
    title:
      "Keeping Developers Will Be the Priority in Great Developer Resignation Next Stage",
    createdAt: "asfas",
    read: "5min read",
    writer: "Christina Bricks",
    img: "https://images.unsplash.com/photo-1520635360276-79f3dbd809f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  },
  {
    id: 5,
    title: "Why Russia’s Tank Army Has Suicidal Incompetence",
    createdAt: "asfas",
    read: "5min read",
    writer: "Sean Kernan",
    img: "https://images.unsplash.com/photo-1535931737580-a99567967ddc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  },
  {
    id: 6,
    title: "Has NASA Cracked Fusion Energy?",
    createdAt: "asfas",
    read: "5min read",
    writer: "Grace Carter",
    img: "https://images.unsplash.com/photo-1502877828070-33b167ad6860?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=605&q=80",
  },
];

const categories = [
  { id: 1, title: "Self", slug: "self" },
  { id: 2, title: "Relationships", slug: "realationships" },
  { id: 3, title: "Data Science", slug: "data-science" },
  { id: 4, title: "Productivity", slug: "productivity" },
  { id: 5, title: "Politics ", slug: "politics" },
  { id: 6, title: "Health", slug: "health" },
];

export default function Index() {
  return (
    <>
      <section className="flex h-96 flex-col justify-center border-b border-black px-3 md:px-12">
        <h1 className="text-5xl font-bold md:text-8xl">Stay curious.</h1>

        <p className="my-9 text-xl md:w-2/3 md:text-3xl">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>

        <Link
          to="/blog"
          className="mr-auto rounded-2xl bg-black py-3 px-6 font-medium text-white shadow-md shadow-gray-400 ring-black transition-all duration-75 hover:bg-yellow-400 hover:text-black hover:ring-2"
        >
          Start Reading
        </Link>
      </section>

      <section className="flex flex-col border-b border-gray-400 px-3 py-4 md:px-12">
        <p className="mb-5 font-bold">TRENDING</p>

        <div className="flex flex-wrap justify-between">
          {trending.map((trend) => (
            <Link
              to={`/blog/${trend.id}`}
              key={trend.id}
              className="my-3 md:w-[29%]"
            >
              <div className="flex items-center">
                <img
                  src={trend.img}
                  className="mr-3 h-8 w-8 rounded-full"
                  alt=""
                />
                <p>{trend.writer}</p>
              </div>
              <p className="my-2 font-bold">{trend.title}</p>
              <p>
                {trend.createdAt} - {trend.read}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex min-h-screen flex-col py-4 px-3 md:flex-row md:px-12">
        <div className="md:w-[60%]">
          <p>left</p>
        </div>

        <div className="sticky top-28 mt-20 md:w-[40%]">
          <p className="mb-5 font-bold">DISCOVER MORE OF WHAT MATTERS TO YOU</p>

          <div className="flex flex-wrap">
            {categories.map((category) => (
              <Link
                to={`/tag/${category.slug}`}
                key={category.id}
                className="m-1 rounded-md border border-gray-400 py-1 px-5"
              >
                <p>{category.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
