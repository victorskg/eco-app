import api from "./api";

const createPoint = (data: any) => api.post("points", data);

export default { createPoint };
