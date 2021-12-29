import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

export default function Nav() {
  const { user, error, isLoading } = useUser();

  return (
    <nav>
      {user && <Link href="/recipes">Recipes</Link>}
      <a href="/api/auth/login">Login</a>
      {user && <a href="/api/auth/logout">Logout</a>}
      {user && <p>Welcome {user.name}</p>}
    </nav>
  );
}
