import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import HomeIcon from "./icons/HomeIcon";
import BookmarkIcon from "./icons/BookmarkIcon";
import SearchIcon from "./icons/SearchIcon";

export default function BottomNav() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="bottom-nav bg-red-200 fixed bottom-0 inset-x-0 p-4">
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
