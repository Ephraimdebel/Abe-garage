const express = require('express');
const router = express.Router();

const serviceController = require("../controllers/service.controller");

router.post("/api/service",serviceController.addService);

router.get("/api/service",serviceController.getAllServices)

router.get("/api/service/:id",serviceController.getServiceById)

router.patch("/api/service",serviceController.updateService);



// authMiddleware.verifyToken, --middleware

module.exports = router;