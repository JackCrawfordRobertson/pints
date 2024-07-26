import { useState, useEffect } from 'react';
import { firestore } from '../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Map from '../src/app/components/Map';
import FloatingControls from '../src/app/components/FloatingControls';
import MobileControls from '../src/app/components/MobileControls';
import { getDistance } from 'geolib';

const centralLondonBounds = {
  north: 51.532,
  south: 51.477,
  west: -0.143,
  east: -0.01
};

const isWithinCentralLondon = (latitude, longitude) => {
  return (
    latitude <= centralLondonBounds.north &&
    latitude >= centralLondonBounds.south &&
    longitude >= centralLondonBounds.west &&
    longitude <= centralLondonBounds.east
  );
};

const Home = () => {
  const [location, setLocation] = useState(null);
  const [pubs, setPubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInCentralLondon, setIsInCentralLondon] = useState(true);

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

            if (!isWithinCentralLondon(userLocation.latitude, userLocation.longitude)) {
              setIsInCentralLondon(false);
            }
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

    const pubsCollection = collection(firestore, 'pubs');
    const pubsSnapshot = await getDocs(pubsCollection);
    const pubsData = pubsSnapshot.docs.map(doc => doc.data());

    const nearbyPubs = pubsData.filter(pub => {
      if (typeof pub.latitude !== 'number' || typeof pub.longitude !== 'number') {
        console.warn("Pub missing valid latitude or longitude", pub);
        return false;
      }

      if (typeof location.latitude !== 'number' || typeof location.longitude !== 'number') {
        console.warn("Location missing valid latitude or longitude", location);
        return false;
      }

      const distance = getDistance(
        { latitude: location.latitude, longitude: location.longitude },
        { latitude: pub.latitude, longitude: pub.longitude }
      );
      return distance <= 3000;
    });

    nearbyPubs.sort((a, b) => parseFloat(a.pint_price.replace('£', '')) - parseFloat(b.pint_price.replace('£', '')));
    setPubs(nearbyPubs.slice(0, 3));
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {isInCentralLondon ? (
        <>
          <FloatingControls fetchPubs={fetchPubs} isLoading={isLoading} />
          <Map pubs={pubs} location={location} />
        </>
      ) : (
        <MobileControls
          message="Sorry, we are not in your area yet."
          onButtonClick={() => setIsInCentralLondon(true)}
        />
      )}
    </div>
  );
};

export default Home;
