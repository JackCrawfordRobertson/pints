import React from 'react';
import CustomThemeProvider from './ThemeProvider';
import '../../src/app/styles/globals.css'; // Adjust the path if necessary
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// Metadata configuration (replaces the Head section in _document.js)
// app/layout.js

export const metadata = {
  title: 'Pints - Find the Cheapest Pints Near You in Central London',
  description:
    'Pints helps you discover the cheapest pints within 1000 meters around you in Central London. Save money and enjoy your favorite drinks at the best prices.',
  keywords: [
    'Pints',
    'Cheap Pints',
    'Find Pubs',
    'Central London',
    'Cheapest Drinks',
    'Beer Prices',
    'Jack Robertson',
    'Pubs Near Me',
    'Affordable Pints',
    'London Bars',
  ],
  authors: [{ name: 'Jack Robertson', url: 'https://jack-robertson.co.uk/' }],
  openGraph: {
    title: 'Pints - Find the Cheapest Pints in Central London',
    description:
      'Discover and enjoy the cheapest pints around you in Central London with Pints. Your guide to affordable pubs within walking distance.',
    url: 'https://pints.jack-robertson.co.uk/', // Replace with your actual app domain
    siteName: 'Pints',
    images: [
      {
        url: 'https://res.cloudinary.com/dfsznxwhz/image/upload/v1728569556/TwtierImage_uapo2u.svg', // Replace with your Open Graph image URL
        width: 1200,
        height: 630,
        alt: 'Pints App Logo',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@JackRobertso', // Replace with your Twitter handle
    creator: '@JackRobertso',
    title: 'Pints - Find the Cheapest Pints Near You',
    description:
      'Use Pints to find the most affordable pints within 1000 meters in Central London. Cheers to savings!',
    images: ['https://res.cloudinary.com/dfsznxwhz/image/upload/v1728569556/TwtierImage_uapo2u.svg'], // Replace with your Twitter image URL
  },
  icons: {
    icon: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
    ],
    appleTouchIcon: '/apple-touch-icon.png',
    maskIcon: '/safari-pinned-tab.svg',
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileColor': '#da532c',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'mobile-web-app-capable': 'yes',
  },
};

export const viewport = {
  themeColor: '#fab613', // Move themeColor here
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts and any additional head tags can be placed here */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Add viewport meta tags */}
        <meta name="theme-color" content={viewport.themeColor} />
      </head>
      <body>
        <CustomThemeProvider>
          {children}
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </CustomThemeProvider>
      </body>
    </html>
  );
}