const express = require('express')
const product = require('../controllers/ProductController')
const router = express.Router()

router.get('/api/product', product.findAll);
router.get('/api/product/:id', product.findById);
router.post('/api/product', product.addProduct);
router.put('/api/product/:id', product.updateById);
router.delete('/api/product/:id', product.removeById);

module.exports = router