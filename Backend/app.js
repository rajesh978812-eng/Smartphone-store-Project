const dotenv = require('dotenv').config();
const express = require('express');
const app = express();


const cors = require('cors');
const connectDatabase = require('./config/connectDatabase');


const products = require('./routes/product');
const orders = require('./routes/order');

connectDatabase();

app.use(express.json());
app.use(cors());
app.use('/api/v1/',products);
app.use('/api/v1/',orders);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server listening to Port ${PORT}`);
});
