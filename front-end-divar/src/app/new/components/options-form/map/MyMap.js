"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import "@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css";
import nmp_mapboxgl from "@neshan-maps-platform/mapbox-gl";

import MapButton from "./MapButton";
import LocationInput from "./LocationInput";

const MyMap = () => {
  const [markerPosition, setMarkerPosition] = useState({
    lng: 51.391173,
    lat: 35.700954,
  });
  const [zoom, setZoom] = useState(11);
  const [saveAddress, setSaveAddress] = useState(false);
  const [cancelAddress, setCancelAddress] = useState(false);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize the map only once
    mapRef.current = new nmp_mapboxgl.Map({
      mapType: nmp_mapboxgl.Map.mapTypes.neshanVector,
      container: mapContainerRef.current,
      zoom: zoom,
      pitch: 0,
      center: [51.389, 35.6892],
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
    markerRef.current = new nmp_mapboxgl.Marker({
      draggable: !cancelAddress,
    })
      .setLngLat([markerPosition.lng, markerPosition.lat])
      .addTo(mapRef.current);

    const handleDragEnd = () => {
      const lngLat = markerRef.current.getLngLat();
      setMarkerPosition({ lng: lngLat.lng, lat: lngLat.lat });
      setSaveAddress(true);
    };

    const handleMapClick = (e) => {
      const { lng, lat } = e.lngLat;
      markerRef.current.setLngLat([lng, lat]);
      setMarkerPosition({ lng, lat });
      setSaveAddress(true);
    };

    if (!cancelAddress) {
      // Update marker position on drag end
      markerRef.current.on("dragend", handleDragEnd);

      // Update marker position on map click
      mapRef.current.on("click", handleMapClick);
    }

    // Clean up on unmount
    return () => {
      markerRef.current.remove();
      mapRef.current.remove();
    };
  }, [cancelAddress]);

  useEffect(() => {
    // Update marker position when markerPosition state changes
    if (markerRef.current) {
      markerRef.current.setLngLat([markerPosition.lng, markerPosition.lat]);
    }
  }, [markerPosition]);

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
        <MapButton setZoom={setZoom} />
      </div>

      <LocationInput
        markerPosition={markerPosition}
        saveAddress={saveAddress}
        setSaveAddress={setSaveAddress}
        cancelAddress={cancelAddress}
        setCancelAddress={setCancelAddress}
      />
    </div>
  );
};

export default memo(MyMap);
