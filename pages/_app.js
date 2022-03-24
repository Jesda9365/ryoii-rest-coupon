import React from "react";
import ReactDOM from "react-dom";

import Head from "next/head";
import Router from "next/router";

import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <SessionProvider session={session}>
      
        <Head>
        <title>Ryoii Admin</title>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <footer>
        
      </footer>
    </SessionProvider>
  )
}

