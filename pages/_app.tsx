import React from "react";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import Nav from "components/Nav";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const { user } = pageProps;

  return (
    <UserProvider user={user}>
      <Nav />
      <Component {...pageProps} />
    </UserProvider>
  );
}
