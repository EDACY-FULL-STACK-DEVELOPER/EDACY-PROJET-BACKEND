const Item = require('../models/Item');


exports.createItem = async (req, res) => {

    const {titre, description, auteur, image} = req.body;
    // Validation de base
    if (!titre || !description || !auteur) {
        return res.status(400).json({ message: 'Les champs Titre, description et auteur sont requis.' });
    }

    const existingItem = await Item.findOne({ titre, description});
    if (existingItem){
        return res.status(400).json({message: 'Cet item existe déjà'});
    }

    // Création de l'item
    const item = new Item({
        titre,
        description,
        auteur,
        image,
        createdBy: req.user.id
      });
    
    await item.save();
    res.status(201).json({message: 'Item crée avec succès', item});

};

// obtenir tous les items
exports.getAllItems = async (req, res, next) =>{
    try {
        const items = await Item.find().populate('createdBy', 'prenom nom email');
        res.status(200).json(items);
    } catch (err) {
        next(err);
        
    }
};

// Obtenir un Item par son id
exports.getItemById = async (req, res, next) => {
    try {
      const item = await Item.findById(req.params.id).populate('createdBy', 'prenom nom email');
      if (!item) return res.status(404).json({ message: 'Item non trouvé.' });
      res.status(200).json(item);
    } catch (err) {
      next(err);
    }
};

// modifier un item existant
exports.updateItem = async (req, res, next) => {
    try {
      const { titre, description, auteur, image } = req.body;
      const updateData = { titre, description, auteur, image, updatedAt: Date.now() };
  
      const updated = await Item.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      ).populate('createdBy', 'prenom nom email');
  
      if (!updated) return res.status(404).json({ message: 'Item non trouvé.' });
      res.status(200).json({message: 'Item mis à jour avec succès.', updated});
    } catch (err) {
      next(err);
    }
};

// supprimer un item
exports.deleteItem = async (req, res, next) => {
    try {
      const deleted = await Item.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Item non trouvé.' });
      res.status(200).json({ message: 'Item supprimé avec succès.' });
    } catch (err) {
      next(err);
    }
};