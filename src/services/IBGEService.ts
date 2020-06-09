import axios from "axios";

const api = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades",
});

const getStates = () => api.get("estados");

const getStateCities = (state: string) =>
  api.get(`estados/${state}/municipios`);

export default { getStates, getStateCities };
