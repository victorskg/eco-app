import api from "./api";

const getPoints = (params?: { city: string; uf: string; items: number[] }) =>
  api.get("points", {
    params,
  });

const getPointById = (id: number) => api.get(`points/${id}`);

export default { getPoints, getPointById };
