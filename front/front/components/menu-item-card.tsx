"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
}

interface MenuItemCardProps {
  item: MenuItem
  onAddToCart: (itemId: string) => void
}

export function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <h3 className="font-semibold text-lg leading-tight">{item.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">{item.price.toFixed(2)}€</span>
              <Button size="sm" onClick={() => onAddToCart(item.id)} className="gap-1">
                <Plus className="h-4 w-4" />
                Ajouter
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
