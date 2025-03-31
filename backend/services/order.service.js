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
    // Begin transaction (uncomment for production)
    // await connection.beginTransaction();

    // Insert into orders table
    const orderResult = await conn.query(
      `INSERT INTO orders (employee_id, customer_id, vehicle_id, active_order, order_hash) 
       VALUES (?, ?, ?, ?, UUID())`,
      [employee_id, customer_id, vehicle_id, order_completed]
    );
    if (orderResult.affectedRows === 0) {
      throw new Error("Failed to create order");
    }
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

    // Insert into order_status table (assuming a default status of 0 for a new order)
    await conn.query(
      `INSERT INTO order_status (order_id, order_status) VALUES (?, ?)`,
      [order_id, 0] // 0 represents a new order status (you can adjust this as needed)
    );

    // Commit transaction (uncomment for production)
    // await connection.commit();

    return { success: true, order_id };
  } catch (error) {
    // Rollback transaction in case of an error (uncomment for production)
    // await connection.rollback();
    throw error;
  }
};



const getAllOrders = async () => {
  try {
    // Fetch all orders with related info, including order status
    const orders = await conn.query(`
      SELECT 
        o.order_id, 
        o.employee_id, 
        o.customer_id, 
        o.vehicle_id, 
        o.order_hash,
        oi.additional_request AS order_description, 
        o.order_date, 
        oi.estimated_completion_date, 
        oi.completion_date, 
        oi.additional_requests_completed AS order_completed,
        os.order_status AS status
      FROM orders o
      LEFT JOIN order_info oi ON o.order_id = oi.order_id
      LEFT JOIN order_status os ON o.order_id = os.order_id
    `);

    // Fetch order services
    const services = await conn.query(`
      SELECT order_id, service_id 
      FROM order_services
    `);

    // Map services to orders
    const ordersWithServices = orders.map((order) => ({
      ...order,
      order_services: services
        .filter((service) => service.order_id === order.order_id)
        .map((s) => ({ service_id: s.service_id })),
    }));

    return ordersWithServices;
  } catch (error) {
    console.error("Error in getAllOrders:", error);
    throw error;
  }
};

const getOrderById = async (orderId) => {
  try {
    // Fetch order details with order status
    const orders = await conn.query(
      `
      SELECT 
        o.order_id, 
        o.employee_id, 
        o.customer_id, 
        o.vehicle_id, 
        oi.additional_request AS order_description, 
        o.order_date, 
        oi.estimated_completion_date, 
        oi.completion_date, 
        oi.additional_requests_completed AS order_completed,
        os.order_status AS status
      FROM orders o
      LEFT JOIN order_info oi ON o.order_id = oi.order_id
      LEFT JOIN order_status os ON o.order_id = os.order_id
      WHERE o.order_id = ?
      `,
      [orderId]
    );

    if (orders.length === 0) {
      return null; // No order found
    }

    // Fetch related services
    const services = await conn.query(
      `
      SELECT service_id 
      FROM order_services 
      WHERE order_id = ?
      `,
      [orderId]
    );

    return {
      ...orders[0],
      order_services: services.map((s) => ({ service_id: s.service_id })),
    };
  } catch (error) {
    console.error("Error in getOrderById:", error);
    throw error;
  }
};


const updateOrder = async (orderId, updateData) => {
  try {
    let orderUpdateFields = [];
    let orderValues = [];

    let orderInfoUpdateFields = [];
    let orderInfoValues = [];

    let orderStatusUpdateFields = [];
    let orderStatusValues = [];
    // Helper function to safely handle undefined values
    const safeValue = (value) => (value !== undefined ? value : null);

    // Update fields for the `orders` table
    if (updateData.employee_id !== undefined) {
      orderUpdateFields.push("employee_id = ?");
      orderValues.push(safeValue(updateData.employee_id));
    }
    if (updateData.customer_id !== undefined) {
      orderUpdateFields.push("customer_id = ?");
      orderValues.push(safeValue(updateData.customer_id));
    }
    if (updateData.vehicle_id !== undefined) {
      orderUpdateFields.push("vehicle_id = ?");
      orderValues.push(safeValue(updateData.vehicle_id));
    }

    // If any fields in the `orders` table need to be updated
    if (orderUpdateFields.length > 0) {
      orderValues.push(orderId);  // Add orderId for WHERE clause
      await conn.query(
        `UPDATE orders SET ${orderUpdateFields.join(", ")} WHERE order_id = ?`,
        orderValues
      );
    }

    // Update fields for the `order_info` table
    if (updateData.order_description !== undefined) {
      orderInfoUpdateFields.push("additional_request = ?");
      orderInfoValues.push(safeValue(updateData.order_description));
    }
    if (updateData.estimated_completion_date !== undefined) {
      orderInfoUpdateFields.push("estimated_completion_date = ?");
      orderInfoValues.push(safeValue(updateData.estimated_completion_date));
    }
    if (updateData.completion_date !== undefined) {
      orderInfoUpdateFields.push("completion_date = ?");
      orderInfoValues.push(safeValue(updateData.completion_date));
    }
    if (updateData.additional_requests_completed !== undefined) {
      orderInfoUpdateFields.push("additional_requests_completed = ?");
      orderInfoValues.push(safeValue(updateData.additional_requests_completed));
    }

    // If any fields in the `order_info` table need to be updated
    if (orderInfoUpdateFields.length > 0) {
      orderInfoValues.push(orderId);  // Add orderId for WHERE clause
      await conn.query(
        `UPDATE order_info SET ${orderInfoUpdateFields.join(", ")} WHERE order_id = ?`,
        orderInfoValues
      );
    }
// Update order status if provided
if (updateData.order_status !== undefined) {
  // Update order status if provided
    if (updateData.order_status !== undefined) {
      orderStatusUpdateFields.push("order_status = ?");
      orderStatusValues.push(safeValue(updateData.order_status));

      // Update order status in the `order_status` table
      orderStatusValues.push(orderId);  // Add orderId for WHERE clause
      await conn.query(
        `UPDATE order_status SET ${orderStatusUpdateFields.join(", ")} WHERE order_id = ?`,
        orderStatusValues
      );
    }


}
    // Update order_services if provided
    if (updateData.order_services) {
      // Delete existing order_services related to this order
      await conn.query(`DELETE FROM order_services WHERE order_id = ?`, [orderId]);

      // Insert the new order_services if they exist
      const serviceValues = updateData.order_services.map((s) => [orderId, s.service_id]);
      if (serviceValues.length > 0) {
        await conn.query(`INSERT INTO order_services (order_id, service_id) VALUES ?`, [serviceValues]);
      }
    }

    return { success: true, message: "Order updated successfully" };
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

module.exports = {
  addOrder,
  getAllOrders,
  getOrderById,
  updateOrder
};
