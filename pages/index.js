import { useState, useEffect } from 'react';
import { firestore } from '../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Map from '../src/app/components/map/Map';
import DesktopControls from '../src/app/components/DesktopControls/DesktopControls';
import MobileControls from '../src/app/components/mobilecontrols/MobileControls';
import Preload from '../src/app/components/DesktopControls/Preload'; // Import the preload component
import { getDistance } from 'geolib';
import useWindowSize from '../hooks/useWindowSize';
import { AnimatePresence } from 'framer-motion'; // Import AnimatePresence

const Home = () => {
  const [location, setLocation] = useState(null);
  const [pubs, setPubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false); // Default to false initially
  const [user, setUser] = useState(null); // State to hold the logged-in user
  const [isLoaded, setIsLoaded] = useState(false); // Control preload visibility

  const size = useWindowSize();

  // Update isMobileView based on window size
  useEffect(() => {
    setIsMobileView(size.width <= 768);
  }, [size]);

  // Fetch location and pubs only on mobile view
  useEffect(() => {
    if (isMobileView) {
      const requestLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };
              setLocation(userLocation);
              setIsLoading(false);
            },
            (error) => {
              alert("Error obtaining location: " + error.message);
              setIsLoading(false);
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0,
            }
          );
        } else {
          alert("Geolocation is not supported by this browser.");
          setIsLoading(false);
        }
      };

      requestLocation();
    }
  }, [isMobileView]);

  const fetchPubs = async () => {
    if (!location) return;
  
    const pubsCollection = collection(firestore, 'pubs');
    const pubsSnapshot = await getDocs(pubsCollection);
    const pubsData = pubsSnapshot.docs.map(doc => doc.data());
  
    const nearbyPubs = pubsData.filter(pub => {
      // Ensure that the pub has valid latitude and longitude
      if (pub.latitude && pub.longitude && !isNaN(pub.latitude) && !isNaN(pub.longitude)) {
        const distance = getDistance(
          { latitude: location.latitude, longitude: location.longitude },
          { latitude: pub.latitude, longitude: pub.longitude }
        );
        return distance <= 1000; // Nearby pubs within 1km
      } else {
        console.warn("Pub has invalid location data: ", pub);
        return false; // Exclude pubs without valid location data
      }
    });
  
    setPubs(nearbyPubs.slice(0, 4));
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Wrap preload with AnimatePresence */}
      <AnimatePresence>
        {!isLoaded && <Preload setIsLoaded={setIsLoaded} />} {/* Show preload until content is loaded */}
      </AnimatePresence>

      {isLoaded && (
        <>
          {isMobileView ? (
            <>
              <MobileControls fetchPubs={fetchPubs} onUserAuthenticated={setUser} />
              <Map pubs={pubs} location={location} user={user} />
            </>
          ) : (
            <DesktopControls />
          )}
        </>
      )}
    </div>
  );
};

export default Home;