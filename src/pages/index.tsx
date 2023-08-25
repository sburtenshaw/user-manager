import Head from "next/head";

import { Flowbite } from "flowbite-react";

import Home from "./_home";

function Index() {
  return (
    <>
      <Head>
        <title>User Manager</title>
        <meta name="description" content="Simple user manager app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flowbite>
        <Home />
      </Flowbite>
    </>
  );
}

export default Index;
