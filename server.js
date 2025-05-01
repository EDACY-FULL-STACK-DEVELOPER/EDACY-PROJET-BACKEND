const express = require('express')
const app = express()
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
require('dotenv').config();

// parseur pour parser le json
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Connexion à MongoDB
const MONGO_URI = process.env.MONGO_URI 

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Connecté à MongoDB Atlas"))
    .catch(err => {
        console.log("🔴 Erreur de connexion à MongoDB:", err);
        process.exit(1);
    });

app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur de Samba!')
})

// Routes de l'API 
const authRoutes = require('./routes/authRoutes');
// Utilisation des routes
app.use('/api/auth', authRoutes);
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`)
})
