'use client';

import { useState, useEffect } from 'react';
import { firestore } from '../../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Map from '../../src/app/components/map/Map';
import DesktopControls from '../../src/app/components/DesktopControls/DesktopControls';
import MobileControls from '../../src/app/components/mobilecontrols/MobileControls';
import Preload from '../../src/app/components/DesktopControls/Preload';
import { getDistance } from 'geolib';
import useWindowSize from '../../hooks/useWindowSize';
import { AnimatePresence } from 'framer-motion';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const centralLondon = {
  latitude: 51.5074,
  longitude: -0.1278,
};

// Styled components for the outside area message
const BackgroundContainer = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#fab613', // Solid yellow background
  zIndex: 999,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 40px', // Add padding for some space
  boxSizing: 'border-box',
});

const MessageContainer = styled(Box)({
  width: '50%', // Adjust to fit the message and illustration layout
  textAlign: 'left',
  fontWeight: 'bold',
});

const IllustrationContainer = styled(Box)({
  width: '40%', // Set width of the SVG illustration container
  display: 'flex',
  justifyContent: 'flex-end', // Align the SVG to the right
});

const Home = () => {
  const [location, setLocation] = useState(null);
  const [pubs, setPubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOutsideArea, setIsOutsideArea] = useState(false);

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

              const distanceToCentralLondon = getDistance(
                userLocation,
                centralLondon
              );

              // Check if the user is more than 10 miles (16093.4 meters) away from central London
              if (distanceToCentralLondon > 16093.4) {
                setIsOutsideArea(true);
              } else {
                setIsOutsideArea(false);
              }
            },
            (error) => {
              alert('Error obtaining location: ' + error.message);
              setIsLoading(false);
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0,
            }
          );
        } else {
          alert('Geolocation is not supported by this browser.');
          setIsLoading(false);
        }
      };

      // Test Location outside of London
      /*
      const requestLocation = () => {
        // Simulate a location more than 10 miles away from central London
        const testLocation = {
          latitude: 51.4074, // Example coordinates
          longitude: -0.3278, // Example coordinates
        };
        setLocation(testLocation);
        setIsLoading(false);

        const distanceToCentralLondon = getDistance(
          testLocation,
          centralLondon
        );

        // Check if the user is more than 10 miles (16093.4 meters) away from central London
        if (distanceToCentralLondon > 16093.4) {
          setIsOutsideArea(true);
        } else {
          setIsOutsideArea(false);
        }
      };
      */

      requestLocation();
    }
  }, [isMobileView]);

  const fetchPubs = async () => {
    if (!location) return;

    const pubsCollection = collection(firestore, 'pubs');
    const pubsSnapshot = await getDocs(pubsCollection);
    const pubsData = pubsSnapshot.docs.map((doc) => doc.data());

    const nearbyPubs = pubsData.filter((pub) => {
      // Ensure that the pub has valid latitude and longitude
      if (
        pub.latitude &&
        pub.longitude &&
        !isNaN(pub.latitude) &&
        !isNaN(pub.longitude)
      ) {
        const distance = getDistance(
          { latitude: location.latitude, longitude: location.longitude },
          { latitude: pub.latitude, longitude: pub.longitude }
        );
        return distance <= 5000; // Nearby pubs within 1km
      } else {
        console.warn('Pub has invalid location data: ', pub);
        return false; // Exclude pubs without valid location data
      }
    });

    setPubs(nearbyPubs.slice(0, 4));
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Wrap preload with AnimatePresence */}
      <AnimatePresence>
        {!isLoaded && <Preload setIsLoaded={setIsLoaded} />}
      </AnimatePresence>

      {isLoaded && (
        <>
          {isMobileView ? (
            <>
              {isOutsideArea ? (
                <BackgroundContainer>
                  <IllustrationContainer>
                    <img
                      src="/Launch_Images/Welcome.svg"
                      alt="Illustration"
                      style={{ maxWidth: '100%', height: 'auto' }} // Set the desired width
                    />
                  </IllustrationContainer>
                  <MessageContainer>
                    <Typography
                      variant="h2"
                      gutterBottom
                      style={{
                        fontWeight: 'bold',
                        fontSize: '1.9rem',
                        color: '#000333',
                        lineHeight: '.9',
                      }} // Adjust the font size and color
                    >
                      Sorry, we are not quite in your area yet.
                    </Typography>
                    <Typography
                      variant="h5"
                      style={{ fontSize: '1rem', color: '#000333' }} // Slightly bigger and apply the same color
                    >
                      Check back soon!
                    </Typography>
                  </MessageContainer>
                </BackgroundContainer>
              ) : (
                <>
                  <MobileControls
                    fetchPubs={fetchPubs}
                    onUserAuthenticated={setUser}
                  />
                  <Map pubs={pubs} location={location} user={user} />
                </>
              )}
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