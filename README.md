# EDACY-PROJET-BACKEND - Gestion d'un Objet Métier avec Authentification

Ce projet est une API REST construite avec **Node.js**, **Express** et **MongoDB (Atlas)**.  
Il permet l'authentification des utilisateurs avec Json Web Token (JWT) et le CRUD (Créer, Lire, Mettre à jour, Supprimer) sur un objet métier (ex: un Item)

## 🚀 Fonctionnalités principales

- 🔐 Authentification avec **JWT**
- 👤 Gestion des utilisateurs (inscription, connexion)
- 📦 CRUD complet sur un objet métier
- 🔒 Routes protégées via middleware `authenticate`
- ☁️ Connexion sécurisée à une base MongoDB Atlas

---

## 🛠️ Technologies utilisées

- Node.js / Express
- MongoDB + Mongoose
- bcryptjs (hashage des mots de passe)
- jsonwebtoken (authentification)
- dotenv
- cors (middleware utiles)