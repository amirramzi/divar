"use client";

import { Button, ButtonGroup } from "@mui/material";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const MapButton = ({ setZoom }) => {
  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setMarkerPosition({ lng: longitude, lat: latitude });
        mapRef.current.flyTo({ center: [longitude, latitude], zoom: 14 });
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const incrementZoomHandler = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 1, 21));
  };

  const decrementZoomHandler = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 1, 2));
  };
  return (
    <div className="absolute bottom-[22px] left-3 z-10">
      <ButtonGroup
        orientation="vertical"
        aria-label="Vertical button group"
        variant="contained"
        size="small"
      >
        <Button onClick={incrementZoomHandler}>
          <AddIcon fontSize="small" />
        </Button>
        <Button onClick={decrementZoomHandler}>
          <RemoveIcon fontSize="small" />
        </Button>
        <Button onClick={handleGeolocation}>
          <MyLocationOutlinedIcon fontSize="small" />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default MapButton;
