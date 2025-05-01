const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    titre: {type: String, required: true},
    description: {type: String, required: true},
    auteur: {type: String, required: true},
    image: {type: String},
    createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    },
    createdAt: {
    type: Date,
    default: Date.now,
    },
    updatedAt: {
    type: Date,
    default: Date.now,
    }
});




module.exports = mongoose.model('Item', itemSchema);