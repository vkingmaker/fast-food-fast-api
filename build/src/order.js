var express = require('express');
var router = express.Router();
var order = require('./mock/db')();

/* GET home page. */
router.get('/', function (req, res, next) {
    // console.log(dbData);
    res.json(order);
});

router.get('/:id', function (req, res, next) {
    var particularOrder = order.filter(function (value) {
        if (value.id === +req.params.id)
            return value;
    });
    res.json(particularOrder);
});
router.post('/', function (req, res, next) {
    var addedOrder = {};
    if (order.length) {
        req.body.id = order[order.length - 1].id + 1;
        addedOrder = req.body;
        order.push(req.body);
    }else{
        req.body.id = 1;
        addedOrder = req.body;
        order.push(req.body);
    }

    res.json({
        "message": "Your order has been placed!",
        addedOrder
    });
});
router.put('/:id', function (req, res, next) {
    let updatedOrder ={};
    order.splice(req.params.id - 1, 1, req.body);
    updatedOrder = req.body;
    res.json({
        "message": `Your Order has been Updated id ${req.params.id}`,
        updatedOrder
    });
});

router.delete('/:id', function (req, res, next) {
    order.splice(req.params.id - 1, 1);
    res.json({
        "message": `Order Deleted Successfully id ${req.params.id}`
    });
});
router.delete('/', function (req, res, next) {
    // for(var id in order){
    // order.splice(0,1);
    // }
    order.filter(function (value, index) {
        // order.pop();
        order.splice(0);
    });
    res.json({
        "message": `The Order List has been Emptied successfully!`,
        order
    });
});
module.exports = router;