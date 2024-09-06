// pages/_document.js
import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes"></meta>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        <link rel="manifest" href="/site.webmanifest" />
        
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />

        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#fab613" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
