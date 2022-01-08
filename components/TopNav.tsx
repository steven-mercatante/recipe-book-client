import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import GearIcon from "./icons/GearIcon";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";
import { Routes } from "../constants";

export default function TopNav() {
  const router = useRouter();
  const { user } = useUser();

  if (!user) return null;

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
          <Link href="/api/auth/logout" passHref>
            <GearIcon />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
