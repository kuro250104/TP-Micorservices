const API_URL = "http://localhost:5555";

export async function fetchUsers() {
    const res = await fetch(`${API_URL}/users`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
}

export async function fetchRestaurants() {
    const res = await fetch(`${API_URL}/restaurants`);
    if (!res.ok) throw new Error("Failed to fetch restaurants");
    return res.json();
}

export async function fetchOrders() {
    const res = await fetch(`${API_URL}/orders`);
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
}

export async function createOrder(data) {
    const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create order");
    return res.json();
}

export async function updateOrderStatus(id, status) {
    const res = await fetch(`${API_URL}/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to update status");
    return res.json();
}
