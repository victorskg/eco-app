import api from "./api";

const getPoints = (params?: any) =>
  api.get("points", {
    params,
  });

const getPointById = (id: number) => api.get(`points/${id}`);

export default { getPoints, getPointById };
