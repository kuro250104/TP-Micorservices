import { useEffect, useState } from "react";
import { fetchOrders, updateOrderStatus } from "../api/api";

export default function OrderList() {
    const [orders, setOrders] = useState([]);

    const refresh = () => {
        fetchOrders().then((res) => setOrders(res.data));
    };

    useEffect(() => {
        refresh();
    }, []);

    const handleStatus = (id, status) => {
        updateOrderStatus(id, status).then(refresh);
    };

    return (
        <div>
            <h2>Orders</h2>
            <ul>
                {orders.map(o => (
                    <li key={o.id}>
                        <strong>Order {o.id}</strong> – {o.status}<br />
                        Total: {o.totalPrice} €<br />
                        <button onClick={() => handleStatus(o.id, "accepted")}>Accept</button>
                        <button onClick={() => handleStatus(o.id, "delivering")}>Delivering</button>
                        <button onClick={() => handleStatus(o.id, "delivered")}>Delivered</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
