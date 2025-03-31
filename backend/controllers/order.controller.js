const orderService = require("../services/order.service");

const addOrder = async (req, res) => {
    try {
        const orderData = req.body;
        // Validate required fields
        if (!orderData.order_services || orderData.order_services.length === 0) {
            return res.status(400).json({ error: "Order services are required" });
        }
        // Validate other required fields
        // Assuming employee_id, customer_id, and vehicle_id are required
        if (!orderData.employee_id || !orderData.customer_id || !orderData.vehicle_id) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const orderId = await orderService.addOrder(orderData);

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order_id: orderId
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getAllOrders = async (req, res) => {
    try {
      const orders = await orderService.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

  const getOrderById = async (req, res) => {
    try {
      const { id } = req.params;
      const order = await orderService.getOrderById(id);
  
      if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
  
      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

  const updateOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({ success: false, message: "No update data provided" });
      }
  
      const result = await orderService.updateOrder(id, updateData);
      res.json(result);
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  
module.exports = {
    addOrder,
    getAllOrders,
    getOrderById,
    updateOrder
};