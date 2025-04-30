const mongoose = require('mongoose');
const orderLineSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
});
module.exports = mongoose.model('OrderLine', orderLineSchema);
