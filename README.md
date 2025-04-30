# CC1_OrderManagement
# Rapport sur l'Application de Gestion des Commandes Clients

## Aperçu

L'Application de Gestion des Commandes Clients est une application web **full-stack** conçue pour simplifier la gestion des commandes clients. Elle permet aux utilisateurs de sélectionner un client, d’afficher les produits disponibles, d’ajuster les quantités et de calculer le coût total d’une commande en temps réel. 

## Détails du Projet


- **Date** : Avril 2025  
- **Technologies Utilisées** :  
  - **Frontend** : Angular 17+ (Composant Autonome)  
  - **Backend** : Express.js  
  - **Base de Données** : MongoDB  
  - **Style** : Tailwind CSS (via CDN)  
- **Objectif** : Créer un système pour gérer les commandes clients avec des ajustements de quantités dynamiques et des calculs de total en temps réel.

## Architecture de l'Application

### Frontend

Le **frontend** est construit avec **Angular 17+**, en tirant parti de sa fonctionnalité de composant autonome pour encapsuler toute la logique et l’interface utilisateur dans un seul `AppComponent`. Cette approche simplifie la structure du projet et s’aligne sur les pratiques modernes d’Angular.

- **Composants Clés** :  
  - `AppComponent` : Gère tout le rendu de l’interface utilisateur, la récupération des données et les interactions utilisateur.  
  - `ApiService` : Gère les requêtes HTTP vers l’API backend.  
- **Template** : Utilise la syntaxe moderne de contrôle de flux d’Angular (`@for`) pour afficher un tableau de produits avec les quantités, le TTC (coût total par produit), et des boutons d’action (`+`/`-`).  
- **Style** : Tailwind CSS est intégré via CDN, offrant une interface utilisateur réactive et épurée avec un minimum de CSS personnalisé.

### Backend

Le **backend** est alimenté par **Express.js**, un framework Node.js léger, et se connecte à une base de données **MongoDB** en utilisant Mongoose pour la gestion des schémas.

- **Endpoints API** :  
  - `GET /api/clients` : Récupérer tous les clients.  
  - `GET /api/produits` : Récupérer tous les produits.  
  - `GET /api/commandes` : Récupérer toutes les commandes.  
  - `POST /api/commandes` : Créer une nouvelle commande.  
  - `GET /api/lignescommande` : Récupérer toutes les lignes de commande.  
  - `POST /api/lignescommande` : Créer une nouvelle ligne de commande.  
  - `PATCH /api/lignescommande/:id` : Mettre à jour une ligne de commande (par ex., quantité).  
- **Schéma de la Base de Données** :  
  - **Client** : `{ nom, age, email }`  
  - **Produit** : `{ libelle, pu }`  
  - **Commande** : `{ date, clientId }`  
  - **LigneCommande** : `{ quantite, commandeId, produitId }`

### Flux de Données

#### Initialisation
- Le frontend récupère les clients et les produits depuis le backend au chargement.  
- Un client par défaut est sélectionné, déclenchant la création d’une nouvelle commande.

#### Lignes de Commande
- Les lignes de commande sont créées pour chaque produit avec une quantité initiale de 0.  
- Elles sont stockées dans MongoDB et récupérées pour remplir le tableau.

#### Interaction Utilisateur
- Les utilisateurs ajustent les quantités à l’aide des boutons `+` et `-`, qui envoient des requêtes `PATCH` pour mettre à jour les lignes de commande.  
- Le coût total est calculé dynamiquement côté frontend.

## Fonctionnalités

### Fonctionnalités Principales

#### Sélection de Client
- Une liste déroulante affiche tous les clients récupérés depuis le backend.  
- La sélection d’un client crée une nouvelle commande associée à ce client.

#### Tableau des Produits
- Affiche les produits avec les colonnes : Produit (nom), TTC (quantité * prix), Quantité (quantité actuelle), et Actions (boutons `+`/`-`).  
- Le TTC et le total sont formatés à deux décimales avec le pipe `number` d’Angular.

#### Mises à Jour Dynamiques
- Les ajustements de quantité mettent à jour la ligne de commande dans la base de données et se reflètent dans l’interface.  
- Le coût total en bas du tableau est mis à jour en temps réel.

#### Gestion des Erreurs
- Affiche des messages d’erreur si les appels API échouent (par ex., "Échec du chargement des produits").  
- Montre un état de chargement pendant la récupération des données.

### Interface Utilisateur

#### En-tête
- Liste déroulante des clients à gauche.  
- Date actuelle à droite (par ex., "30/04/2025").

#### Tableau
- Stylisé avec Tailwind CSS pour un look propre et professionnel.  
- Design responsive pour une utilisation sur différents écrans.

#### Retour Utilisateur
- Messages de chargement pendant la récupération des données.  
- Messages d’erreur pour les opérations échouées.





## Conclusion
L'application de gestion des commandes clients illustre avec succès la mise en œuvre d’une architecture web full-stack moderne, reposant sur Angular pour le front-end, Express.js pour le back-end, et MongoDB pour la base de données.

