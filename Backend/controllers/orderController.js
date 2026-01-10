{/*const orderModel = require('../models/orderModel');

exports.createOrder = async (req, res, next) => {
    const cartItems = req.body;
    const amount = Number(cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)).toFixed(2);
    const status = 'pending';
    const order = await orderModel.create({cartItems, amount, status})
    

    res.json(
        {
            success:true,
            order 
        }
    )
}


const orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel;
*/}

const orderModel = require('../models/orderModel');

exports.createOrder = async (req, res) => {
      console.log("REQ BODY FROM FRONTEND ", req.body)
  try {
    const cartItems = req.body;

    // ✅ validation
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart items required"
      });
    }

    // ✅ safe amount calculation
    const amount = cartItems.reduce((acc, item) => {
      return acc + (item.product?.price || 0) * (item.qty || 0);
    }, 0).toFixed(2);

    const order = await orderModel.create({
      cartItems,
      amount,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      order
    });

  } catch (error) {
    console.error("ORDER ERROR 👉", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};