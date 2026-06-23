const express = require('express');
const cors = require('cors');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

AWS.config.update({
  region: process.env.AWS_REGION || 'us-west-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const ORDERS_TABLE = 'NoniOrders';
const PRODUCTS_TABLE = 'NoniProducts';

// Get all products
app.get('/api/products', async (req, res) => {
  const params = { TableName: PRODUCTS_TABLE };
  try {
    const data = await dynamoDB.scan(params).promise();
    res.json(data.Items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create an order
app.post('/api/orders', async (req, res) => {
  const { customerName, email, phone, address, items, total, paymentMethod } = req.body;
  const order = {
    id: uuidv4(),
    orderRef: 'SPF' + Math.random().toString(36).substr(2, 6).toUpperCase(),
    customerName,
    email,
    phone,
    address,
    items,
    total,
    paymentMethod,
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  };
  const params = { TableName: ORDERS_TABLE, Item: order };
  try {
    await dynamoDB.put(params).promise();
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders
app.get('/api/orders', async (req, res) => {
  const params = { TableName: ORDERS_TABLE };
  try {
    const data = await dynamoDB.scan(params).promise();
    res.json(data.Items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Noni Store's server running on port${PORT}`));