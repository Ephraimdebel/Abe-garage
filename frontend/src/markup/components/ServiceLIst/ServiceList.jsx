import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import ServiceCard from "./ServiceCard";
import AddService from "../Admin/AddService/AddService";
import serviceServices from "../../../services/service.service";
import { useAuth } from "../../../Contexts/AuthContext";
import { useState } from "react";
const ServiceListCard = () => {
     const [services, setServices] = useState([]);
const [serverError, setServerError] = useState(null);


  // Create a variable to hold the user's token
  let loggedInEmployeeToken = '';
  // Destructure the auth hook and get the token 
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

    useEffect(() => {
        const customerslist = serviceServices.getAllServices(loggedInEmployeeToken).then((response) => response.json()).then((data) => {
            // console.log("here -> ",data);
            // If Error is returned from the API server, set the error message
            if (!data) {
              setServerError(data.error)
            } else {
              // Handle successful response
              setServices(data);
            }
          }).catch((err) => {
            console.log(err);
          }
        );
        }, []);
  return (
    <section className="contact-section">
      <div className="auto-container">
      <div className="contact-title">
          <h2>Services We provide</h2>
          <div className="text">Bring to the table win-win survival strategies to ensure proactive domination. At
                the end of the day, going forward, a new normal that has evolved from generation X is on the
                runway heading towards a streamlined cloud solution. </div>
     
        </div>

        <div className="row clearfix">
{
            services.map((service) => (
                <ServiceCard key={service.service_id} service={service} />
            ))
}
<AddService/>

        
      </div>
      </div>
    </section>
  );
};

export default ServiceListCard;
