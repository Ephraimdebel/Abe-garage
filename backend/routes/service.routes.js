const express = require('express');
const router = express.Router();

const serviceController = require("../controllers/service.controller");
const authMiddleware = require('../middlewares/auth.middleware');

router.post("/api/service",[authMiddleware.verifyToken, authMiddleware.isAdmin],serviceController.addService);

router.get("/api/service",serviceController.getAllServices)

router.get("/api/service/:id",serviceController.getServiceById)

router.patch("/api/service",[authMiddleware.verifyToken, authMiddleware.isAdmin],serviceController.updateService);

router.delete('/api/service/:id',[authMiddleware.verifyToken, authMiddleware.isAdmin],serviceController.deleteService);



// authMiddleware.verifyToken, --middleware

module.exports = router;