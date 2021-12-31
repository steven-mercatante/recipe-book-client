import React from "react";
import { useRouter } from "next/router";
import GearIcon from "./icons/GearIcon";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";

export default function TopNav() {
  const router = useRouter();

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
    <nav className="top-nav bg-blue-200 fixed top-0 inset-x-0 px-4 py-3">
      <ul className="flex justify-between">
        <li className="w-4">
          <ArrowLeftIcon />
        </li>
        <li className="text-center">{title}</li>
        <li className="w-4">
          <GearIcon />
        </li>
      </ul>
    </nav>
  );
}
