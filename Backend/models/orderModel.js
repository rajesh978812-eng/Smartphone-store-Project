{/* const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cartItems: Array,
    amount: String,
    status: String,
    createdAt: Date  
})

{
    cartItems: Array,
    amount: String,
    status: String
  },
  { timestamps: true } 
*/}
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
     orderItems: [
    {
      product: Object,
      qty: Number
    }
  ]
    // ✅ createdAt, updatedAt auto
    });

const orderModel = mongoose.model('Order', orderSchema);
module.exports = orderModel;