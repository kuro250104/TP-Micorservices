import axios from "axios";

const API = "http://localhost:5555";

export const fetchUsers = () => axios.get(`${API}/users`);
export const fetchRestaurants = () => axios.get(`${API}/restaurants`);
export const fetchOrders = () => axios.get(`${API}/orders`);

export const createOrder = (data) =>
    axios.post(`${API}/orders`, data);

export const updateOrderStatus = (id, status) =>
    axios.patch(`${API}/orders/${id}/status`, { status });
