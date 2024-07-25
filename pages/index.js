import { useState, useEffect } from 'react';
import { firestore } from '../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import axios from 'axios';
import Map from '../src/app/components/Map';
import FloatingControls from '../src/app/components/FloatingControls';
import { getDistance } from 'geolib';

const Home = () => {
  const [location, setLocation] = useState(null);
  const [pubs, setPubs] = useState([]);

  const requestLocation = async () => {
    console.log("Request location button clicked");

    try {
      const response = await axios.post(
        `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );
      const userLocation = {
        latitude: response.data.location.lat,
        longitude: response.data.location.lng,
      };
      setLocation(userLocation);
      console.log("User location obtained:", userLocation);
    } catch (error) {
      console.error("Error obtaining location:", error);
    }
  };

  useEffect(() => {
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

    fetchPubs();
  }, [location]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <FloatingControls requestLocation={requestLocation} />
      <Map pubs={pubs} location={location} />
    </div>
  );
};

export default Home;
