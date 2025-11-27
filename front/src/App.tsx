import { useEffect, useState, useMemo } from "react"
import {
    fetchUsers,
    fetchRestaurants,
    fetchOrders,
    createOrder,
    updateOrderStatus,
} from "./lib/api"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Package, User, UtensilsCrossed, ShoppingBag } from "lucide-react"

function StatusBadge({ status }) {
    const baseClass = "px-2 py-0.5 text-xs rounded-full capitalize"

    if (status === "pending") {
        return <span className={`${baseClass} bg-amber-500/10 text-amber-300 border border-amber-500/40`}>{status}</span>
    }
    if (status === "accepted") {
        return <span className={`${baseClass} bg-blue-500/10 text-blue-300 border border-blue-500/40`}>{status}</span>
    }
    if (status === "delivering") {
        return <span className={`${baseClass} bg-purple-500/10 text-purple-300 border border-purple-500/40`}>{status}</span>
    }
    if (status === "delivered") {
        return <span className={`${baseClass} bg-emerald-500/10 text-emerald-300 border border-emerald-500/40`}>{status}</span>
    }

    return <span className={`${baseClass} bg-red-500/10 text-red-300 border border-red-500/40`}>{status}</span>
}

function GlassCard({ title, icon, children, className = "" }) {
    const Icon = icon
    return (
        <Card className={`border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-xl ${className}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-slate-800/80 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-sky-300" />
                    </div>
                    <CardTitle className="text-sm font-semibold text-slate-100">{title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    )
}

function UsersCard({ users }) {
    return (
        <GlassCard title="Users" icon={User} className="h-full">
            <ScrollArea className="max-h-60 pr-2">
                <div className="space-y-2">
                    {users.map((u) => (
                        <div
                            key={u.id}
                            className="flex items-center justify-between rounded-lg border border-white/5 bg-slate-900/60 px-3 py-2 text-xs"
                        >
                            <div>
                                <p className="font-medium text-slate-100">{u.name}</p>
                                <p className="text-[10px] text-slate-400">id: {u.id}</p>
                            </div>
                            <Badge variant="outline" className="border-sky-500/40 bg-sky-500/5 text-[10px] uppercase tracking-wide">
                                {u.role}
                            </Badge>
                        </div>
                    ))}
                    {users.length === 0 && (
                        <p className="text-xs text-slate-500">No users</p>
                    )}
                </div>
            </ScrollArea>
        </GlassCard>
    )
}

function RestaurantsCard({ restaurants }) {
    return (
        <GlassCard title="Restaurants" icon={UtensilsCrossed} className="h-full">
            <ScrollArea className="max-h-60 pr-2">
                <div className="space-y-2">
                    {restaurants.map((r) => (
                        <div
                            key={r.id}
                            className="rounded-lg border border-white/5 bg-slate-900/60 px-3 py-2 text-xs flex flex-col gap-1"
                        >
                            <div className="flex items-center justify-between">
                                <p className="font-medium text-slate-100">{r.name}</p>
                                {r.rating && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-500/40">
                    {r.rating.toFixed(1)} ★
                  </span>
                                )}
                            </div>
                            <p className="text-[11px] text-slate-400">
                                {r.cuisine} – {r.city}
                            </p>
                        </div>
                    ))}
                    {restaurants.length === 0 && (
                        <p className="text-xs text-slate-500">No restaurants</p>
                    )}
                </div>
            </ScrollArea>
        </GlassCard>
    )
}

function CreateOrderCard({ users, restaurants, onCreated }) {
    const [userId, setUserId] = useState("")
    const [restaurantId, setRestaurantId] = useState("")
    const [itemName, setItemName] = useState("")
    const [itemPrice, setItemPrice] = useState("")
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)

    const total = useMemo(
        () => items.reduce((sum, i) => sum + i.price * (i.quantity ?? 1), 0),
        [items]
    )

    const addItem = () => {
        if (!itemName || !itemPrice) return
        setItems([
            ...items,
            { name: itemName, price: Number(itemPrice), quantity: 1 },
        ])
        setItemName("")
        setItemPrice("")
    }

    const handleCreate = async () => {
        if (!userId || !restaurantId || items.length === 0) return
        try {
            setLoading(true)
            await createOrder({
                userId: Number(userId),
                restaurantId: Number(restaurantId),
                items,
            })
            setItems([])
            setItemName("")
            setItemPrice("")
            if (onCreated) onCreated()
        } finally {
            setLoading(false)
        }
    }

    return (
        <GlassCard title="Create Order" icon={ShoppingBag}>
            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                        <p className="text-[11px] text-slate-400">User</p>
                        <Select value={userId} onValueChange={setUserId}>
                            <SelectTrigger className="h-8 text-xs bg-slate-900/80 border-white/10">
                                <SelectValue placeholder="Select user" />
                            </SelectTrigger>
                            <SelectContent>
                                {users.map((u) => (
                                    <SelectItem key={u.id} value={String(u.id)}>
                                        {u.name} ({u.role})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1.5">
                        <p className="text-[11px] text-slate-400">Restaurant</p>
                        <Select value={restaurantId} onValueChange={setRestaurantId}>
                            <SelectTrigger className="h-8 text-xs bg-slate-900/80 border-white/10">
                                <SelectValue placeholder="Select restaurant" />
                            </SelectTrigger>
                            <SelectContent>
                                {restaurants.map((r) => (
                                    <SelectItem key={r.id} value={String(r.id)}>
                                        {r.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Separator className="bg-white/5" />

                <div className="space-y-2">
                    <p className="text-[11px] text-slate-400">Items</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Input
                            placeholder="Item name"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            className="h-8 text-xs bg-slate-900/80 border-white/10"
                        />
                        <Input
                            type="number"
                            placeholder="Price"
                            value={itemPrice}
                            onChange={(e) => setItemPrice(e.target.value)}
                            className="h-8 text-xs bg-slate-900/80 border-white/10 sm:w-24"
                        />
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addItem}
                            className="h-8 text-xs border-sky-500/60 text-sky-300 hover:bg-sky-500/10"
                        >
                            Add
                        </Button>
                    </div>

                    <div className="space-y-1 mt-1 max-h-28 overflow-auto pr-1">
                        {items.map((i, idx) => (
                            <div
                                key={idx}
                                className="flex justify-between text-[11px] border border-white/5 bg-slate-900/70 rounded px-2 py-1"
                            >
                                <span>{i.name}</span>
                                <span>{i.price.toFixed(2)} €</span>
                            </div>
                        ))}
                        {items.length === 0 && (
                            <p className="text-[11px] text-slate-500">No items yet</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between text-xs mt-1">
                        <span className="text-slate-400">Total</span>
                        <span className="font-semibold text-sky-300">
              {total.toFixed(2)} €
            </span>
                    </div>
                </div>

                <Button
                    type="button"
                    className="w-full h-8 text-xs bg-sky-500 hover:bg-sky-400"
                    onClick={handleCreate}
                    disabled={loading || !userId || !restaurantId || items.length === 0}
                >
                    {loading ? "Creating..." : "Create Order"}
                </Button>
            </div>
        </GlassCard>
    )
}

function OrdersCard({ orders, onStatusChange }) {
    const statuses = ["pending", "accepted", "delivering", "delivered"]

    return (
        <GlassCard title="Orders" icon={Package} className="col-span-1 md:col-span-3">
            <ScrollArea className="max-h-[420px] pr-2">
                <div className="space-y-3">
                    {orders.map((o) => (
                        <div
                            key={o.id}
                            className="border border-white/5 bg-slate-900/70 rounded-xl p-3 text-xs flex flex-col gap-1"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-slate-100">
                                        Order #{o.id}
                                    </p>
                                    <p className="text-[11px] text-slate-400">
                                        User {o.userId} • Restaurant {o.restaurantId}
                                    </p>
                                </div>
                                <StatusBadge status={o.status} />
                            </div>

                            <div className="mt-1">
                                <p className="text-[11px] text-slate-400 mb-1">Items</p>
                                <ul className="text-[11px] list-disc list-inside text-slate-200 space-y-0.5">
                                    {o.items?.map((item, idx) => (
                                        <li key={idx}>
                                            {item.name} – {item.price}€ x {item.quantity ?? 1}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                <span className="text-[11px] text-slate-400">
                  Total:{" "}
                    <span className="font-semibold text-sky-300">
                    {o.totalPrice} €
                  </span>
                </span>
                                <div className="flex flex-wrap gap-1">
                                    {statuses.map((s) => (
                                        <Button
                                            key={s}
                                            size="xs"
                                            variant={s === o.status ? "default" : "outline"}
                                            className={`h-7 text-[10px] ${
                                                s === o.status
                                                    ? "bg-sky-500 border-sky-400 text-slate-950"
                                                    : "border-white/15 bg-slate-900/80 text-slate-200 hover:bg-slate-800"
                                            }`}
                                            onClick={() => onStatusChange(o.id, s)}
                                        >
                                            {s}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                    {orders.length === 0 && (
                        <p className="text-sm text-slate-500">No orders</p>
                    )}
                </div>
            </ScrollArea>
        </GlassCard>
    )
}

export default function App() {
    const [users, setUsers] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [orders, setOrders] = useState([])

    const refreshOrders = async () => {
        const data = await fetchOrders()
        setOrders(data)
    }

    useEffect(() => {
        ;(async () => {
            try {
                const [u, r, o] = await Promise.all([
                    fetchUsers(),
                    fetchRestaurants(),
                    fetchOrders(),
                ])
                setUsers(u)
                setRestaurants(r)
                setOrders(o)
            } catch (e) {
                console.error(e)
            }
        })()
    }, [])

    const handleStatusChange = async (id, status) => {
        await updateOrderStatus(id, status)
        await refreshOrders()
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
            <div className="pointer-events-none fixed inset-0 opacity-50">
                <div className="absolute -top-32 -left-16 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
            </div>

            <main className="relative z-10 max-w-6xl mx-auto py-10 px-4 space-y-6">
                <header className="flex flex-col gap-2 mb-2">
                    <h1 className="text-3xl font-semibold tracking-tight flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-slate-950 font-bold">
              U
            </span>
                        <span>UberEats-like · Microservices Dashboard</span>
                    </h1>
                    <p className="text-xs text-slate-400 max-w-2xl">
                        Frontend React + shadcn/ui connecté à l’API Gateway (Docker) sur{" "}
                        <code className="px-1.5 py-0.5 rounded bg-slate-900/80 border border-white/10 text-[11px]">
                            http://localhost:5555
                        </code>
                        . Services : users, restaurants, orders.
                    </p>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <UsersCard users={users} />
                    <RestaurantsCard restaurants={restaurants} />
                    <CreateOrderCard
                        users={users}
                        restaurants={restaurants}
                        onCreated={refreshOrders}
                    />
                </section>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <OrdersCard orders={orders} onStatusChange={handleStatusChange} />
                </section>
            </main>
        </div>
    )
}
