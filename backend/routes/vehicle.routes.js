const express = require('express');
const router = express.Router();

const vehicleController  = require('../controllers/vehicle.controller')

router.post('/api/vehicle', vehicleController.addVehicle);

router.get('/api/vehicle/:id', vehicleController.getVehicle);

router.get('/api/vehicle/customer/:customer_id', vehicleController.getVehiclesByCustomer);

router.patch('/api/vehicle/:id', vehicleController.updateVehicle);


module.exports = router;