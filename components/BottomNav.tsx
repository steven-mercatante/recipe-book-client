import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

export default function BottomNav() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="bottom-nav bg-red-200 fixed bottom-0 inset-x-0 p-4">
      <ul className="flex place-content-evenly">
        <li>
          <Link href="/recipes">Recipes</Link>
        </li>
        <li>Favorites</li>
        <li>Search</li>
      </ul>
    </div>
  );
}
