"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css";
import nmp_mapboxgl from "@neshan-maps-platform/mapbox-gl";

const PostLocation = ({ lng, lat }) => {
  const [zoom, setZoom] = useState(9);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const { provinceLng, provinceLat } = useSelector((state) => state.province);

  useEffect(() => {
    if (typeof lng !== "number" || typeof lat !== "number") {
      return;
    }

    mapRef.current = new nmp_mapboxgl.Map({
      mapType: nmp_mapboxgl.Map.mapTypes.neshanVector,
      container: mapContainerRef.current,
      zoom: zoom,
      pitch: 0,
      center: [provinceLng, provinceLat],
      minZoom: 2,
      maxZoom: 21,
      trackResize: true,
      mapKey: "web.781d97dfbed14304909f5a84097f7a2f",
      poi: true,
      traffic: true,
      mapTypeControllerOptions: {
        show: false,
        position: "bottom-left",
      },
    });

    // Add marker to the map
    markerRef.current = new nmp_mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(mapRef.current);

    // Clean up on unmount
    return () => {
      markerRef.current.remove();
      mapRef.current.remove();
    };
  }, [provinceLng, provinceLat, lng, lat]);

  useEffect(() => {
    // Update map zoom when zoom state changes
    if (mapRef.current) {
      mapRef.current.setZoom(zoom);
    }
  }, [zoom]);

  return (
    <div className="py-4">
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "280px", position: "relative" }}
      >
        {/* <MapButton setZoom={setZoom} /> */}
      </div>
    </div>
  );
};

export default memo(PostLocation);
