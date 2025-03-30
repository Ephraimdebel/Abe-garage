const orderService = require("../services/order.service");

const addOrder = async (req, res) => {
    try {
        const { employee_id, customer_id, vehicle_id } = req.body;

        if (!employee_id || !customer_id || !vehicle_id) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const orderId = await orderService.createOrder(employee_id, customer_id, vehicle_id);

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order_id: orderId
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    addOrder
};