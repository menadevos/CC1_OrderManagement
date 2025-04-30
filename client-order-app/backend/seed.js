const mongoose = require('mongoose');
const Client = require('./models/Client');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/client_order_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    await Client.deleteMany({});
    await Product.deleteMany({});

    const clients = [
      { name: 'John Doe', age: 30, email: 'john@example.com' },
      { name: 'Jane Smith', age: 25, email: 'jane@example.com' }
    ];

    const products = [
      { libelle: 'Laptop', pu: 1000 },
      { libelle: 'Phone', pu: 500 },
      { libelle: 'Tablet', pu: 300 }
    ];

    await Client.insertMany(clients);
    await Product.insertMany(products);

    console.log('Sample data inserted');
    mongoose.connection.close();
  })
  .catch(err => console.error('Error:', err));
