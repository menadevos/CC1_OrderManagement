const express = require('express');
const router = express.Router();
const OrderLine = require('../models/OrderLine');

router.get('/', async (req, res) => {
  try {
    const orderLines = await OrderLine.find().populate('orderId productId');
    res.json(orderLines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const orderLine = new OrderLine({
    quantity: req.body.quantity,
    orderId: req.body.orderId,
    productId: req.body.productId
  });
  try {
    const newOrderLine = await orderLine.save();
    res.status(201).json(newOrderLine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const orderLine = await OrderLine.findById(req.params.id);
    if (orderLine) {
      orderLine.quantity = req.body.quantity;
      const updatedOrderLine = await orderLine.save();
      res.json(updatedOrderLine);
    } else {
      res.status(404).json({ message: 'OrderLine not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
