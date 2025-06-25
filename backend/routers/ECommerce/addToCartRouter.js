const express = require('express');
const { addToCart, getCartItems, updateCartItem, removeFromCart, clearCart, allCarts, updateCartItemVariant } = require('../../controllers/ECommerce/addToCartController');
const authMiddleware = require('../../middleware/authToken');
const router = express.Router();


router.post('/cart',  addToCart);
router.get('/getCart', allCarts);
router.get('/getCartUser/:userId',  getCartItems);
router.put('/updateCart/:id',  updateCartItem);
router.put('/updateCartItemVariant/:id',  updateCartItemVariant);
router.delete('/removeCart/:id',  removeFromCart);
router.delete('/clear/:userId',  clearCart);

module.exports = router;