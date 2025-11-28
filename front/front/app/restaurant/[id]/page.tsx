"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Plus, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5555"

type MenuItem = {
    id: number
    name: string
    price: number
}

type RestaurantDetail = {
    id: number
    name: string
    cuisine?: string
    rating?: number
    city?: string
    menu: MenuItem[]
}

export default function RestaurantPage() {
    const params = useParams<{ id: string | string[] }>()
    const [restaurant, setRestaurant] = useState<RestaurantDetail | null>(null)
    const [cart, setCart] = useState<MenuItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const restaurantId =
        typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : ""

    useEffect(() => {
        if (!restaurantId) return

        const fetchRestaurant = async () => {
            try {
                setLoading(true)
                setError(null)

                const res = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}`)
                if (!res.ok) {
                    const msg = await res.text()
                    throw new Error(`Erreur API ${res.status}: ${msg}`)
                }

                const data: RestaurantDetail = await res.json()
                setRestaurant(data)
            } catch (err) {
                console.error("Erreur lors du chargement du restaurant :", err)
                setError("Impossible de charger ce restaurant pour le moment.")
            } finally {
                setLoading(false)
            }
        }

        fetchRestaurant()
    }, [restaurantId])

    const addToCart = (item: MenuItem) => {
        setCart((prev) => [...prev, item])
    }

    const menu: MenuItem[] = restaurant?.menu ?? []

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b bg-background sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="relative bg-transparent">
                            <ShoppingCart className="h-5 w-5" />
                            {cart.length > 0 && (
                                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                                    {cart.length}
                                </Badge>
                            )}
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {loading && <p className="text-sm text-muted-foreground">Chargement du restaurant…</p>}

                {error && !loading && (
                    <p className="text-sm text-red-500 mb-4">{error}</p>
                )}

                {!loading && !error && restaurant && (
                    <>
                        <div className="mb-8">
                            <div className="aspect-[3/1] bg-muted rounded-lg mb-4" />
                            <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
                            <div className="flex items-center gap-2">
                                {restaurant.cuisine && (
                                    <Badge variant="secondary">{restaurant.cuisine}</Badge>
                                )}
                                {restaurant.city && (
                                    <span className="text-sm text-muted-foreground">{restaurant.city}</span>
                                )}
                                {restaurant.rating && (
                                    <span className="text-sm font-medium">⭐ {restaurant.rating}</span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Menu</h2>

                            {menu.length === 0 && (
                                <p className="text-sm text-muted-foreground">
                                    Aucun plat disponible pour ce restaurant.
                                </p>
                            )}

                            {menu.map((item) => (
                                <Card key={item.id} className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold">{item.name}</h3>
                                            <p className="font-medium mt-1">{item.price}€</p>
                                        </div>
                                        <Button size="icon" onClick={() => addToCart(item)}>
                                            <Plus className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    )
}