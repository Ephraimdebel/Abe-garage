const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");

router.post("/api/customer",customerController.addCustomer);

router.get("/api/customer",customerController.getCustomers);

router.get("/api/customer/:id",customerController.getCustomer);

router.patch("/api/customer/:id",customerController.updateCustomerController);




module.exports = router;
