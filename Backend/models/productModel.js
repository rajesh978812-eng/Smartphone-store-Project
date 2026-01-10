const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  color: String,
  ram: Number,
  storage: Number,
  display: String,
  mrp: Number,
  price: Number,
  image: String
 
});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
{/*import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
 
  name: String,
    price: String,
    description: String,
    ratings: String,
    images : [
        {
            image: String
        }
    ],
    category: String,
    seller: String,
    stock: String,
    numOfReviews: String,
    createdAt: Date 
});

    export default mongoose.model("Product", productSchema);*/}