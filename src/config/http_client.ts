const baseUrl = "https://nominatim.openstreetmap.org";

async function Get(params: string) {
  return await fetch(baseUrl + params, {
    method: "GET"
  });
}

export const HttpClient = {
  Get
};
