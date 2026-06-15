import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1/products",
});

export const getProducts = () => api.get("/");
export const getProduct = (id) => api.get(`/${id}`);
export const createProduct = (data) => api.post("/", data);
export const updateProduct = (id, data) => api.put(`/${id}`, data);
export const deleteProduct = (id) => api.delete(`/${id}`);
