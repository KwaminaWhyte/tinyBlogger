import { useLoaderData } from "remix";
import type { MetaFunction, LoaderFunction } from "remix";
import { IoIosChatbubbles, IoIosHeart, IoIosShare } from "react-icons/io";
import request, { gql } from "graphql-request";
import { PostType } from "~/utils/types";
import moment from "moment";
import React from "react";

export const meta: MetaFunction = ({ data }) => {
  return {
    title: `tinyBlog | ${data.title}`,
    description: `${data.description}`,
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const query = gql`
    query getPost($slug: String!) {
      post(where: { slug: $slug }) {
        id
        slug
        title
        description
        createdAt
        featuredImage {
          url
        }
        content {
          raw
          html
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
        comments {
          id
          name
          email
          comment
          createdAt
        }
      }
    }
  `;

  const data = await request(
    "https://api-eu-central-1.graphcms.com/v2/cl0z3nic64r6q01xma8ss10wo/master",
    query,
    { slug: params.slug }
  );

  let post = data.post;
  return post;
};

function Blog() {
  const post = useLoaderData<PostType>();

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="mb-4 text-xl font-semibold">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md mb-3 font-semibold">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div className="flex w-full flex-col md:flex-row">
      <section className="my-5  border-gray-300  md:w-[60%] md:border-r ">
        <div className="min-h-screen px-3 md:px-8">
          <div className="flex items-center py-5">
            <img
              src={post.account.photo.url}
              className="mr-3 h-9 w-9 rounded-full"
              alt=""
            />
            <div>
              <p className="font-bold">{post.account.username}</p>
              <p className="text-sm">
                {moment(post.createdAt).format("MMMM Do, YYYY")} . 12 min read
              </p>
            </div>
          </div>

          <h1 className="my-3 text-3xl font-bold md:text-4xl">{post.title}</h1>
          <p className="text-xl md:text-2xl">{post.description}</p>

          <img
            src={post.featuredImage.url}
            alt=""
            className="my-4 w-full rounded-md"
          />

          <section className="mt-11">
            {post?.content?.raw.children.map((typeObj, index) => {
              const children = typeObj.children.map((item, itemIndex) =>
                getContentFragment(itemIndex, item.text, item)
              );

              return getContentFragment(index, children, typeObj, typeObj.type);
            })}
          </section>
        </div>

        <div className="sticky bottom-0 mt-11 flex h-14 items-center border-b border-t border-gray-300 bg-slate-50 px-6 text-gray-600 md:px-11">
          <div className="mr-5 flex">
            <IoIosHeart size={23} />
            <p className="ml-2">200</p>
          </div>

          <div className="flex">
            <IoIosChatbubbles size={23} />
            <p className="ml-2">30</p>
          </div>

          <IoIosShare size={23} className="ml-auto" />
        </div>

        <div className="min-h-screen px-3 py-4 md:px-8">
          <p className="font-bold">Comments (30)</p>

          <div className="mt-6">
            {post.comments.map((comment) => (
              <div key={comment.id} className="my-3">
                <div className="flex">
                  <img src="" className="mr-3 h-11 w-11 rounded-full" alt="" />
                  <div>
                    <p className="font-bold">{comment.name}</p>
                    <p className="text-sm">
                      {moment(comment.createdAt).format("MMMM Do, YYYY")}
                    </p>
                  </div>
                </div>
                <p className="ml-4">{comment.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="my-5 px-3 md:w-[40%] md:px-8">
        <p>asfasf</p>
      </section>
    </div>
  );
}

export default Blog;
