const Inventory = require('../models/Inventory');

exports.findAll = (req, res) => {
    Inventory.find()
        .then(inventories => {
            res.send(inventories);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.findById = (req, res) => {
    Inventory.findById(req.params.id, (err, inventory) => {
        if (err) throw err;
        res.send(inventory);
    })
};

exports.addInventory = (req, res) => {
    Inventory.create(req.body, (err, data) => {
        if (err) { throw err; }
        res.send(data);
    })
};

exports.removeById = (req, res) => {
    Inventory.findByIdAndRemove(req.params.id, (err, inventory) => {
        if (err) throw err;
        res.send(inventory);
    })
}

exports.updateById = (req, res) => {
    Inventory.findByIdAndUpdate(req.params.id, req.body, (err, inventory) => {
        if (err) throw err;
        res.send(inventory);
    })
}