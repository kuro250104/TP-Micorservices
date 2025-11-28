"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ShoppingCart, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5555"

type Restaurant = {
    id: number
    name: string
    category?: string
    deliveryTime?: string | number
    rating?: number
}

export default function HomePage() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                setLoading(true)
                setError(null)

                const res = await fetch(`${API_BASE_URL}/restaurants`)
                if (!res.ok) {
                    const msg = await res.text()
                    throw new Error(`Erreur API ${res.status}: ${msg}`)
                }

                const data: Restaurant[] = await res.json()
                setRestaurants(data)
            } catch (err) {
                console.error("Erreur lors du chargement des restaurants :", err)
                setError("Impossible de charger les restaurants pour le moment.")
            } finally {
                setLoading(false)
            }
        }

        fetchRestaurants()
    }, [])

    const filteredRestaurants = restaurants.filter((r) =>
        (r.name ?? "").toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">FoodExpress</h1>
                    <Button variant="outline" size="icon">
                        <ShoppingCart className="h-5 w-5" />
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Rechercher un restaurant..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {loading && (
                    <div className="text-sm text-muted-foreground">Chargement des restaurants…</div>
                )}

                {error && !loading && (
                    <div className="text-sm text-red-500 mb-4">{error}</div>
                )}

                {!loading && !error && filteredRestaurants.length === 0 && (
                    <div className="text-sm text-muted-foreground">Aucun restaurant trouvé.</div>
                )}

                {!loading && !error && filteredRestaurants.length > 0 && (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredRestaurants.map((restaurant) => (
                            <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
                                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                                    <div className="aspect-video bg-muted rounded-lg mb-4" />
                                    <h3 className="font-semibold text-lg mb-2">{restaurant.name}</h3>
                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                        {restaurant.category && (
                                            <Badge variant="secondary">{restaurant.category}</Badge>
                                        )}
                                        {restaurant.deliveryTime && <span>{restaurant.deliveryTime} min</span>}
                                    </div>
                                    {restaurant.rating && (
                                        <div className="mt-2 text-sm">
                                            <span className="font-medium">⭐ {restaurant.rating}</span>
                                        </div>
                                    )}
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}