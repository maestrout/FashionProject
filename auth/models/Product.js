const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema({
    _id: Number,
    name: String,
    details: String,
    type: String,
    image: String,
    price: Number
});

module.exports = mongoose.model('Product', ProductSchema);