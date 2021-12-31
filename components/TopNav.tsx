import React from "react";
import { useRouter } from "next/router";
import GearIcon from "./icons/GearIcon";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";
import { Routes } from "../constants";

export default function TopNav() {
  const router = useRouter();

  console.log(router.pathname);
  let title;
  switch (router.pathname) {
    case Routes.ViewRecipes:
      title = "Recipes";
      break;
    case Routes.EditRecipe:
      title = "Edit Recipe";
      break;
    default:
      title = "";
  }

  return (
    <nav className="top-nav bg-blue-200 fixed top-0 inset-x-0 px-4 py-2">
      <ul className="flex justify-between">
        <li className="w-4">
          <button onClick={() => router.back()}>
            <ArrowLeftIcon />
          </button>
        </li>
        <li className="text-center">{title}</li>
        <li className="w-4">
          <GearIcon />
        </li>
      </ul>
    </nav>
  );
}
