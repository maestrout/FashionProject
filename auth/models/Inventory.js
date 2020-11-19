const mongoose = require('mongoose'), Schema = mongoose.Schema;

const InventorySchema = mongoose.Schema({
    _id: Number,
    product: Number,
    quantity: Number
});

module.exports = mongoose.model('Inventory', InventorySchema);