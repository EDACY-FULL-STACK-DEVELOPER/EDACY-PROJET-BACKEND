const router = require('express').Router();
const itemController = require('../controllers/itemController');
const { authenticate } = require('../middleware/authMiddleware');

// route pour ajouter un item
router.post('/ajouter',authenticate, itemController.createItem);
// route pour obtenir tous les items
router.get('/list', itemController.getAllItems);
// route pour obtenir un item par son id
router.get('/:id', itemController.getItemById);
//route pour mettre à jour un item
router.put('/update:id', authenticate, itemController.updateItem);
//route pour supprimer un item
router.delete('/delete:id', authenticate, itemController.deleteItem);

module.exports = router;