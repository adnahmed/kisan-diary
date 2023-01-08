// import { lazy } from "react";
// import { ClientOnly } from "remix-utils";
// const MapContainer = lazy(async () => {
//   const reactLeaflet = await import("react-leaflet");
//   return {
//     default: reactLeaflet.MapContainer,
//   };
// });
// const TileLayer = lazy(async () => {
//   const reactLeaflet = await import("react-leaflet");
//   return {
//     default: reactLeaflet.TileLayer,
//   };
// });
// const Marker = lazy(() => {
//   const reactLeaflet = await import("react-leaflet");
//   return {
//     default: reactLeaflet.Marker,
//   };
// });
// const Popup = lazy(async () => {
//   const reactLeaflet = await import("react-leaflet");
//   return {
//     default: reactLeaflet.Popup,
//   };
// });

export default function PublicDashboard() {
  //   map.setView([45, -106], 4);
  //   L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //     maxZoom: 19,
  //   }).addTo(map);
  //   var circle = L.circle([45, -106], {
  //     color: "red",
  //     fillColor: "hotpink",
  //     fillOpacity: 0.5,
  //     radius: 500090,
  //   }).addTo(map);

  //   const popup = L.popup();
  //   function onMapClick(e) {
  //     popup.setLatLng(e.latlng).setContent(e.latlng.toString()).openOn(map);
  //   }
  //   map.on("click", onMapClick);
  //   var geojsonMarkerOptions = {
  //     radius: 8,
  //     fillColor: "#ff7800",
  //     color: "#000",
  //     weight: 1,
  //     opacity: 1,
  //     fillOpacity: 0.8,
  //   };
  //   var geojsonFeature = {
  //     type: "Feature",
  //     properties: {
  //       name: "Coors Field",
  //       amenity: "Baseball Stadium",
  //       popupContent: "This is where the Rockies play!",
  //     },
  //     geometry: {
  //       type: "Point",
  //       coordinates: [45, -106],
  //     },
  //   };
  //   L.geoJSON(geojsonFeature, {
  //     pointToLayer: function (feature, latlng) {
  //       return L.circleMarker(latlng, geojsonMarkerOptions);
  //     },
  //   }).addTo(map);

  //   var myLines = [
  //     {
  //       type: "LineString",
  //       coordinates: [
  //         [-100, 40],
  //         [-105, 45],
  //         [-110, 55],
  //       ],
  //     },
  //     {
  //       type: "LineString",
  //       coordinates: [
  //         [-105, 40],
  //         [-110, 45],
  //         [-115, 55],
  //       ],
  //     },
  //   ];

  //   var myStyle = {
  //     color: "#990",
  //     weight: 9,
  //     opacity: 0.65,
  //   };

  //   L.geoJSON(myLines, {
  //     style: myStyle,
  //   }).addTo(map);

  //   var states = [
  //     {
  //       type: "Feature",
  //       properties: { party: "Republican" },
  //       geometry: {
  //         type: "Polygon",
  //         coordinates: [
  //           [
  //             [-104.05, 48.99],
  //             [-97.22, 48.98],
  //             [-96.58, 45.94],
  //             [-104.03, 45.94],
  //             [-104.05, 48.99],
  //           ],
  //         ],
  //       },
  //     },
  //     {
  //       type: "Feature",
  //       properties: { party: "Democrat" },
  //       geometry: {
  //         type: "Polygon",
  //         coordinates: [
  //           [
  //             [-109.05, 41.0],
  //             [-102.06, 40.99],
  //             [-102.03, 36.99],
  //             [-109.04, 36.99],
  //             [-109.05, 41.0],
  //           ],
  //         ],
  //       },
  //     },
  //   ];

  //   L.geoJSON(states, {
  //     style: function (feature) {
  //       switch (feature.properties.party) {
  //         case "Republican":
  //           return { color: "#ff00f0" };
  //         case "Democrat":
  //           return { color: "#1fff" };
  //       }
  //     },
  //   }).addTo(map);
  //   function onEachFeature(feature, layer) {
  //     // does this feature have a property named popupContent?
  //     if (feature.properties && feature.properties.popupContent) {
  //       layer.bindPopup(feature.properties.popupContent);
  //     }
  //   }
  //   const geojsonFeature: GeoJsonObject = {
  //     type: "Feature",
  //     properties: {
  //       name: "Coors Field",
  //       amenity: "Baseball Stadium",
  //       popupContent: "This is where the Rockies play!",
  //     },
  //     geometry: {
  //       type: "Point",
  //       coordinates: [-104.99404, 39.75621],
  //     },
  //   };
  //   L.geoJSON(geojsonFeature, {
  //     onEachFeature: onEachFeature,
  //   }).addTo(map);
  //   var someFeatures = [
  //     {
  //       type: "Feature",
  //       properties: {
  //         name: "Coors Field",
  //         show_on_map: true,
  //       },
  //       geometry: {
  //         type: "Point",
  //         coordinates: [-104.99404, 39.75621],
  //       },
  //     },
  //     {
  //       type: "Feature",
  //       properties: {
  //         name: "Busch Field",
  //         show_on_map: false,
  //       },
  //       geometry: {
  //         type: "Point",
  //         coordinates: [-104.98404, 39.74621],
  //       },
  //     },
  //   ];

  //   L.geoJSON(someFeatures, {
  //     filter: function (feature, layer) {
  //       return feature.properties.show_on_map;
  //     },
  //   }).addTo(map);

  return (
    <div className="dashboard dashboard--public">
      {/* <ClientOnly fallback={<div>Loading...</div>}>
        {() => (
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </ClientOnly> */}
    </div>
  );
}
