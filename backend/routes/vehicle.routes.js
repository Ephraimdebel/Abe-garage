const express = require('express');
const router = express.Router();

const vehicleController  = require('../controllers/vehicle.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/api/vehicle',[authMiddleware.verifyToken], vehicleController.addVehicle);

router.get('/api/vehicle/:id',[authMiddleware.verifyToken], vehicleController.getVehicle);

router.get('/api/vehicle/customer/:customer_id',[authMiddleware.verifyToken], vehicleController.getVehiclesByCustomer);

router.patch('/api/vehicle/:id',[authMiddleware.verifyToken], vehicleController.updateVehicle);


module.exports = router;