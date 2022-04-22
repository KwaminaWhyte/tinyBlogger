import { Link, Outlet, useLoaderData } from "@remix-run/react";
import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import request, { gql } from "graphql-request";
import moment from "moment";
import PostCard from "~/components/PostCard";
import { PostType } from "~/utils/types";

import client from "~/utils/apolloClient";

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

  const result = await client.request(query, { slug: params.slug });

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
