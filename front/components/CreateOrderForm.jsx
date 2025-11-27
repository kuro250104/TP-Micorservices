import { useState } from "react";
import { createOrder } from "../api/api";

export default function CreateOrderForm({ onCreated }) {
    const [userId, setUserId] = useState(1);
    const [restaurantId, setRestaurantId] = useState(1);
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState(10);
    const [items, setItems] = useState([]);

    const addItem = () => {
        setItems([...items, { name: itemName, price: Number(itemPrice), quantity: 1 }]);
        setItemName("");
    };

    const create = () => {
        createOrder({ userId, restaurantId, items }).then(() => {
            setItems([]);
            if (onCreated) onCreated();
        });
    };

    return (
        <div>
            <h2>Create Order</h2>

            <input type="number" value={userId} onChange={e => setUserId(e.target.value)} placeholder="User ID" />
            <input type="number" value={restaurantId} onChange={e => setRestaurantId(e.target.value)} placeholder="Restaurant ID" />

            <div>
                <input value={itemName} onChange={e => setItemName(e.target.value)} placeholder="Item name" />
                <input type="number" value={itemPrice} onChange={e => setItemPrice(e.target.value)} />
                <button onClick={addItem}>Add item</button>
            </div>

            <ul>
                {items.map((i, idx) => (
                    <li key={idx}>{i.name} – {i.price}€</li>
                ))}
            </ul>

            <button onClick={create}>Create Order</button>
        </div>
    );
}
