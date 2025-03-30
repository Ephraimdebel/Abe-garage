const conn = require("../config/db.config");
const bcrypt = require("bcrypt")

// Function to add a new customer
async function addCustomer(email, phoneNumber, firstName, lastName, status) {
  try {

    // Generate a hashed value for customer security
    const customerHash = await bcrypt.hash(email, 10); 

    // Insert into `customer_identifier`
    const customerResult = await conn.query(
      `INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash)
       VALUES (?, ?, ?)`,
      [email, phoneNumber, customerHash]
    );

    const customerId = customerResult.insertId; // Get newly inserted customer_id

    // Insert into `customer_info`
    await conn.query(
      `INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status)
       VALUES (?, ?, ?, ?)`,
      [customerId, firstName, lastName, status]
    );

    return { success: true, customerId };
  } catch (error) {
    console.error("Error adding customer:", error);
    throw error;
  } 
}

// Function to check if a customer already exists
async function getCustomerByEmail(email) {
  try {
    const rows = await conn.query("SELECT * FROM customer_identifier WHERE customer_email = ?", [email]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error;
  }
}

// Function to fetch customers with joins and ordering
async function getCustomers() {
    try {
      // Ensure the limit is a number and falls back to 10 if not provided
  
      const query = `
        SELECT 
          ci.customer_id, 
          ci.customer_email, 
          ci.customer_phone_number, 
          ci.customer_hash, 
          ci.customer_added_date, 
          info.customer_first_name, 
          info.customer_last_name, 
          info.active_customer_status
        FROM customer_identifier ci
        INNER JOIN customer_info info 
          ON ci.customer_id = info.customer_id
        ORDER BY ci.customer_id ;
      `;
      
      // Passing the limit correctly as the parameter
      const [rows] = await conn.query(query);
  
      return rows;
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw error;
    }
  }
  const getCustomerById = async (customerId) => {
    try {
      const query = `
        SELECT 
          ci.customer_id, 
          ci.customer_email, 
          ci.customer_phone_number, 
          ci.customer_hash, 
          ci.customer_added_date, 
          info.customer_first_name, 
          info.customer_last_name, 
          info.active_customer_status
        FROM customer_identifier ci
        INNER JOIN customer_info info 
          ON ci.customer_id = info.customer_id
        WHERE ci.customer_id = ?;
      `;
  
      // Execute the query with the customerId as a parameter
      const rows = await conn.query(query, [customerId]);
      
      if (rows.length === 0) {
        throw new Error("Customer not found");
      }
  
      return rows[0];  // Return the first customer, since the ID should be unique
    } catch (error) {
      console.error("Error fetching customer by ID:", error);
      throw error;
    }
  };
  
  const updateCustomer = async (customerId, updatedData) => {
    try {
      // Initialize an array to hold the dynamic SET fields and values
      const setClauses = [];
      const values = [];
    
      // Check which fields are provided and add them to the query
      if (updatedData.customer_email) {
        setClauses.push('ci.customer_email = ?');
        values.push(updatedData.customer_email);
      }
      if (updatedData.customer_phone_number) {
        setClauses.push('ci.customer_phone_number = ?');
        values.push(updatedData.customer_phone_number);
      }
      if (updatedData.customer_hash) {
        setClauses.push('ci.customer_hash = ?');
        values.push(updatedData.customer_hash);
      }
      if (updatedData.customer_first_name) {
        setClauses.push('info.customer_first_name = ?');
        values.push(updatedData.customer_first_name);
      }
      if (updatedData.customer_last_name) {
        setClauses.push('info.customer_last_name = ?');
        values.push(updatedData.customer_last_name);
      }
      if (updatedData.active_customer_status !== undefined) {
        setClauses.push('info.active_customer_status = ?');
        values.push(updatedData.active_customer_status);
      }
  
      // If no fields were provided, throw an error
      if (setClauses.length === 0) {
        throw new Error('No data to update');
      }
  
      // Construct the final query
      const query = `
        UPDATE customer_identifier ci
        INNER JOIN customer_info info 
          ON ci.customer_id = info.customer_id
        SET ${setClauses.join(', ')}
        WHERE ci.customer_id = ?;
      `;
    
      // Add customerId to the values array
      values.push(customerId);
  
      // Execute the query
      const result = await conn.query(query, values);
    
      // Check if any rows were affected
      if (result.affectedRows === 0) {
        throw new Error("Customer not found or no changes made");
      }
    
      return { success: true };
    } catch (error) {
      console.error("Error updating customer:", error);
      throw error;
    }
  };
  

module.exports = { addCustomer, getCustomerByEmail ,getCustomers,getCustomerById,updateCustomer};
