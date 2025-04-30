const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true }
});
module.exports = mongoose.model('Order', orderSchema);
