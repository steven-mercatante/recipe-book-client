import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import Nav from "components/Nav";
import "styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const { user } = pageProps;

  return (
    <>
      <Head>
        <title>Recipes</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <UserProvider user={user}>
        <Nav />
        <div className="container p-4">
          <Component {...pageProps} />
        </div>
      </UserProvider>
    </>
  );
}
