import Head from "next/head";
import React from "react";
import Header from "../Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>PollMaker</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container px-8 py-4">
        <Header />
        <main>{children}</main>
      </div>
    </>
  );
}
