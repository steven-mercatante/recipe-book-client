import React from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import GearIcon from "./icons/GearIcon";

export default function TopNav() {
  const router = useRouter();
  const { user } = useUser();

  console.log(router.pathname);
  let title;
  switch (router.pathname) {
    case "/recipes":
      title = "Recipes";
      break;
    case "/recipes/[id]/edit":
      title = "Edit Recipe";
      break;
    default:
      title = "";
  }

  return (
    <nav className="top-nav bg-blue-200 fixed top-0 inset-x-0 p-2">
      <ul className="flex justify-between">
        <li className="w-4"></li>
        <li className="text-center">{title}</li>
        <li className="w-4">
          <GearIcon />
        </li>
      </ul>
    </nav>
  );
}
