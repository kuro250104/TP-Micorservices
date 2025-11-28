
FoodExpress est une plateforme moderne de commande et livraison de repas, inspirée d’Uber Eats.  
Elle permet aux utilisateurs de parcourir des restaurants, consulter les menus, passer des commandes et suivre leurs livraisons en temps réel.

 **Objectif du projet** 
Au-delà d’être une plateforme de livraison comme les autres, le but de FoodExpress est de proposer un modèle **plus juste et plus éthique**, en **mieux rémunérant les livreurs** :

- Commission plus élevée  
- Minimum garanti par course  
- Transparence totale sur les gains  
- Gestion claire du statut des livreurs  

---

#  Technologies utilisées

- **Frontend :** React + Vite + TailwindCSS  
- **Backend :** Node.js + Express 
- **API Gateway :** Express + http-proxy  
- **Base de données :** MongoDB (NoSQL)  
- **Orchestration :** Docker & Docker Compose  

---

#  Architecture du projet

FoodExpress/ │ ├── api-gateway/ → Point d’entrée unique (reverse proxy) ├── users/ → Microservice utilisateurs ├── restaurant/ → Microservice restaurants/menus ├── order-services/ → Microservice commandes/livraisons │ ├── middlewares/ → Middlewares mutualisés │ ├── front/ → Application React (client web) │ ├── docker-compose.yml → Lancement multi-containers └── README.md → Documentation

---

#  Base de données – MongoDB (NoSQL)

Chaque microservice utilise **sa propre base** (pattern “Database per Service”).

 users-db :
```json
{
  "_id": "ObjectId",
  "role": "customer | restaurant | delivery",
  "name": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "delivery": {
    "vehicle": "bike | scooter | car",
    "earnings": "number",
    "available": "boolean"
  }
}
 restaurant-dbv :

{
  "_id": "ObjectId",
  "ownerId": "ObjectId",
  "name": "string",
  "address": {
    "street": "string",
    "city": "string",
    "coords": { "lat": "number", "lng": "number" }
  },
  "categories": ["pizza", "burger"],
  "menus": [
    {
      "menuId": "ObjectId",
      "title": "string",
      "price": "number",
      "image": "string"
    }
  ]
}
 orders-db :

{
  "_id": "ObjectId",
  "customerId": "ObjectId",
  "restaurantId": "ObjectId",
  "items": [
    {
      "menuId": "ObjectId",
      "quantity": "number",
      "price": "number"
    }
  ],
  "delivery": {
    "deliveryManId": "ObjectId",
    "deliveryFees": "number",
    "deliveryEarnings": "number",
    "status": "assigned | picked_up | delivered"
  },
  "status": "pending | accepted | delivering | delivered",
  "createdAt": "date"
}

 API Gateway
Le Gateway unifie les routes de tous les microservices.
Exemple :

app.use("/users", proxy("http://users:3001"));
app.use("/restaurants", proxy("http://restaurant:3002"));
app.use("/orders", proxy("http://orders:3003"));

 Backend – Microservices Express
🔹 Microservice Users
Authentification
Profils clients / restaurants / livreurs
Suivi des gains des livreurs
Disponibilité en temps réel
🔹 Microservice Restaurant
CRUD restaurants
Gestion des menus
🔹 Microservice Order Services
Création commandes
Affectation automatique des livreurs
Suivi livraison
Calcul des gains livreurs

 Frontend – React + Vite + Tailwind
Structure :

front/
│
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── vite.config.js
└── tailwind.config.js
Exemple d'appel API :

fetch("http://localhost:3000/restaurants")
  .then(res => res.json())
  .then(data => setRestaurants(data));

 Lancement du projet: 
1) Cloner le projet

git clone https://github.com/ton-dépôt/FoodExpress.git
cd FoodExpress

2) Mode Docker (recommandé)

docker-compose up --build
Services lancés :
API Gateway
Users service
Restaurant service
Orders service
MongoDB
Front React

3) Lancer manuellement les microservices
Users

cd users
npm install
npm start
Restaurant

cd restaurant
npm install
npm start
Orders

cd order-services
npm install
npm start

4) Lancer le frontend

cd front
npm install
npm run dev
Disponible sur : 👉 http://localhost:5173

 Un modèle plus juste pour les livreurs
FoodExpress met les livreurs au centre du système :
Rémunération plus élevée
Minimum garanti
Gains visibles en temps réel
Process simple et transparent

 Conclusion
Ce README regroupe : ✔ ton ancien texte ✔ l'architecture actuelle ✔ la BD MongoDB ✔ le fonctionnement microservice ✔ la vision éthique du projet

FoodExpress — Manger mieux, Livrer mieux, Payer mieux.

---

