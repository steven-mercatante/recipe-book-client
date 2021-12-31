import React from "react";
import { useUser } from "@auth0/nextjs-auth0";

export default function TopNav() {
  const { user } = useUser();

  return (
    <nav className="top-nav bg-blue-200 fixed top-0 inset-x-0 p-2">
      <ul className="flex justify-evenly">
        {!user && (
          <li>
            <a href="/api/auth/login">Login</a>
          </li>
        )}
        {user && (
          <li>
            <a href="/api/auth/logout">Logout</a>
          </li>
        )}
      </ul>
    </nav>
  );
}
