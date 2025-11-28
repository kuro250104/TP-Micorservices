// src/lib/api.ts

export type RestaurantItem = {
    id: number;
    name: string;
    price: number;
    image?: string;
};

export type Restaurant = {
    id: number;
    name: string;
    category?: string;
    image?: string;
    rating?: number;
    deliveryTime?: number;
    deliveryFee?: number;
    items?: RestaurantItem[];
};

export type OrderItemPayload = {
    name: string;
    price: number;
    quantity: number;
};

export type CreateOrderPayload = {
    userId: number;
    restaurantId: number;
    items: OrderItemPayload[];
};

export type Order = {
    id: number;
    userId: number;
    restaurantId: number;
    items: OrderItemPayload[];
    totalPrice: number;
    status: "pending" | "accepted" | "delivering" | "delivered" | "canceled";
    createdAt: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5555";

async function http<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${url}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
        },
        ...options,
    });

    if (!res.ok) {
        const text = await res.text();
        console.error("API error:", res.status, text);
        throw new Error(`API error ${res.status}: ${text}`);
    }

    return res.json();
}

// GET /restaurants
export async function fetchRestaurants(): Promise<Restaurant[]> {
    return http<Restaurant[]>("/restaurants");
}

// GET /orders
export async function fetchOrders(): Promise<Order[]> {
    return http<Order[]>("/orders");
}

// POST /orders
export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
    return http<Order>("/orders", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}