import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import orderService from "../../../../services/order.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import { FaRegEdit } from "react-icons/fa";

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("")


  let loggedInEmployeeToken = "";
 const { employee } = useAuth();
    if (employee && employee.employee_token) {
      loggedInEmployeeToken = employee.employee_token;
    }
  useEffect(() => {
    const orders = orderService.getAllOrders(loggedInEmployeeToken).then((data)=>data.json()).then((data)=>{
      if(!data){
        setError("Internal server error")
      }else{
        console.log(data)

        setOrders(data)
      }
    })
  }, []);

  return (
    <section className="contact-section">
    <div className="auto-container table-responsive" style={{ overflowX: "auto"}}>
      <div className="contact-title">
        <h2>Orders</h2 >
      </div >
  <table className="table table-striped table-bordered table-hover text-sm ">
    <thead className="table-light">
      <tr>
        <th>Order Id</th>
        <th>Customer</th>
        <th>Vehicle</th>
        <th>Order Date</th>
        <th>Received by</th>
        <th>Order Status</th>
        <th>View/Edit</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order) => (
        <tr key={order.order_id}>
          <td className="fw-bold">{order.order_id}</td>
          <td>
            <div className="fw-medium">{order.customer_name}</div>
            <div className="text-muted small">{order.customer_email}</div>
            <div className="text-muted small">{order.customer_phone}</div>
          </td>
          <td>
            <div className="fw-semibold">{order.vehicle_make} {order.vehicle_model}</div>
            <div className="text-muted ">{order.vehicle_year}</div>
            <div className="text-muted ">{order.plate_number}</div>
          </td>
          <td>{new Date(order.order_date).toLocaleDateString()}</td>
          <td>{order.received_by}</td>
          <td>
          <span
  className={`badge rounded-pill ${
    order.order_status === 2
      ? "bg-success"
      : order.order_status === 1
      ? "bg-warning text-dark"
      : "bg-dark text-white"
  }`}
>
  {order.order_status === 2
    ? "Completed"
    : order.order_status === 1
    ? "In Progress"
    : "Received"}
</span>

          </td>
          <td>
            <div className="d-flex gap-4">
              <a href={`/orders/view/${order.order_id}`}>
                  <FaRegEdit className="text-dark cursor-pointer mr-2" size={18} />
              </a>
              <a href={`/admin/order/${order.order_id}`}>
                <ExternalLink className="text-secondary" style={{ width: 16, height: 16 }} />
              </a>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</section>

  );
}
