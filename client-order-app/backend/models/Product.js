const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  libelle: { type: String, required: true },
  pu: { type: Number, required: true }
});
module.exports = mongoose.model('Product', productSchema);
