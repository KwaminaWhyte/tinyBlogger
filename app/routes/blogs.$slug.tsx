import { type MetaFunction, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PublicLayout from "~/components/layouts/public";
import moment from "moment";
import { ClientOnly } from "remix-utils/client-only";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { GraphQLClient, gql } from "graphql-request";

export default function Blog() {
  const { post, slug } = useLoaderData();

  return (
    <PublicLayout>
      <section className="flex gap-5 flex-col my-11">
        <h1 className="md:text-6xl text-3xl text-center md:w-[70%] mx-auto">
          {post?.title}
        </h1>

        <p className="text-center md:w-[70%] mx-auto">{post?.description}</p>

        <p className="ml-auto ">
          {moment(post.createdAt).format("MMM DD, YYYY")}
          {/* - 10 mins Read */}
        </p>
      </section>

      <img
        src={post.coverImage?.url}
        alt=""
        className="my-5 w-full rounded-md"
      />

      <ClientOnly fallback={<p>Loading Editor, please be patient...</p>}>
        {() => (
          <RichText
            content={post?.content?.raw.children}
            renderers={{
              h1: ({ children }) => (
                <h1 className="md:text-6xl my-4 text-3xl font-bold montserrat-font">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="md:text-5xl my-3 text-2xl font-bold montserrat-font">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="md:text-4xl my-2 text-2xl font-bold montserrat-font">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="my-1.5 md:text-3xl text-xl font-bold montserrat-font">
                  {children}
                </h4>
              ),
              h5: ({ children }) => (
                <h4 className="my-1 md:text-2xl text-lg font-bold montserrat-font">
                  {children}
                </h4>
              ),
              h6: ({ children }) => (
                <h4 className="my-0.5 md:text-xl text-base font-bold montserrat-font">
                  {children}
                </h4>
              ),
              bold: ({ children }) => <strong>{children}</strong>,
              p: ({ children }) => <p className="my-3">{children}</p>,
              ol: ({ children }) => <ol className="my-3 ml-2">{children}</ol>,
              ul: ({ children }) => <ul className="my-3 ml-2">{children}</ul>,
              li: ({ children }) => <li className="my-4"> - {children}</li>,
              a: ({ children, href }) => (
                <a
                  className="text-purple-600 hover:text-purple-800 underline underline-offset-2 transition-all duration-150"
                  href={href}
                  target="_black"
                >
                  {children}
                </a>
              ),
              code: ({ children }) => (
                <code className="rounded-md bg-gray-200 p-1 text-sm">
                  {children}
                </code>
              ),
              blockquote: ({ children }) => (
                <blockquote className="my-3 border-l-2 border-purple-800 pl-4">
                  {children}
                </blockquote>
              ),
              code_block: ({ children }) => (
                <pre className="code-block my-3 bg-gray-200 p-1 text-sm ">
                  {children}
                </pre>
              ),
              img: ({ src, title }) => (
                <img src={src} alt={title} srcset="" className="rounded-sm" />
              ),
            }}
          />
        )}
      </ClientOnly>
    </PublicLayout>
  );
}

const GetPostBySlug = gql`
  query ($slug: String!) {
    post(where: { slug: $slug }) {
      title
      description
      slug
      content {
        raw
      }
      coverImage {
        id
        url
      }
    }
  }
`;

export const loader: LoaderFunction = async ({ request, params }) => {
  const { slug } = params as { slug: string };

  const hygraph = new GraphQLClient(
    "https://api-eu-central-1.hygraph.com/v2/cl0z3nic64r6q01xma8ss10wo/master"
  );

  const { post } = await hygraph.request(GetPostBySlug, {
    slug,
  });

  // const url = new URL(request.url);
  // const slug = url.searchParams.get("slug") as string;

  // const postController = await new PostController(request);
  // const blog = await postController.getBlog(slug);

  return { post, slug };
};

export const meta: MetaFunction = ({ data }) => {
  const post = data?.post;
  return [
    { title: `${post?.title} | Blogger.` },
    {
      name: "description",
      content: post?.description,
    },
    { name: "og:title", content: `${post?.title} | Blogger.` },
    {
      name: "og:description",
      content: post?.description,
    },
    {
      name: "og:image",
      content: post?.coverImage?.url,
    },
    { name: "og:url", content: "https://tinyblogger.vercel.app" },
  ];
};
