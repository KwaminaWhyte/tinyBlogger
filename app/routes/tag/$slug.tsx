import { Link, Outlet, useLoaderData } from "remix";
import type { MetaFunction, LoaderFunction } from "remix";
import request, { gql } from "graphql-request";
import moment from "moment";
import PostCard from "~/components/PostCard";
import { PostType } from "~/utils/types";

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

export const meta: MetaFunction = ({ data }) => {
  return {
    title: `tinyBlog | The most significant stories about ${data.title}`,
    description: `Aspernatur earum itaque error mollitia dolorum quidem odit
                    optio vel? Quasi error esse nobis quas dolor dolore pariatur
                    obcaecati aut debitis quam?`,
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const query = gql`
    query MyQuery($slug: String!) {
      category(where: { slug: $slug }) {
        title
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
      }
    }
  `;

  const result = await request(
    "https://api-eu-central-1.graphcms.com/v2/cl0z3nic64r6q01xma8ss10wo/master",
    query,
    { slug: params.slug }
  );

  let post = result.category;
  return post;
};

function Tag() {
  let category = useLoaderData();

  return (
    <div className="flex w-full flex-col md:flex-row">
      <section className="my-5 border-gray-300 px-3 md:w-[60%] md:border-r md:px-8">
        <section>
          <h1 className="text-4xl font-bold">{category.title}</h1>

          <div className="mt-8 flex border-b border-gray-300">
            {/* {minLinks.map((minL) => (
              <Link
                to={`/tag/asdas/${minL.slug}`}
                key={minL.id}
                className="mx-2"
              >
                <p>{minL.name}</p>
              </Link>
            ))} */}
          </div>
        </section>

        <Outlet />

        <section className="flex flex-col">
          {category.posts.map((post: PostType) => (
            <PostCard key={post.id} post={post} />
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
