// _app.js
import '../src/app/styles/globals.css'; // Import global styles
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify
import { ToastContainer } from 'react-toastify'; // Import ToastContainer

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      {/* ToastContainer is placed here so that it can capture toast notifications globally */}
      <ToastContainer
        position="top-center" // Position of the toast notifications
        autoClose={3000} // Duration in milliseconds for which the toast will be displayed
        hideProgressBar={false} // Whether to show the progress bar
        newestOnTop={false} // Whether to show newest toasts on top
        closeOnClick // Whether to close the toast on click
        rtl={false} // Whether to display the toast in right-to-left direction
        pauseOnFocusLoss // Whether to pause the toast on focus loss
        draggable // Whether the toast can be dragged
        pauseOnHover // Whether to pause the toast on hover
      />
    </>
  );
}

export default MyApp;
