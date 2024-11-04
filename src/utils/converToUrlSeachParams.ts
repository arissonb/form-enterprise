import { FormData } from "../view/components/Form";

export const convertTo = (value: Partial<FormData> ) => {
  return new URLSearchParams(value).toString();
}