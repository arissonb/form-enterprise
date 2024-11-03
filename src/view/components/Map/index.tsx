import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import Modal from "../Modal";
import { ILocation } from "../../../entities/ILocation";

export default function Map() {
  const [location, setLocation] = useState<ILocation>();
  const [openModal, setOpenModal] = useState(false);
  const keys = Object.keys(localStorage).filter(key => key.startsWith('empresa:'));
  const todos = keys.map(key => JSON.parse(localStorage.getItem(key)));
  const position = todos[0].location as LatLngExpression;

  const handleOpenModal = (location: ILocation) => {
    setLocation(location)
    setOpenModal(true)
  };

  const handleClose = () => setOpenModal(false);

  return (
    <>
      <Modal openModal={openModal} location={location} handleClose={handleClose} />

      <MapContainer center={position} zoom={13} style={{ height: "100vh" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {
          todos.map((location, index) => (
            <Marker
              key={index}
              position={location.location}
              eventHandlers={{
                click: () => handleOpenModal(location)
              }}>
            </Marker>
          ))
        }
      </MapContainer>
    </>
  );
};

