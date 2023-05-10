import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

const MapSelector = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = (event) => {
    setSelectedLocation({
      lat: event.latlng.lat,
      lng: event.latlng.lng,
    });
  };

  const LocationMarker = () => {
    const map = useMapEvents({
      click: handleMapClick,
    });

    return selectedLocation ? (
      <Marker
        position={[selectedLocation.lat, selectedLocation.lng]}
        draggable={true}
        eventHandlers={{
          dragend: (e) => {
            const { lat, lng } = e.target.getLatLng();
            setSelectedLocation({ lat, lng });
          },
        }}
      />
    ) : null;
  };

  return (
    <div>
      <h2>Select Location</h2>
      <MapContainer center={[0, 0]} zoom={2} style={{ height: "400px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data &copy; OpenStreetMap contributors"
        />
        <LocationMarker />
      </MapContainer>
      {selectedLocation && (
        <div>
          <h3>Selected Location:</h3>
          <p>Latitude: {selectedLocation.lat}</p>
          <p>Longitude: {selectedLocation.lng}</p>
        </div>
      )}
    </div>
  );
};

export default MapSelector;
