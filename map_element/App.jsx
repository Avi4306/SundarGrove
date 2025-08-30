import MangroveMap from "./map";

const markers = [
  { position: [23.0225, 72.5714], popup: "Ahmedabad" },
  { position: [19.076, 72.8777], popup: "Mumbai" },
];

export default function App() {
  return (
    <div style={{ height: "100vh", width: "100vh" }}>
          <MangroveMap geoJsonPath="/mangrove_india.geojson" markers={markers} />
    </div>
  );
}
