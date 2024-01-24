import {
  type LoaderFunction,
  type ActionFunction,
  type MetaFunction,
} from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import ConsoleLayout from "~/layouts/console";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import PostController from "~/server/controllers/PostController";
import type { CategoryDocument, SectionDocument } from "~/server/types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function CreateBlog() {
  const submit = useSubmit();
  const { categories, sections } = useLoaderData<{
    categories: CategoryDocument[];
    sections: SectionDocument[];
  }>();
  const [newSection, setNewSection] = useState([]);

  useEffect(() => {
    let newArray = [];
    sections.forEach((section) => {
      let secCat = categories.filter((category) => {
        return category.section?._id == section._id;
      });

      newArray.push({
        ...section,
        categories: secCat,
      });
      return true;
    });

    setNewSection(newArray);
  }, [categories, sections]);

  return (
    <ConsoleLayout className="gap-5 ">
      <section className="flex gap-3 w-full">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Add Section
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Section</DialogTitle>
              {/* <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription> */}
            </DialogHeader>
            <Form method="POST" className="flex flex-col gap-3">
              <input type="hidden" name="actionType" value="new_section" />
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" type="text" />
              </div>

              <Button type="submit" className="ml-auto">
                Save
              </Button>
            </Form>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Category</DialogTitle>
              {/* <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription> */}
            </DialogHeader>
            <Form method="POST" className="flex flex-col gap-3">
              <input type="hidden" name="actionType" value="new_category" />

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" type="text" />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Input id="description" type="text" name="description" />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="section">Section</Label>

                <Select name="section">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {sections.map((section) => (
                        <SelectItem key={section?._id} value={section?._id}>
                          {" "}
                          {section.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="ml-auto">
                Save
              </Button>
            </Form>
          </DialogContent>
        </Dialog>
      </section>

      <div className="grid grid-cols-2 gap-3">
        {newSection.map((section, index) => (
          <div key={index} className="flex flex-col gap-3">
            <div
              key={index}
              className="flex flex-col bg-muted shadow-lg p-3 rounded-lg"
            >
              <p className="font-semibold">{section.title}</p>
              <div className="ml-auto flex gap-3">
                <Button
                // onClick={() =>
                //   submit(
                //     {
                //       actionType: "unlist",
                //       section: comment?._id,
                //     },
                //     {
                //       method: "POST",
                //     }
                //   )
                // }
                >
                  Update
                </Button>
                <Button
                  variant="destructive"
                  onClick={() =>
                    submit(
                      {
                        actionType: "delete_section",
                        sectionId: section?._id,
                      },
                      {
                        method: "POST",
                      }
                    )
                  }
                >
                  Delete
                </Button>
              </div>
            </div>

            <div className="ml-11 flex flex-col gap-2">
              {section.categories.map((category, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-muted shadow-lg p-3 rounded-lg"
                >
                  <p className="font-semibold">{category.title}</p>
                  <p className="ml-11">{category.description}</p>

                  <div className="ml-auto flex gap-3">
                    <Button
                    // onClick={() =>
                    //   submit(
                    //     {
                    //       actionType: "unlist",
                    //       category: comment?._id,
                    //     },
                    //     {
                    //       method: "POST",
                    //     }
                    //   )
                    // }
                    >
                      Update
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() =>
                        submit(
                          {
                            actionType: "delete",
                            categoryId: category?._id,
                          },
                          {
                            method: "POST",
                          }
                        )
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <section className="hidden  flex-col gap-3">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col bg-muted shadow-lg p-3 rounded-lg"
            >
              <p className="font-semibold">{category.title}</p>
              <p className="ml-11">{category.description}</p>

              <div className="ml-auto flex gap-3">
                <Button
                // onClick={() =>
                //   submit(
                //     {
                //       actionType: "unlist",
                //       category: comment?._id,
                //     },
                //     {
                //       method: "POST",
                //     }
                //   )
                // }
                >
                  Update
                </Button>
                <Button
                  variant="destructive"
                  onClick={() =>
                    submit(
                      {
                        actionType: "delete",
                        categoryId: category?._id,
                      },
                      {
                        method: "POST",
                      }
                    )
                  }
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </ConsoleLayout>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const section = formData.get("section") as string;
  const actionType = formData.get("actionType") as string;
  const categoryId = formData.get("categoryId") as string;
  const sectionId = formData.get("sectionId") as string;

  const postController = new PostController(request);
  if (actionType == "delete") {
    return await postController.deleteCategory(categoryId);
  } else if (actionType == "delete_section") {
    return await postController.deleteSection(sectionId);
  } else if (actionType == "new_section") {
    return await postController.createSection({
      title,
      description,
    });
  } else if (actionType == "new_category") {
    return await postController.createCategory({
      title,
      description,
      section,
    });
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const postController = new PostController(request);
  const categories = await postController.getCategories();
  const sections = await postController.getSections();

  return { categories, sections };
};

export const meta: MetaFunction = () => {
  return [
    { title: "Penrobes - Categories" },
    {
      name: "description",
      content: "Blog about anything and everything",
    },
    { property: "og:title", content: "Penrobes" },
    {
      name: "og:description",
      content: "Penrobes Blog about anything and everything",
    },
    {
      name: "og:image",
      content:
        "https://tinyblogger.vercel.app/build/_assets/Penrodes_icon_logo-19-5CJYJWAK.png",
    },
    { name: "og:url", content: "" },
  ];
};
