import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import TopNav from "components/TopNav";
import BottomNav from "components/BottomNav";
import "styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Recipes</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SessionProvider session={pageProps.session}>
        {/*<TopNav />*/}
        <div className="container p-4 mt-12 mb-12">
          <Component {...pageProps} />
        </div>
        <p className="text-center">
          <small>Version: {process.env.NEXT_PUBLIC_APP_VERSION ?? "n/a"}</small>
        </p>
        {/*<BottomNav />*/}
      </SessionProvider>
    </>
  );
}
