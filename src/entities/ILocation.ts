import { LatLngExpression } from "leaflet";

export interface ILocation {
  id: number;
  position: LatLngExpression;
  name: string;
}