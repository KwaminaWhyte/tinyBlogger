import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.PERMANENT_AUTH_TOKEN}`,
  },
});

export default client;
