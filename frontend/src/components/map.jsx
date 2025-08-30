 
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
import FloatingNavBar from "./Home/FloatingNavBar";

// ✅ Marker icon fix
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Custom colored marker icons
const iconColors = {
  pending: 'blue',
  confirmed: 'green',
  flagged: 'red',
};
const statusIcons = {
  pending: L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${iconColors.pending}.png`,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
  confirmed: L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${iconColors.confirmed}.png`,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
  flagged: L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${iconColors.flagged}.png`,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
};

/**
 * Standalone Map component
 * @param {string} geoJsonPath - path to GeoJSON file (must be in public/)
 * @param {Array} markers - array of marker objects: [{ position: [lat, lng], popup: "text" }]
 */
const MangroveMap = ({ geoJsonPath, markers = [], initialPosition = [23.0225, 72.5714], initialZoom = 6 }) => {
  const mapRef = useRef(null);

  // GeoJSON state
  const [mangroveData, setMangroveData] = useState(null);
  const [loading, setLoading] = useState(true);
 useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Fetch GeoJSON once
  useEffect(() => {
    setLoading(true);
    if (!geoJsonPath) return;
    fetch(geoJsonPath)
      .then((response) => {
        if (!response.ok) throw new Error("GeoJSON not found");
        return response.json();
      })
      .then((data) => setMangroveData(data))
      .catch((error) => console.error("Error fetching mangrove data:", error));
  }, [geoJsonPath]);

  // Wait for both mangroveData and markers to be ready
  useEffect(() => {
    if (mangroveData && markers) {
      setLoading(false);
    }
  }, [mangroveData, markers]);

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

  if (loading) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-[url('./src/assets/SG-1.jpg')] bg-cover bg-center">
        <FloatingNavBar/>
        <div className="flex flex-col items-center justify-center h-full w-full px-4">
          <div className="text-xl sm:text-2xl text-green-700 font-bold animate-pulse mb-4 text-center">Loading map and data...</div>
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[url('./src/assets/SG-1.jpg')] bg-cover bg-center">
      {/* Overlay for gradient and blur */}
      <FloatingNavBar/>
      <div className="relative m-1 sm:m-2 pt-8 sm:pt-12 inset-0"></div>
      <div className="relative z-10 w-full flex flex-col items-center justify-center py-6 sm:py-12 px-4 sm:px-8 lg:px-16">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-emerald-800 to-green-700 bg-clip-text text-transparent text-center leading-tight drop-shadow-lg">
          Mangrove Map
        </h1>
        {/* Animated total reports */}
        <div className="mb-3 sm:mb-4 flex items-center justify-center">
          <span className="text-xl sm:text-2xl font-bold text-green-800 animate-bounce mr-2">{markers.length}</span>
          <span className="text-base sm:text-lg text-green-700">Total Reports</span>
        </div>
        <p className="mb-4 sm:mb-8 text-sm sm:text-lg text-green-900 text-center max-w-xs sm:max-w-xl bg-white/60 rounded-xl px-3 sm:px-4 py-2 shadow">
          Explore mangrove regions and see reports region-wise. Click markers for details.
        </p>
        
        {/* Responsive map container */}
        <div className="w-full max-w-6xl rounded-xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden border border-emerald-200/60 bg-white/80 backdrop-blur-lg">
          <div className="h-[50vh] sm:h-[60vh] md:h-[70vh] w-full">
            <MapContainer
              center={initialPosition}
              zoom={initialZoom}
              ref={mapRef}
              style={{ height: "100%", width: "100%" }}
              className="z-0"
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
                <Marker key={idx} position={marker.position} icon={statusIcons[marker.status] || statusIcons.pending}>
                  {marker.popup && (
                    <Popup>
                      <div className="text-xs sm:text-sm max-w-xs">
                        <strong>Place:</strong> {marker.popup.place}<br />
                        <strong>Threat:</strong> {marker.popup.threat}<br />
                        <strong>Status:</strong> <span className={`font-bold ${marker.status === 'confirmed' ? 'text-green-600' : marker.status === 'flagged' ? 'text-red-600' : 'text-blue-600'}`}>{marker.status}</span><br />
                        {marker.popup.image && (
                          <img src={marker.popup.image} alt="Reported" className="mt-2 w-20 sm:w-24 rounded-lg shadow" />
                        )}
                      </div>
                    </Popup>
                  )}
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
      
      {/* Responsive floating legend box for pin color codes */}
      <div className="fixed bottom-4 sm:bottom-8 right-2 sm:right-8 z-50 bg-white/80 sm:bg-white/60 backdrop-blur-lg rounded-lg sm:rounded-xl shadow-lg px-3 sm:px-6 py-3 sm:py-4 flex flex-col gap-1.5 sm:gap-2 border border-emerald-200/60 max-w-[180px] sm:max-w-none" style={{minWidth:'160px'}}>
        <h2 className="text-sm sm:text-lg font-bold text-green-900 mb-1 sm:mb-2">Report Status</h2>
        <div className="flex items-center gap-2 sm:gap-3">
          <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png" alt="Pending" className="w-4 h-6 sm:w-5 sm:h-8" />
          <span className="text-blue-700 font-semibold text-xs sm:text-sm">Pending</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png" alt="Confirmed" className="w-4 h-6 sm:w-5 sm:h-8" />
          <span className="text-green-700 font-semibold text-xs sm:text-sm">Confirmed</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png" alt="Flagged/False" className="w-4 h-6 sm:w-5 sm:h-8" />
          <span className="text-red-700 font-semibold text-xs sm:text-sm">Flagged/False</span>
        </div>
      </div>
    </div>
  );
};

export default MangroveMap;