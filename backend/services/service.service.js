const conn = require("../config/db.config");

// Function to add a new service
async function addService(service_name, service_description) {
  try {
    const query = "INSERT INTO common_services (service_name, service_description) VALUES (?, ?)";
    const row = await conn.query(query, [service_name, service_description]);

    return row.affectedRows > 0;
  } catch (error) {
    console.error("Error adding service:", error);
    throw error;
  }
}

async function getAllServices() {
  try {
    const query = "SELECT * FROM common_services";
    const rows = await conn.query(query);

    return rows;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}
async function getServiceById(params) {
  const query = `SELECT * FROM common_services WHERE service_id = ?`;
  const [row] = await conn.query(query, [params])
  return row;
}
// Function to update a service partially
async function updateService(serviceId, serviceName, serviceDescription) {
  try {
    let updateFields = [];
    let values = [];

    if (serviceName) {
      updateFields.push("service_name = ?");
      values.push(serviceName);
    }
    if (serviceDescription) {
      updateFields.push("service_description = ?");
      values.push(serviceDescription);
    }

    if (updateFields.length === 0) {
      return false; // No fields to update
    }

    values.push(serviceId);
    const query = `UPDATE common_services SET ${updateFields.join(", ")} WHERE service_id = ?`;

    const result = await conn.query(query, values);
    return result.affectedRows > 0; // Returns true if update was successful
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
}

async function deleteService(service_id) {
  try {
    // Optional: First check if the service is linked to any existing orders
    const linkedOrders = await conn.query(
      'SELECT * FROM order_services WHERE service_id = ?',
      [service_id]
    );

    if (linkedOrders.length > 0) {
      throw new Error('Cannot delete service: It is linked to existing orders.');
    }

    // console.log(result)
    // Delete the service from the common_services table
    const result = await conn.query(
      'DELETE FROM common_services WHERE service_id = ?',
      [service_id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Service not found or already deleted.');
    }
    return { success: true, message: 'Service deleted successfully' };
  } catch (err) {
    console.error('Error deleting service:', err.message);
    return { success: false, message: err.message };
  }
}


module.exports = { addService,getAllServices ,getServiceById,updateService,deleteService};
