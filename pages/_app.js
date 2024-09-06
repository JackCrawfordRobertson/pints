// _app.js
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Import MUI theme provider
import CssBaseline from '@mui/material/CssBaseline'; // For consistent baseline styles
import '../src/app/styles/globals.css'; // Import global styles
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify
import { ToastContainer } from 'react-toastify'; // Import ToastContainer

// Create a custom theme that overrides Material UI's default typography
const theme = createTheme({
  typography: {
    fontFamily: `'Inter', sans-serif`, // Override MUI's default font with Inter
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures consistent base styles */}
      <Component {...pageProps} />
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
    </ThemeProvider>
  );
}

export default MyApp;