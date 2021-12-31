import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import HomeIcon from "./icons/HomeIcon";
import BookmarkIcon from "./icons/BookmarkIcon";
import SearchIcon from "./icons/SearchIcon";
import { Routes } from "../constants";

export default function BottomNav() {
  const router = useRouter();
  const { user } = useUser();

  if (!user) return null;

  if (router.pathname === Routes.EditRecipe) {
    return (
      <div className="bottom-nav flex justify-center bg-red-200 fixed bottom-0 inset-x-0 p-3">
        <button className="px-4 py-1 border-2 border-red-600 rounded-md">
          Save
        </button>
      </div>
    );
  }

  return (
    <div className="bottom-nav bg-red-200 fixed bottom-0 inset-x-0 p-3">
      <ul className="flex place-content-evenly">
        <li>
          <Link href="/recipes">
            <a>
              <HomeIcon />
            </a>
          </Link>
        </li>
        <li>
          <a>
            <BookmarkIcon />{" "}
          </a>
        </li>
        <li>
          <a>
            {" "}
            <SearchIcon />{" "}
          </a>
        </li>
      </ul>
    </div>
  );
}
