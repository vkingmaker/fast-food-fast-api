'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var order = require('./mock/db')();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json(order);
});

router.get('/:id', function (req, res, next) {
    var particularOrder = order.filter(function (value) {
        if (value.id === +req.params.id) return value;
    });
    res.json(particularOrder);
});
router.post('/', function (req, res, next) {
    var addedOrder = {};
    if (order.length) {
        req.body.id = order[order.length - 1].id + 1;
        addedOrder = req.body;
        order.push(req.body);
    } else {
        req.body.id = 1;
        addedOrder = req.body;
        order.push(req.body);
    }

    res.json({
        "message": "Your order has been placed!",
        addedOrder: addedOrder
    });
});
router.put('/:id', function (req, res, next) {
    var updatedOrder = {};
    order.splice(req.params.id - 1, 1, req.body);
    updatedOrder = req.body;
    res.json({
        "message": 'Your Order has been Updated id ' + req.params.id,
        updatedOrder: updatedOrder
    });
});

router.delete('/:id', function (req, res, next) {
    order.splice(req.params.id - 1, 1);
    res.json({
        "message": 'Order Deleted Successfully id ' + req.params.id
    });
});
router.delete('/', function (req, res, next) {
    order.filter(function (value, index) {
        order.splice(0);
    });
    res.json({
        "message": 'The Order List has been Emptied successfully!',
        order: order
    });
});
exports.default = router;