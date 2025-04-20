import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import createCustomer from '../../../../services/customer.service';
import { useAuth } from "../../../../Contexts/AuthContext";
import { FaEdit } from "react-icons/fa";
import { MdAdsClick } from "react-icons/md";
import { format } from "date-fns";
import { ExternalLink } from "lucide-react";
import Loader from "../../Loader/Loader";


const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [serverError, setServerError] = useState('');
  const [isLoading,setIsLoading] = useState(false)

    // A state to serve as a flag to show the error message 
    const [apiError, setApiError] = useState(false);
    // A state to store the error message 
    const [apiErrorMessage, setApiErrorMessage] = useState(null);
    // Create a variable to hold the user's token


  const { employee } = useAuth();
  let token = null; // To store the token 

  useEffect(() => {
    setIsLoading(true)
    if (employee) {
      token = employee.employee_token;
    }
    else{
      
      return
    }
    console.log(token)
    const customerslist = createCustomer.getAllCustomer(token)
    customerslist.then((res) => {
      if (!res.ok) {
        console.log(res.status);
        setApiError(false);
        setIsLoading(false)
        if (res.status === 401) {
          setIsLoading(false)
          setApiErrorMessage("Please login again");
        } else if (res.status === 403) {
          setApiErrorMessage("You are not authorized to view this page");
          setIsLoading(false)
        } else {
          setApiErrorMessage("Please try again later");
          setIsLoading(false)
        }
      }
      // console.log("res",res)
      return res.json()
    }).then((data) => {
      console.log(data)
      if (data.customers.length !== 0) {
        setCustomers(data.customers)
        setIsLoading(false)
      }

    }).catch((err) => {
      console.log(err);
      setIsLoading(false)
    })
    }, [employee]);

  
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


  return (
    <>
      
    {
      isLoading ? (<Loader />):(

        apiError ? (
          <section className="contact-section">
            <div className="auto-container">
              <div className="contact-title">
                <h2>{apiErrorMessage}</h2>
              </div >
            </div>
          </section>
        ) : (

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
            <th>Edit / view</th>
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
                
                <a href={`/admin/customer/edit/${customer.customer_id}`} className="pr-3">
                  <Button variant="" size="sm">
                  <FaEdit size={18}/>
                  
                  </Button>
                </a>

                <a href={`/admin/customers/${customer.customer_id}`}>
                  <Button variant="outline" size="sm">
                  <ExternalLink className="text-secondary" style={{ width: 18, height: 18 }} /> 
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
        )
      )
    }
    </>
  );
};

export default CustomerList;
