import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import UserController from "~/server/controllers/UserController";

export const action: ActionFunction = async ({ request }) => {
  const adminAuthControlle = await new UserController(request);
  return await adminAuthControlle.logout();
};

export const loader = async () => redirect("/home");
