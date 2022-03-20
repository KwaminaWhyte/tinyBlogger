import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
  cache: new InMemoryCache(),
  headers: {
    // authorization: `Bearer  ${process.env.NEXT_PUBLIC_APOLLO_TOKEN}`,
  },
});

// query MyQuery {
//       posts {
//         createdAt
//         featuredImage {
//           url
//         }
//         title
//         slug
//         id
//         account {
//           id
//           username
//           photo {
//             url
//           }
//         }
//       }
//     }

// export const loader: LoaderFunction = async () => {
//   const { data } = await client.query({
//     query: gql`
//       query {
//         blogs {
//           id
//           title
//           slug
//           description
//           coverImage {
//             url
//           }
//           createdAt
//         }
//       }
//     `,
//   });

//   const posts: BlogI[] = await data.blogs;
//   return posts;
// };
