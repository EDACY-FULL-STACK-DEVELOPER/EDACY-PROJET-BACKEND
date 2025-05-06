const express = require('express')
const app = express()
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
require('dotenv').config();
const cors = require("cors");

// Utilisation de CORS et express.json() pour gérer les requêtes
const corsOptions = {
    origin: [
      "http://localhost:4200",
    ],
    credentials: true,
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "sessionId",
    ],
    exposedHeaders: ["sessionId"],
    methods: "GET,PUT,POST,DELETE",
    preflightContinue: false,
  };
app.use(cors(corsOptions));
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
    
// Routes de l'API 
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
// Utilisation des routes
app.use('/api/auth', authRoutes);
app.use('/api/item', itemRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur de Samba!')
})
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`)
})
