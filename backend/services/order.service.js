const conn = require("../config/db.config");

const addOrder = async (orderData) => {
  const {
    employee_id,
    customer_id,
    vehicle_id,
    order_description,
    estimated_completion_date,
    completion_date,
    order_completed,
    order_services,
  } = orderData;

  try {
    // await connection.beginTransaction();

    // Insert into orders table
    const orderResult = await conn.query(
      `INSERT INTO orders (employee_id, customer_id, vehicle_id, active_order, order_hash) 
       VALUES (?, ?, ?, ?, UUID())`,
      [employee_id, customer_id, vehicle_id, order_completed]
    );

    const order_id = orderResult.insertId;

    // Insert into order_info table
    await conn.query(
      `INSERT INTO order_info (order_id, order_total_price, estimated_completion_date, completion_date, additional_request, notes_for_internal_use, notes_for_customer, additional_requests_completed) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [order_id, 0, estimated_completion_date, completion_date, order_description, null, null, order_completed]
    );

    // Insert into order_services table
    for (const service of order_services) {
      await conn.query(
        `INSERT INTO order_services (order_id, service_id, service_completed) VALUES (?, ?, ?)`,
        [order_id, service.service_id, 0]
      );
    }

    // await connection.commit();
    return { success: true, order_id };
  } catch (error) {
    // await connection.rollback();
    throw error;
  } 
};

module.exports = {
  addOrder,
};
