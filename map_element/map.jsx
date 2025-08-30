import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Marker icon fix
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

/**
 * Standalone Map component
 * @param {string} geoJsonPath - path to GeoJSON file (must be in public/)
 * @param {Array} markers - array of marker objects: [{ position: [lat, lng], popup: "text" }]
 */
const MangroveMap = ({ geoJsonPath, markers = [], initialPosition = [23.0225, 72.5714], initialZoom = 8 }) => {
  const mapRef = useRef(null);

  // GeoJSON state
  const [mangroveData, setMangroveData] = useState(null);

  // Fetch GeoJSON once
  useEffect(() => {
    if (!geoJsonPath) return;

    fetch(geoJsonPath)
      .then((response) => {
        if (!response.ok) throw new Error("GeoJSON not found");
        return response.json();
      })
      .then((data) => setMangroveData(data))
      .catch((error) => console.error("Error fetching mangrove data:", error));
  }, [geoJsonPath]);

  // Style for mangroves
  const mangroveStyle = {
    fillColor: "green",
    fillOpacity: 0.6,
    color: "darkgreen",
    weight: 1,
  };

  // Function for GeoJSON feature popups
  const onEachFeature = (feature, layer) => {
    if (feature.properties?.name) {
      layer.bindPopup(`<strong>Mangrove:</strong> ${feature.properties.name}`);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={initialPosition}
        zoom={initialZoom}
        ref={mapRef}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Base layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Render GeoJSON if loaded */}
        {mangroveData && (
          <GeoJSON data={mangroveData} style={mangroveStyle} onEachFeature={onEachFeature} />
        )}

        {/* Render markers passed via props */}
        {markers.map((marker, idx) => (
          <Marker key={idx} position={marker.position}>
            {marker.popup && <Popup><div>
      <strong>Place:</strong> {marker.popup.place}<br />
      <strong>Threat:</strong> {marker.popup.threat}<br />
      {marker.popup.image && (
        <img src={marker.popup.image} alt="Reported" style={{ width: "100px", borderRadius: "8px" }} />
      )}
    </div></Popup>}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MangroveMap;
