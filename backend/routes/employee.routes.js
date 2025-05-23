// Import the express module  
const express = require('express');
// Call the router method from express to create the router 
const router = express.Router();
// Import the employee controller
const employeeController = require('../controllers/employee.controller');
// Import middleware 
const authMiddleware = require("../middlewares/auth.middleware");
// Create a route to handle the add employee request on post
router.post("/api/employee",  employeeController.createEmployee);
// Create a route to handle the get all employees request on get
router.get("/api/employees", employeeController.getAllEmployees);
// 

router.get("/api/employee/:id", [authMiddleware.verifyToken],employeeController.getEmployeeById);

router.patch("/api/employee/:id",[authMiddleware.verifyToken, authMiddleware.isAdmin], employeeController.updateEmployee);

router.delete("/api/employee/:id",[authMiddleware.verifyToken, authMiddleware.isAdmin], employeeController.deleteEmployee);

// [authMiddleware.verifyToken, authMiddleware.isAdmin],
// Export the router
module.exports = router;