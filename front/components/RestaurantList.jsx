import { useEffect, useState } from "react";
import { fetchRestaurants } from "../api/api";

export default function RestaurantList() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetchRestaurants().then((res) => setRestaurants(res.data));
    }, []);

    return (
        <div>
            <h2>Restaurants</h2>
            <ul>
                {restaurants.map(r => (
                    <li key={r.id}>
                        {r.name} – {r.category}
                    </li>
                ))}
            </ul>
        </div>
    );
}
