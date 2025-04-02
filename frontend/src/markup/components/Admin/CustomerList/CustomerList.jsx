import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import createCustomer from '../../../../services/customer.service';
import { useAuth } from "../../../../Contexts/AuthContext";
import { FaEdit } from "react-icons/fa";
import { MdAdsClick } from "react-icons/md";
import { format } from "date-fns";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
    const [serverError, setServerError] = useState('');
    // Create a variable to hold the user's token
    let loggedInEmployeeToken = '';
    // Destructure the auth hook and get the token 
    const { employee } = useAuth();
    if (employee && employee.employee_token) {
      loggedInEmployeeToken = employee.employee_token;
    }
  useEffect(() => {
    const customerslist = createCustomer.getAllCustomer(loggedInEmployeeToken).then((response) => response.json()).then((data) => {
        // console.log("here -> ",data);
        // If Error is returned from the API server, set the error message
        if (!data) {
          setServerError(data.error)
        } else {
          // Handle successful response
          setCustomers(data?.customers);
          setTotalPages(data?.totalPages);
        }
      }).catch((err) => {
        console.log(err);
      }
    );
    }, [currentPage, loggedInEmployeeToken]);

  
//     const handleSearch = (event) => {
//     const query = event.target.value.toLowerCase();
//     const filteredCustomers = customers.filter((customer) =>
//       customer.firstName.toLowerCase().includes(query) ||
//       customer.lastName.toLowerCase().includes(query) ||
//       customer.email.toLowerCase().includes(query) ||
//       customer.phone.toLowerCase().includes(query)
//     );
//     setCustomers(filteredCustomers);
//   };

// console.log("customers -> ", customers);

  return (
    <section className="contact-section">
    <div className="auto-container">
      <div className="contact-title">
        <h2>Customers</h2>
      </div>
    <div className="container mt-4 mb-5">
      <Form.Control
        type="text"
        placeholder="Search for a customer using first name, last name, email or phone number"
        className="mb-5 p-4"
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Added Date</th>
            <th>Active</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {customers?.map((customer) => (
              <tr key={customer.customer_id}>
           
              <td>{customer.customer_id}</td>
              <td>{customer.customer_first_name}</td>
              <td>{customer.customer_last_name}</td>
              <td>{customer.customer_email}</td>
              <td>{customer.customer_phone_number}</td>
              <td>{format(new Date(customer.customer_added_date), "MM - dd - yyyy | HH:mm")}</td>
              <td>{customer.active_customer_status ? "Yes" : "No"}</td>
              <td className="d-flex justify-content-center align-items-center">
                {/* <Button variant="outline-primary" size="sm">
                  ✏️
                </Button> */}
                
                <a href={`/admin/customers/${customer.customer_id}`} className="pr-3">
                  <Button variant="outline-primary" size="sm">
                  <FaEdit />
                  </Button>
                </a>

                <a href={`/admin/customers/${customer.customer_id}`}>
                  <Button variant="outline-primary" size="sm">
                  <MdAdsClick />
                  </Button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center mt-3">
        <Button
          variant="secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>
        <span className="mx-3 align-self-center">Page {currentPage} of {totalPages}</span>
        <Button
          variant="primary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
    </div>
    </section>
  );
};

export default CustomerList;
