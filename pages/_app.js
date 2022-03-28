import React from "react";
import ReactDOM from "react-dom";

import Head from "next/head";
import Router from "next/router";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from "next-auth/react"
import { theme } from '../theme';
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  //const Layout = Component.layout || (({ children }) => <>{children}</>);
  const getLayout = Component.getLayout ?? ((page) => page);

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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </LocalizationProvider>

    </SessionProvider>
  )
}

