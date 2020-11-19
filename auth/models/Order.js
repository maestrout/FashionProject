const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const OrderSchema = mongoose.Schema({
    _id: Number,
    customerUser: String,
    items: {type: [Number]},
    totalCost: Number
});

module.exports = mongoose.model('Order', OrderSchema);