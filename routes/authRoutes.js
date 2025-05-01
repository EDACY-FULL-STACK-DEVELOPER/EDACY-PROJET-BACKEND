const router = require('express').Router();
const authController = require('../controllers/authController');

// route pour s'inscrire
router.post('/register', authController.register);
// route pour se connecter
router.post('/login', authController.login);

module.exports = router;