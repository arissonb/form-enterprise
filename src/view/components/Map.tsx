import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import Modal from "./Modal";
// interface para entidade empresa
import { ICompany } from "../../entities/ICompany";
// array de todas as empresas salvas no localstorage
import { allCompanies } from "./entities/companies";

export default function Map() {
  // variavel state para salvar os dados da empresa e mostrar no modal
  const [company, setCompany] = useState<ICompany>();
  // variavel state para abrir e fechar o modal
  const [openModal, setOpenModal] = useState(false);
  // variavel para definir uma localizacao padrao para o mapa
  const defaultPosition = [-29.683892450000002 , -51.4579451] as LatLngExpression ;

  // funcao para abrir o modal e mostrar os dados da empresa
  const handleOpenModal = (company: ICompany) => {
    setCompany(company)
    setOpenModal(true)
  };

  // funcao para fechar o modal 
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

