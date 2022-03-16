import { Link } from "remix";

const blogPosts = [
  {
    id: 1,
    title: "Vladimir Putin Has Already Won, but Nobody Wants to Admit It",
    slug: "vladimir-putin-has-already-won-but-nobody-wants-to-admit-it",
    createdAt: "1 day",
    read: "5min read",
    writer: "Jon Doe",
    img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  },
  {
    id: 2,
    title: "Cornerstone of early 2000s LA rotations, Odalis Perez passes away",
    slug: "cornerstone-of-early-2000s-LA-rotations-Odalis-Perez-passes-away",
    createdAt: "22 days",
    read: "5min read",
    writer: "Smithy Sam",
    img: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  },
  {
    id: 3,
    title: "Apple: M1 Ultra Meanings and Consequences",
    slug: "Apple-M1-Ultra-Meanings-and-Consequences",
    createdAt: "12 hrs",
    read: "5min read",
    writer: "Ellen Whyte",
    img: "https://images.unsplash.com/photo-1526382925646-27b5eb86796e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  },
  {
    id: 4,
    title:
      "Keeping Developers Will Be the Priority in Great Developer Resignation Next Stage",
    slug: "vladimir-putin-has-already-won-but-nobody-wants-to-admit-it",
    createdAt: "1 day",
    read: "5min read",
    writer: "Christina Bricks",
    img: "https://images.unsplash.com/photo-1520635360276-79f3dbd809f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  },
  {
    id: 5,
    title: "Why Russia’s Tank Army Has Suicidal Incompetence",
    slug: "vladimir-putin-has-already-won-but-nobody-wants-to-admit-it",
    createdAt: "1 yer",
    read: "5min read",
    writer: "Sean Kernan",
    img: "https://images.unsplash.com/photo-1535931737580-a99567967ddc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  },
  {
    id: 6,
    title: "Has NASA Cracked Fusion Energy?",
    slug: "vladimir-putin-has-already-won-but-nobody-wants-to-admit-it",
    createdAt: "9 hrs",
    read: "5min read",
    writer: "Grace Carter",
    img: "https://images.unsplash.com/photo-1502877828070-33b167ad6860?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=605&q=80",
  },
];

const minLinks = [
  { id: 1, name: "Trending", slug: "trending" },
  { id: 1, name: "Latest", slug: "latest" },
  { id: 1, name: "Best", slug: "best" },
];

function Tag() {
  return (
    <div className="flex w-full flex-col md:flex-row">
      <section className="my-5 border-gray-300 px-3 md:w-[60%] md:border-r md:px-8">
        <section>
          <h1 className="text-4xl font-bold">Programming</h1>

          <div className="mt-8 flex border-b border-gray-300">
            {minLinks.map((minL) => (
              <Link
                to={`/tag/asdas/${minL.slug}`}
                key={minL.id}
                className="mx-2"
              >
                <p>{minL.name}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="flex flex-col">
          {blogPosts.map((trend) => (
            <Link
              to={`/blog/${trend.slug}`}
              key={trend.id}
              className="my-3 border-b border-gray-300 py-3 md:py-8"
            >
              <div className="flex items-center">
                <img
                  src={trend.img}
                  className="mr-3 h-8 w-8 rounded-full"
                  alt=""
                />
                <p>
                  {trend.writer} . {trend.createdAt} ago
                </p>
              </div>

              <div className="flex items-center">
                <div className="mr-8">
                  <p className="my-2 font-bold">{trend.title}</p>

                  <p className="my-4 hidden md:flex">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aspernatur earum itaque error mollitia dolorum quidem odit
                    optio vel? Quasi error esse nobis quas dolor dolore pariatur
                    obcaecati aut debitis quam?
                  </p>

                  <p>Category - {trend.read}</p>
                </div>

                <img
                  src={trend.img}
                  className="h-11 w-11 rounded-sm md:h-32 md:w-32"
                  alt=""
                />
              </div>
            </Link>
          ))}
        </section>
      </section>

      <section className="my-5 px-3 md:w-[40%] md:px-8">
        <p>asfasf</p>
      </section>
    </div>
  );
}

export default Tag;
