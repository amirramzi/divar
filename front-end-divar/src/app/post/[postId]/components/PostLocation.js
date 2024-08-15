"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css";
import nmp_mapboxgl from "@neshan-maps-platform/mapbox-gl";
import MapButton from "./MapButton";
import callApi from "@/services/callApi";

const PostLocation = ({ lng, lat, address }) => {
  // const [cityLng, setCityLng] = useState(null);
  // const [cityLat, setCityLat] = useState(null);
  const [zoom, setZoom] = useState(9);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const { provinceLng, provinceLat } = useSelector((state) => state.province);

  useEffect(
    () => {
      if (typeof lng !== "number" || typeof lat !== "number") {
        return;
      }

      mapRef.current = new nmp_mapboxgl.Map({
        mapType: nmp_mapboxgl.Map.mapTypes.neshanVector,
        container: mapContainerRef.current,
        zoom: zoom,
        pitch: 0,
        // center: [cityLng || provinceLng, cityLat || provinceLat],
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

      markerRef.current = new nmp_mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(mapRef.current);

      return () => {
        markerRef.current.remove();
        mapRef.current.remove();
      };
    }, //[provinceLng, provinceLat, cityLat, cityLng, lng, lat]);
    [provinceLng, provinceLat, lng, lat]
  );

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setZoom(zoom);
    }
  }, [zoom]);
  // useEffect(() => {
  //   const getLatLngProvince = async () => {
  //     try {
  //       const result = await callApi().post("/province/cities", {
  //         city: address?.city,
  //       });
  //       if (result.status == 200) {
  //         setCityLng(result?.data[0].longitude);
  //         setCityLat(result?.data[0].latitude);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getLatLngProvince();
  // }, [address]);
  return (
    <div className="py-4 ">
      <div
        className="w-full h-[280px] relative rounded-lg overflow-hidden"
        ref={mapContainerRef}
      >
        <MapButton setZoom={setZoom} />
      </div>
    </div>
  );
};

export default memo(PostLocation);
