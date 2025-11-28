# Food Delivery Frontend

Interface simple pour plateforme de livraison de nourriture.

## Structure

- `app/page.tsx` - Liste des restaurants
- `app/restaurant/[id]/page.tsx` - Menu du restaurant
- `lib/api.ts` - Connexion aux microservices

## Configuration

Ajoutez l'URL de votre API Gateway dans les variables d'environnement:

\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:VOTRE_PORT
\`\`\`

## Microservices attendus

Le front-end s'attend à ces endpoints:

- `GET /restaurants` - Liste des restaurants
- `GET /restaurants/:id` - Détails d'un restaurant
- `POST /orders` - Créer une commande

## Utilisation

Les données sont actuellement en mock. Pour connecter votre backend:

1. Configurez `NEXT_PUBLIC_API_URL`
2. Remplacez les données mock dans `app/page.tsx` et `app/restaurant/[id]/page.tsx`
3. Utilisez les fonctions dans `lib/api.ts`
