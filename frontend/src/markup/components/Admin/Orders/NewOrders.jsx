import React, { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";
import createCustomer from '../../../../services/customer.service';
import { useAuth } from "../../../../Contexts/AuthContext";
import { format } from "date-fns";
import { useNavigate } from "react-router";

const NewOrders = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [serverError, setServerError] = useState('');

  const { employee } = useAuth();
  const loggedInEmployeeToken = employee?.employee_token || '';

  const navigator = useNavigate()

  const handleClick = () =>{
    navigator("/admin/add-customer")
  }


const handleRowClick = (customerId) => {
  navigator(`/admin/orderstwo/${customerId}`);
};


  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await createCustomer.getAllCustomer(loggedInEmployeeToken);
        const data = await response.json();
        console.log("Fetched customers:", data?.customers);
        if (!data) {
          setServerError(data.error);
        } else {
          setCustomers(data?.customers || []);
          setFilteredCustomers(data?.customers || []);
        }
      } catch (err) {
        console.log(err);
        setServerError("Failed to fetch customers.");
      }
    };

    fetchCustomers();
  }, [searchTerm]);
  
  
  // Filter customers when search term changes
  useEffect(() => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    const filtered = customers.filter((customer) =>
      customer.customer_first_name?.toLowerCase().includes(lowerCaseTerm) ||
    customer.customer_last_name?.toLowerCase().includes(lowerCaseTerm) ||
    customer.customer_email?.toLowerCase().includes(lowerCaseTerm) ||
    customer.customer_phone_number?.toLowerCase().includes(lowerCaseTerm)
  );
  console.log("customers",filtered)
    setFilteredCustomers(filtered);
  }, [searchTerm,customers]);

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Create a new order</h2>
        </div>

        <div className="container mt-1 mb-5">
          <Form.Control
            type="text"
            placeholder="Search for a customer using first name, last name, email or phone number"
            className="mb-3 p-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

     

          {filteredCustomers.length > 0 ? (
        <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Joined At</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer, index) => (
            <tr
              key={customer.customer_id || index}
              onClick={() => handleRowClick(customer.customer_id)}
              style={{ cursor: "pointer" }}
              className="table-row-hover"
            >
              <td>{index + 1}</td>
              <td>{customer.customer_first_name} {customer.customer_last_name}</td>
              <td>{customer.customer_email}</td>
              <td>{customer.customer_phone_number}</td>
              <td>{customer.customer_added_date ? format(new Date(customer.customer_added_date), "MMM dd, yyyy") : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      
          ) : (
            <>
            <p className="text-muted">No customers found.</p>

            <div className="form-group col-md-12 mb-4">
            <button className="theme-btn btn-style-one" onClick={handleClick}>
              <span>Add new customer</span>
            </button>
          </div>
          </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewOrders;
