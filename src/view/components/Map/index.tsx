import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "./style.css";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import Modal from "../Modal";
import { useState } from "react";

export default function Map() {

  const [empresa, setImpresa] = useState('');
  const [enable, setEnable] = useState(false);
  const position = [51.505, -0.09] as LatLngExpression;
  // const keys = Object.keys(localStorage).filter(key => key.startsWith('empresa'));
  // const todos = keys.map(key => JSON.parse(localStorage.getItem(key)));

  console.log(localStorage.getItem('empresa'));

  // function MultipleMarkers() {
  //   return todos.map((location) => {
  //     return <Marker key={location.place_id} position={[location.lat, location.lon] as LatLngExpression} eventHandlers={{
  //       click: () => teste(location),
  //     }}></Marker>;
  //   });
  // }

  console.log(enable);
  

  const locations = [
    { id: 1, position: [51.505, -0.09] as LatLngExpression, name: "Local 1" },
    { id: 2, position: [51.51, -0.1] as LatLngExpression, name: "Local 2" },
    { id: 3, position: [51.515, -0.08] as LatLngExpression, name: "Local 3" },
  ];



  const handleClose = () => setEnable(false);

  function teste(location) {
    // console.log(location);
    // console.log(location);
    setEnable(true)
    setImpresa(location)

  }
  return (
    <>
      <Modal enable={enable} empresa={empresa} handleClose={handleClose} />

      <MapContainer center={position} zoom={13} style={{ height: "100vh" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {
          locations.map((location, index) => (
            <Marker
              key={index}
              position={location.position}
              eventHandlers={{
                click: () => teste(location)
              }}>
            </Marker>
          ))
        }


      </MapContainer>
    </>
  );
};

