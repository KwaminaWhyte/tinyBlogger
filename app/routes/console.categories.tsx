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
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function CreateBlog() {
  const submit = useSubmit();
  const { categories, sections } = useLoaderData<{
    categories: CategoryDocument[];
    sections: SectionDocument[];
  }>();
  const [withSection, setWithSection] = useState([]);
  const [noSection, setNoSection] = useState([]);

  const [newCatDialog, setNewCatDialog] = useState(false);
  const [updateCatDialog, setUpdateCatDialog] = useState(false);
  const [updateCat2Dialog, setUpdateCat2Dialog] = useState(false);

  const [newSecDialog, setNewSecDialog] = useState(false);
  const [updateSecDialog, setUpdateSecDialog] = useState(false);

  useEffect(() => {
    let newArray = [];
    let withNoSection = [];

    let noSecCat = categories.filter((category) => {
      return !category.section?._id;
    });
    withNoSection.push(...noSecCat);

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

    setWithSection(newArray);
    setNoSection(withNoSection);
    setUpdateCatDialog(false);
    setUpdateCat2Dialog(false);
    setNewCatDialog(false);
    setUpdateSecDialog(false);
    setNewSecDialog(false);
  }, [categories, sections]);

  return (
    <ConsoleLayout className="gap-8">
      <section className="flex gap-3 w-full">
        <Dialog
          open={newSecDialog}
          onOpenChange={() => setNewSecDialog(!newSecDialog)}
        >
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Add Section
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Section</DialogTitle>
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

        <Dialog
          open={newCatDialog}
          onOpenChange={() => setNewCatDialog(!newCatDialog)}
        >
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Category</DialogTitle>
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

      <section className="">
        <p className="text-lg font-semibold">Categories with Section</p>
        <div className="grid grid-cols-2 gap-3">
          {withSection.map((section, index) => (
            <div key={index} className="flex flex-col gap-3">
              <div
                key={index}
                className="flex flex-col bg-muted shadow-lg p-3 rounded-lg"
              >
                <p className="font-semibold">{section.title}</p>
                <div className="ml-auto flex gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Update
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Update Section</DialogTitle>
                      </DialogHeader>
                      <Form method="POST" className="flex flex-col gap-3">
                        <input
                          type="hidden"
                          name="actionType"
                          value="update_section"
                        />
                        <input type="hidden" name="_id" value={section?._id} />
                        <div className="grid w-full items-center gap-1.5">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            name="title"
                            type="text"
                            defaultValue={section.title}
                          />
                        </div>

                        <Button type="submit" className="ml-auto">
                          Update
                        </Button>
                      </Form>
                    </DialogContent>
                  </Dialog>
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full">
                            Update
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Update Category</DialogTitle>
                          </DialogHeader>
                          <Form method="POST" className="flex flex-col gap-3">
                            <input
                              type="hidden"
                              name="actionType"
                              value="update_category"
                            />
                            <input
                              type="hidden"
                              name="_id"
                              value={category?._id}
                            />
                            <div className="grid w-full items-center gap-1.5">
                              <Label htmlFor="title">Title</Label>
                              <Input
                                id="title"
                                name="title"
                                type="text"
                                defaultValue={category.title}
                              />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                              <Label htmlFor="description">Description</Label>
                              <Input
                                id="description"
                                type="text"
                                name="description"
                                defaultValue={category.description}
                              />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                              <Label htmlFor="section">Section</Label>

                              <Select
                                name="section"
                                defaultValue={category.section?._id}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a section" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {sections.map((section) => (
                                      <SelectItem
                                        key={section?._id}
                                        value={section?._id}
                                      >
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
        </div>
      </section>

      <section className="">
        <p className="text-lg font-semibold">Categories without Section</p>
        <div className="grid grid-cols-2 gap-3">
          {noSection.map((category, index) => (
            <div
              key={index}
              className="flex flex-col bg-muted shadow-lg p-3 rounded-lg"
            >
              <p className="font-semibold">{category.title}</p>
              <p className="ml-11">{category.description}</p>

              <div className="ml-auto flex gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Update
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Update Category</DialogTitle>
                    </DialogHeader>
                    <Form method="POST" className="flex flex-col gap-3">
                      <input
                        type="hidden"
                        name="actionType"
                        value="update_category"
                      />
                      <input type="hidden" name="_id" value={category?._id} />
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          name="title"
                          type="text"
                          defaultValue={category.title}
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          type="text"
                          name="description"
                          defaultValue={category.description}
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="section">Section</Label>

                        <Select
                          name="section"
                          defaultValue={category.section?._id}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a section" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {sections.map((section) => (
                                <SelectItem
                                  key={section?._id}
                                  value={section?._id}
                                >
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
      </section>
    </ConsoleLayout>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const _id = formData.get("_id") as string;
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
  } else if (actionType == "update_section") {
    return await postController.updateSection({
      _id,
      title,
      description,
    });
  } else if (actionType == "new_category") {
    return await postController.createCategory({
      title,
      description,
      section,
    });
  } else if (actionType == "update_category") {
    return await postController.updateCategory({
      _id,
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
    { title: "Categories | Penrobes" },
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
