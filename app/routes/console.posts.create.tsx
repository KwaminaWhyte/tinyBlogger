import { type ActionFunction, type MetaFunction } from "@remix-run/node";
import { useSubmit } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { ClientOnly } from "remix-utils/client-only";
import ConsoleLayout from "~/layouts/console";
import { PlateEditor } from "~/components/plate-editor.client";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import PostController from "~/server/controllers/PostController";
import axios from "axios";
import ConsoleDetailLayout from "~/layouts/console-detail";
import { set } from "lodash";

export default function CreateBlog() {
  const submit = useSubmit();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [featureImage, setFeatureImage] = useState<{
    url?: string;
    externalId?: string;
  }>({});
  const [file, setFile] = useState<{ file: any; previewUrl: string }>({});

  const handleFileChange = (event) => {
    const image = {
      file: event.target.files[0],
      previewUrl: URL.createObjectURL(event.target.files[0]),
    };
    setFile(image);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file.file);
    formData.append("upload_preset", "hostel");

    axios
      .post("https://api.cloudinary.com/v1_1/app-deity/image/upload", formData)
      .then((response) => {
        localStorage.setItem(
          "featureImage",
          JSON.stringify({
            url: response.data.secure_url,
            externalId: response.data.asset_id,
          })
        );

        setFeatureImage({
          url: response.data.secure_url,
          externalId: response.data.asset_id,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = () => {
    submit(
      {
        title,
        description,
        slug: genetateSlug(title),
        content: JSON.stringify(content),
        featureImage: JSON.stringify(featureImage),
      },
      {
        method: "post",
        encType: "multipart/form-data",
      }
    );
  };

  useEffect(() => {
    axios
      .get("/api/check-slug?slug=" + genetateSlug(title))
      .then((res) => {
        if (res.data.status == 400) {
          setSlug(genetateSlug(title) + "-1");
        } else {
          setSlug(genetateSlug(title));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [title]);

  return (
    <ConsoleDetailLayout
      className="gap-5"
      title="Create Post"
      rightContent={
        <div className="flex items-center gap-3">
          {/* <p
            className={`text-xs px-2 py-1 text-white font-semibold rounded-lg bg-opacity-85 ${
              post.stage == "DRAFT" ? "bg-red-500 " : "bg-green-600"
            } text-foreground`}
          >
            {post.stage}
          </p> */}

          <Button onClick={() => handleSubmit()} variant="outline">
            Save
          </Button>
        </div>
      }
    >
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" type="text" value={slug} disabled />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>

      <div className="flex gap-5 items-center">
        <div className="flex flex-col">
          <img
            src={
              file?.previewUrl
                ? file.previewUrl
                : "https://th.bing.com/th/id/R.20d3e94846b0317ba981e9b4d3ecdabb?rik=wRXoSyZgG3cbIA&pid=ImgRaw&r=0"
            }
            alt=""
            className="w-60 border border-gray-200 h-36 object-cover rounded-lg "
          />
          {featureImage.url && (
            <p className="text-green-600 text-sm text-center font-semibold">
              Image Uploaded Successfully
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Input
            type="file"
            id="image"
            name="image"
            accept=".png,.jpg,jpeg"
            multiple
            onChange={handleFileChange}
          />
          <Button type="button" onClick={handleUpload}>
            Upload
          </Button>
        </div>
      </div>

      <ClientOnly fallback={<p>Loading Editor, please be patient...</p>}>
        {() => (
          <PlateEditor
            onChange={setContent}
            value={content}
            initialValue={[
              {
                id: "1",
                type: "p",
                children: [{ text: "Hello, World!" }],
              },
            ]}
          />
        )}
      </ClientOnly>
    </ConsoleDetailLayout>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const featureImage = formData.get("featureImage") as string;

  const postController = new PostController(request);
  return await postController.createPost({
    title,
    description,
    slug,
    content: content,
    featureImage: JSON.parse(featureImage),
  });
};

export const meta: MetaFunction = () => {
  return [
    { title: "Blogger. - Create Post" },
    {
      name: "description",
      content: "Blog about anything and everything",
    },
    { name: "og:title", content: "Blogger." },
    {
      name: "og:description",
      content: "Blogger. Blog about anything and everything",
    },
    {
      name: "og:image",
      content:
        "https://media.istockphoto.com/vectors/letter-b-icon-vector-id521527924?k=6&m=521527924&s=612x612&w=0&h=CuLX6X3KP0BxCSI2qMkHu_hS664SH-jUuS3BtCKMCmg=",
    },
    { name: "og:url", content: "" },
  ];
};

const genetateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};
