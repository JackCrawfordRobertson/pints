import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { IconButton } from '@mui/material'; // Import the IconButton component from Material UI
import HomeIcon from '@mui/icons-material/Home'; // Import the Home icon from Material UI
import styles from '../styles/Map.module.css'; // Import the CSS module
import SlideUpPanel from './SlideUpPanel'; // Import the SlideUpPanel component

mapboxgl.accessToken = "pk.eyJ1IjoiamFja3JvYiIsImEiOiJjanZ1bDBrdjUxYmgyNGJtczlxdWl3MzRuIn0.qla3sSgkkyxIkbYLvVsceA";

const Map = ({ pubs, location }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const userMarker = useRef(null);
  const [selectedPub, setSelectedPub] = useState(null);
  const [isPanelVisible, setPanelVisible] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/jackrob/clz2j7ek700mp01r0g23231fm",
        center: [-0.1276, 51.5074], // Center the map on London
        zoom: 12,
      });
    }

    if (location) {
      const bounds = new mapboxgl.LngLatBounds();

      // Update or add the user's location marker with a custom icon
      if (userMarker.current) {
        userMarker.current.setLngLat([location.longitude, location.latitude]);
      } else {
        const el = document.createElement('div');
        el.className = styles.customMarker; // Use the CSS module class
        el.style.backgroundImage = `url(Launch_Images/Pub.svg)`; // Path to your SVG icon
        el.style.backgroundSize = 'contain'; // Ensure the SVG scales properly
        el.style.width = '50px'; // Adjust size as needed
        el.style.height = '50px'; // Adjust size as needed

        userMarker.current = new mapboxgl.Marker(el)
          .setLngLat([location.longitude, location.latitude])
          .addTo(map.current);
      }

      // Extend bounds with the user's location
      bounds.extend([location.longitude, location.latitude]);

      // Add pubs' locations to bounds and create orange markers for pubs
      pubs.forEach(pub => {
        if (pub.latitude && pub.longitude) {
          bounds.extend([pub.longitude, pub.latitude]);

          // Create an orange marker for each pub
          const marker = new mapboxgl.Marker({ color: '#fab613' }) // Orange color
            .setLngLat([pub.longitude, pub.latitude])
            .addTo(map.current);

          console.log(`Projected pub on map: ${pub.pub_name || 'Unnamed pub'} at [${pub.latitude}, ${pub.longitude}]`);

          // Add click event to open the slide-up panel and center the map on the pub
          marker.getElement().addEventListener('click', () => {
            setSelectedPub(pub);
            setPanelVisible(true);
            map.current.flyTo({
              center: [pub.longitude, pub.latitude],
              zoom: 18, // Adjust the zoom level as needed
              offset: [0, -window.innerHeight / 4], // Offset to center the marker in the top half of the screen
              essential: true // This ensures the animation is considered essential with respect to prefers-reduced-motion
            });
          });
        } else {
          console.warn("Pub missing valid latitude or longitude", pub);
        }
      });

      // Adjust the map to fit the bounds of the user and pubs
      map.current.fitBounds(bounds, { padding: 50 });
    }
  }, [location, pubs]);

  // Function to refresh the page
  const handleReset = () => {
    window.location.reload();
  };

  return (
    <>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
        <IconButton
          onClick={handleReset}
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 1,
            backgroundColor: '#fab613',
            color: 'white',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
          }}
        >
          <HomeIcon />
        </IconButton>
      </div>
      <SlideUpPanel 
        pub={selectedPub} 
        isVisible={isPanelVisible} 
        onClose={() => setPanelVisible(false)}
      />
    </>
  );
};

export default Map;