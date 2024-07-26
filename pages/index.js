import { useState, useEffect } from 'react';
import { firestore } from '../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Map from '../src/app/components/Map';
import DesktopControls from '../src/app/components/DesktopControls';
import MobileControls from '../src/app/components/MobileControls';
import { getDistance } from 'geolib';
import useWindowSize from '../hooks/useWindowSize';

const Home = () => {
  const [location, setLocation] = useState(null);
  const [pubs, setPubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(true); // Default to mobile view
  const size = useWindowSize();

  useEffect(() => {
    if (size.width > 768) {
      setIsMobileView(false);
    }
  }, [size]);

  useEffect(() => {
    const requestLocation = () => {
      console.log("Requesting user location...");

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setLocation(userLocation);
            console.log("User location obtained:", userLocation);
            setIsLoading(false);
          },
          (error) => {
            console.error("Error obtaining location:", error);
            alert("Error obtaining location: " + error.message);
            setIsLoading(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000, // Increased timeout for better accuracy
            maximumAge: 0,
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        alert("Geolocation is not supported by this browser.");
        setIsLoading(false);
      }
    };

    requestLocation();
  }, []);

  const fetchPubs = async () => {
    if (!location) return;

    console.log("Fetching pubs from Firestore...");

    const pubsCollection = collection(firestore, 'pubs');
    const pubsSnapshot = await getDocs(pubsCollection);
    const pubsData = pubsSnapshot.docs.map(doc => doc.data());

    console.log("Pubs data from Firestore:", pubsData);

    const validPubsData = pubsData.filter(pub => {
      const isValid = typeof pub.latitude === 'number' && typeof pub.longitude === 'number';
      if (!isValid) {
        console.warn("Invalid pub data (missing latitude or longitude):", pub);
      }
      return isValid;
    });

    console.log("Valid pubs data:", validPubsData);

    const nearbyPubs = validPubsData.filter(pub => {
      const distance = getDistance(
        { latitude: location.latitude, longitude: location.longitude },
        { latitude: pub.latitude, longitude: pub.longitude }
      );

      console.log(`Distance to pub "${pub.pub_name || 'Unnamed pub'}" (${pub.latitude}, ${pub.longitude}): ${distance} meters`);

      return distance <= 4000; // Adjusted distance for testing
    });

    console.log("Nearby pubs within 4km:", nearbyPubs);

    nearbyPubs.sort((a, b) => parseFloat(a.pint_price.replace('£', '')) - parseFloat(b.pint_price.replace('£', '')));

    console.log("Sorted nearby pubs by price:", nearbyPubs);

    setPubs(nearbyPubs.slice(0, 4));
    console.log("Final nearby pubs:", nearbyPubs.slice(0, 4));
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {isMobileView ? (
        <MobileControls fetchPubs={fetchPubs} />
      ) : (
        <DesktopControls fetchPubs={fetchPubs} isLoading={isLoading} />
      )}
      <Map pubs={pubs} location={location} />
    </div>
  );
};

export default Home;
