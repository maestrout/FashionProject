const Order = require('../models/Order');

exports.findAll = (req, res) => {
    Order.find()
        .then(orders => {
            res.send(orders);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.findById = (req, res) => {
    Order.findById(req.params.id, (err, order) => {
        if (err) throw err;
        res.send(order);
    })
};

exports.addOrder = (req, res) => {
    Order.create(req.body, (err, data) => {
        if (err) { throw err; }
        res.send(data);
    })
};

exports.removeById = (req, res) => {
    Order.findByIdAndRemove(req.params.id, (err, order) => {
        if (err) throw err;
        res.send(order);
    })
}

exports.updateById = (req, res) => {
    Order.findByIdAndUpdate(req.params.id, req.body, (err, order) => {
        if (err) throw err;
        res.send(order);
    })
}