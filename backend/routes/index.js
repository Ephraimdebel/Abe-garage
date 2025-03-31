// Import the express module 
const express = require('express');
// Call the router method from express to create the router 
const router = express.Router();
// Import the install router 
const installRouter = require('./install.routes');
// Import the employee routes 
const employeeRouter = require('./employee.routes');
// Import the login routes 
const loginRoutes = require("./login.routes");
// Import the service routes
const serviceRoute = require("./service.routes")
// Import the service routes
const customerRoute = require("./customer.routes")
// Import the vehicle routes
const vehicleRoute = require("./vehicle.routes")
// Import the vehicle routes
const orderRoute = require("./order.routes")
// Add the install router to the main router 
router.use(installRouter);
// Add the employee routes to the main router 
router.use(employeeRouter);
// Add the login routes to the main router
router.use(loginRoutes);
// Add the service routes to the main router
router.use(serviceRoute);
// Add the customer routes to the main router
router.use(customerRoute);
// Add the vehicle routes to the main router
router.use(vehicleRoute);
// Add the order routes to the main router
router.use(orderRoute);
// Export the router
module.exports = router; 