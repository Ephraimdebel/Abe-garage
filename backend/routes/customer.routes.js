const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/api/customer",[authMiddleware.verifyToken],customerController.addCustomer);

router.get("/api/customer",[authMiddleware.verifyToken],customerController.getCustomers);

router.get("/api/customer/:id",[authMiddleware.verifyToken],customerController.getCustomer);

router.patch("/api/customer/:id",[authMiddleware.verifyToken],customerController.updateCustomerController);




module.exports = router;
