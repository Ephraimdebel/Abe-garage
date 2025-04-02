const customerService = require("../services/customer.service");

async function addCustomer(req, res) {
  try {
    const { customer_email, customer_phone_number, customer_first_name, customer_last_name, active_customer_status } = req.body;

    // Validate required fields
    if (!customer_email || !customer_phone_number || !customer_first_name || !customer_last_name || active_customer_status === undefined) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Check if customer already exists
    const existingCustomer = await customerService.getCustomerByEmail(customer_email);
    if (existingCustomer) {
      return res.status(409).json({ error: "Customer with this email already exists!" });
    }

    // Add customer to database
    const result = await customerService.addCustomer(customer_email, customer_phone_number, customer_first_name, customer_last_name, active_customer_status);

    return res.status(201).json({ success: true, customer_id: result.customerId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
}


async function getCustomers(req, res) {
  try {
    const customers = await customerService.getCustomers();

    return res.status(200).json({ customers : customers});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch customers" });
  }
}

const getCustomer = async (req, res) => {
    try {
      const { id } = req.params;  // Get the customer ID from the URL parameter
      const customer = await customerService.getCustomerById(id);  // Call the service function
  
      return res.status(200).json(customer);  // Return the customer details
    } catch (error) {
      console.error("Error in getCustomer controller:", error);
      return res.status(500).json({ error: error.message });  // Handle errors
    }
  };
  
  const updateCustomerController = async (req, res) => {
    try {
      const { id } = req.params;  // Get customer ID from URL
      const updatedData = req.body;  // Get updated customer data from request body
  
      const result = await customerService.updateCustomer(id, updatedData);  // Call service function to update customer
  
      return res.status(200).json({ success: "true" });  // Return success response
    } catch (error) {
      console.error("Error in updateCustomerController:", error);
      return res.status(500).json({ error: error.message });  // Return error if update fails
    }
  };
  

module.exports = { addCustomer,getCustomers,getCustomer ,updateCustomerController};
