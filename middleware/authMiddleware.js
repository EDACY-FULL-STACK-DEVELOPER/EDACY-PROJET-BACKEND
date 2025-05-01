const jwt = require('jsonwebtoken');

// Middleware pour vérifier la présence du token et décoder l'utilisateur
exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
     // req.user = decoded; // Ajoute l'utilisateur décodé à la requête
  
      req.user = {
        id: decoded.userId,
        prenom: decoded.prenom,
        nom: decoded.nom,
        email: decoded.email
      };
      next();  // Passe au middleware suivant
    } catch (err) {
      res.status(400).json({ message: 'Token invalide.' });
    }
  };