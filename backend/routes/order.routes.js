const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

// Middleware to verify token and check if user is admin
const authMiddleware = require("../middlewares/auth.middleware");
// Route to create a new order
router.post("/api/order",[authMiddleware.verifyToken], orderController.addOrder);

// Route to get all orders
router.get("/api/orders", [authMiddleware.verifyToken], orderController.getAllOrders);
// Route to get a specific order by ID
router.get("/api/order/:id",  orderController.getOrderById);
// Route to update an order
router.patch("/api/order/:id",[authMiddleware.verifyToken], orderController.updateOrder);

router.put('/api/order/:id/status',[authMiddleware.verifyToken],orderController.updateOrderStatus)

router.delete('/api/order/:id',[authMiddleware.verifyToken],orderController.deleteOrder)
module.exports = router;