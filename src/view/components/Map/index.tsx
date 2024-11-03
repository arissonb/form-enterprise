import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import Modal from "../Modal";
import { ICompany } from "../../../entities/ICompany";
import { allCompanies } from "../entities/companies";

export default function Map() {
  const [company, setCompany] = useState<ICompany>();
  const [openModal, setOpenModal] = useState(false);
  const defaultPosition = [-29.683892450000002 , -51.4579451] as LatLngExpression ;

  const handleOpenModal = (company: ICompany) => {
    setCompany(company)
    setOpenModal(true)
  };

  const handleClose = () => setOpenModal(false);
  return (
    <>
      <Modal openModal={openModal} company={company} handleClose={handleClose} />
      <MapContainer center={defaultPosition} zoom={13} style={{ height: "100vh" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {allCompanies.length > 0 &&
          allCompanies?.map((company, index) => (
            <Marker
              key={index}
              position={company?.location}
              eventHandlers={{
                click: () => handleOpenModal(company)
              }}>
            </Marker>
          ))
        }
      </MapContainer>
    </>
  );
};

