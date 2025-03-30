// Import the employee service 
const employeeService = require('../services/employee.service');

// Create the add employee controller
async function createEmployee(req, res, next) {

  // console.log(req.headers); 

  // Check if employee email already exists in the database 
  const employeeExists = await employeeService.checkIfEmployeeExists(req.body.employee_email);
  // If employee exists, send a response to the client
  if (employeeExists) {
    res.status(400).json({
      error: "This email address is already associated with another employee!"
    });
  } else {
    try {
      const employeeData = req.body;
      // Create the employee
      const employee = await employeeService.createEmployee(employeeData);
      if (!employee) {
        res.status(400).json({
          error: "Failed to add the employee!"
        });
      } else {
        res.status(200).json({
          status: "true",
        });
      }
    } catch (error) {
      console.log(err);
      res.status(400).json({
        error: "Something went wrong!"
      });
    }
  }
}

// Create the getAllEmployees controller 
async function getAllEmployees(req, res, next) {
  // Call the getAllEmployees method from the employee service 
  const employees = await employeeService.getAllEmployees();
  // console.log(employees);
  if (!employees) {
    res.status(400).json({
      error: "Failed to get all employees!"
    });
  } else {
    res.status(200).json({
      status: "success",
      data: employees,
    });
  }
}


// Create the getAllEmployees controller 
async function getEmployeeById(req, res, next) {
  const {id} = req.params
  // Call the getAllEmployees method from the employee service 
  const employees = await employeeService.getEmployeeById(id);
  // console.log(employees);
  if (!employees) {
    res.status(400).json({
      error: "Failed to get all employees!"
    });
  } else {
    res.status(200).json({
      status: "success",
      data: employees,
    });
  }
}

async function updateEmployee(req, res, next) {
  try {
    const employeeData = req.body;

    // Check if the employee exists before updating
    const employeeExists = await employeeService.checkIfEmployeeExists(employeeData.employee_id);
    
    if (!employeeExists) {
      return res.status(400).json({
        error: "Employee not found!"
      });
    }

    // Update the employee
    const updatedEmployee = await employeeService.updateEmployee(employeeData);

    if (!updatedEmployee) {
      return res.status(400).json({
        error: "Failed to update the employee!"
      });
    }

    return res.status(200).json({
      status: "true",
    });

  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error: "Something went wrong!"
    });
  }
}

async function deleteEmployee(req, res, next) {
  try {
    const { id } = req.params;

    // Ensure the ID is valid
    if (!id) {
      return res.status(400).json({ error: "Employee ID is required!" });
    }

    // Delete the employee
    const success = await employeeService.deleteEmployee(id);

    if (!success) {
      return res.status(400).json({ error: "Failed to delete the employee!" });
    }

    return res.status(200).json({ success: "true" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
}
// Export the createEmployee controller 
module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
};