const express = require('express')
const inventory = require('../controllers/InventoryController')
const router = express.Router()

router.get('/api/inventory', inventory.findAll);
router.get('/api/inventory/:id', inventory.findById);
router.post('/api/inventory', inventory.addInventory);
router.put('/api/inventory/:id', inventory.updateById);
router.delete('/api/inventory/:id', inventory.removeById);

module.exports = router