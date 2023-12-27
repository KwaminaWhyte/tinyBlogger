import {
  type ActionFunction,
  json,
  type LoaderFunction,
} from "@remix-run/node";
import axios from "axios";
import cheerio from "cheerio";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const data = url.searchParams.get("url");
  let response = await axios.get(data as string);

  const $ = cheerio.load(response.data);

  const title = $("head title").text();
  const description = $('meta[name="description"]').attr("content");
  const image = $('meta[property="og:image"]').attr("content");
  const icon = $('link[rel="icon"]').attr("href");

  return json({
    success: 1,
    meta: {
      title: title,
      description: description ? description : title,
      image: {
        url: image ? image : icon,
      },
    },
  });
};

export const action: ActionFunction = async ({ context, request, params }) => {
  console.log(context, params, request);

  return {};
};
