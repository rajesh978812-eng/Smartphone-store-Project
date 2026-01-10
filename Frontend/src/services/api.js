import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1"
 
});

export const fetchProducts = () => API.get("/products");
export const createOrder = (cartItems) =>
  API.post("/order",cartItems );

