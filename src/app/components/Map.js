// components/Map.js
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
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
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/jackrob/clz1ftvj900ju01pc7078frv0",
      center: [-0.1276, 51.5074], // Center the map on London
      zoom: 12,
    });
  }, []);

  useEffect(() => {
    if (map.current && location) {
      const bounds = new mapboxgl.LngLatBounds();

      // Update or add the user's location marker
      if (userMarker.current) {
        userMarker.current.setLngLat([location.longitude, location.latitude]);
      } else {
        userMarker.current = new mapboxgl.Marker({ color: '#e67e22' })
          .setLngLat([location.longitude, location.latitude])
          .addTo(map.current);
      }
      
      // Extend bounds with the user's location
      bounds.extend([location.longitude, location.latitude]);

      // Add pubs' locations to bounds and create markers with custom SVG icons
      pubs.forEach(pub => {
        if (pub.latitude && pub.longitude) {
          bounds.extend([pub.longitude, pub.latitude]);

          // Create a custom HTML element for the marker
          const el = document.createElement('div');
          el.className = styles.customMarker; // Use the CSS module class
          el.style.backgroundImage = `url(/pub.svg)`; // Path to your SVG icon
          el.style.backgroundSize = 'contain'; // Ensure the SVG scales properly
          el.style.width = '70px'; // Adjust size as needed
          el.style.height = '70px'; // Adjust size as needed

          const marker = new mapboxgl.Marker(el)
            .setLngLat([pub.longitude, pub.latitude])
            .addTo(map.current);

          // Add click event to open the slide-up panel
          marker.getElement().addEventListener('click', () => {
            setSelectedPub(pub);
            setPanelVisible(true);
          });
        } else {
          console.warn("Pub missing valid latitude or longitude", pub);
        }
      });

      // Adjust the map to fit the bounds of the user and pubs
      map.current.fitBounds(bounds, { padding: 50 });
    }
  }, [location, pubs]);

  return (
    <>
      <div id="map" ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      <SlideUpPanel 
        pub={selectedPub} 
        isVisible={isPanelVisible} 
        onClose={() => setPanelVisible(false)}
      />
    </>
  );
};

export default Map;