const express = require('express')
const order = require('../controllers/OrderController')
const router = express.Router()

router.get('/api/order', order.findAll);
router.get('/api/order/:id', order.findById);
router.post('/api/order', order.addOrder);
router.put('/api/order/:id', order.updateById);
router.delete('/api/order/:id', order.removeById);

module.exports = router