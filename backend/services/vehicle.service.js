// services/vehicleService.js

const conn = require('../config/db.config'); // Assuming you have a database connection

const addNewVehicle = async (vehicleData) => {
  try {
    const {
      customer_id,
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
    } = vehicleData;

    const query = `
      INSERT INTO customer_vehicle_info (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, 
                            vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const result = await conn.query(query, [
      customer_id,
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
    ]);

    return { success: true };
  } catch (error) {
    console.error('Error adding new vehicle:', error);
    throw error;
  }
};

const getVehicleById = async (vehicleId) => {
    try {
      const query = `
       SELECT 
    v.vehicle_id,
    v.customer_id,
    v.vehicle_year,
    v.vehicle_make,
    v.vehicle_model,
    v.vehicle_type,
    v.vehicle_mileage,
    v.vehicle_tag,
    v.vehicle_serial,
    v.vehicle_color,
    c.customer_email,
    c.customer_phone_number,
    c.customer_added_date,
    c.customer_hash,
    ci.customer_info_id,
    ci.customer_first_name,
    ci.customer_last_name,
    ci.active_customer_status
FROM customer_vehicle_info v
INNER JOIN customer_identifier c ON v.customer_id = c.customer_id
INNER JOIN customer_info ci ON v.customer_id = ci.customer_id
WHERE v.vehicle_id = ?;

      `;
  
      const rows = await conn.query(query, [vehicleId]);
  
      if (rows.length === 0) {
        return null; // No vehicle found
      }
  
      return rows[0]; // Return vehicle details
    } catch (error) {
      console.error("Error fetching vehicle:", error);
      throw error;
    }
  };

  const getVehiclesByCustomerId = async (customerId) => {
    try {
        const query = `
            SELECT 
                v.vehicle_id,
                v.customer_id,
                v.vehicle_year,
                v.vehicle_make,
                v.vehicle_model,
                v.vehicle_type,
                v.vehicle_mileage,
                v.vehicle_tag,
                v.vehicle_serial,
                v.vehicle_color
            FROM customer_vehicle_info v
            WHERE v.customer_id = ?;
        `;

        const vehicles = await conn.query(query, [customerId]);

        return vehicles;
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        throw error;
    }
};

const updateVehicleInfo = async (vehicleId, updateFields) => {
    try {
        const validFields = [
            "vehicle_year", "vehicle_make", "vehicle_model",
            "vehicle_type", "vehicle_mileage", "vehicle_tag",
            "vehicle_serial", "vehicle_color"
        ];

        let setClause = [];
        let values = [];

        Object.entries(updateFields).forEach(([key, value]) => {
            if (validFields.includes(key)) {
                setClause.push(`${key} = ?`);
                values.push(value);
            }
        });

        if (setClause.length === 0) {
            throw new Error("No valid fields provided for update.");
        }

        values.push(vehicleId); // Add the vehicle ID at the end

        const query = `
            UPDATE customer_vehicle_info 
            SET ${setClause.join(", ")}
            WHERE vehicle_id = ?;
        `;

        const result = await conn.query(query, values);

        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error updating vehicle info:", error);
        throw error;
    }
};


module.exports = { addNewVehicle ,getVehicleById,getVehiclesByCustomerId,updateVehicleInfo};
