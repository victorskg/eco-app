import api from "./api";
import Item from "../models/item";

const getItems = () => api.get<Item[]>("items");

export default { getItems };
