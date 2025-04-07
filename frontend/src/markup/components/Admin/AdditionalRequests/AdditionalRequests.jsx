import React ,{useEffect,useState}from 'react'
import serviceServices from '../../../../services/service.service';
import ServiceCard from '../../ServiceLIst/ServiceCard';
import vehicleService from "../../../../services/vehicle.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import { FaEdit } from "react-icons/fa";
import ServiceOrderCard from '../Orders/ServiceOrderCard';
const AdditionalRequests = ({id}) => {

    const [price, setPrice] = React.useState("");
    const [service_description, setServiceDescription] = React.useState("");
    const [error,setError] = React.useState("")
    const [success,setSuccess] = React.useState("")
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);



     let loggedInEmployeeToken = "";
     // Destructure the auth hook and get the token
     const { employee } = useAuth();
     if (employee && employee.employee_token) {
       loggedInEmployeeToken = employee.employee_token;
     }

     const handleServiceToggle = (id) => {
        setSelectedServices(prev =>
          prev.includes(id)
            ? prev.filter(serviceId => serviceId !== id) // remove if already selected
            : [...prev, id] // add if not selected
        );
      };
      
     useEffect(() => {
         const vehiclelist = vehicleService
               .getVehicle(loggedInEmployeeToken, id)
               .then((response) => response.json())
               .then((data) => {
                 console.log("here -> ",data.data);
                 // If Error is returned from the API server, set the error message
                 if (!data) {
                   setServerError("data error");
                 } else {
                   // Handle successful response
                   setVehicle(data.data);
                 }
               })
               .catch((err) => {
                 console.log(err);
               });
 
               const service = serviceServices.getAllServices(loggedInEmployeeToken).then((response) => response.json()).then((data) => {
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
     },[])
 

    const handleSubmit = (e) =>{
        e.preventDefault();
       

        const formData = {
            price,
            service_description,
            selected_services: selectedServices
          };
          

        const newservice = serviceServices.createService(formData).then((response) => response.json()).then((data) => {
            // If Error is returned from the API server, set the error message
            if (!data) {
              setError(data.error)
            } else {
              // Handle successful response
              console.log(data);
              setPrice("");
                setServiceDescription("");
                setError("");
                setSuccess("Service added successfully");
            }
          }
        ).catch((err) => {
            console.log(err);
          }
        );

    }


  return (
    <section class="contact-section pl-5 mt-3" style={{backgroundColor: "#ffff"}}>
    <div class="auto-container " >

    {services.map((service) => (
  <ServiceOrderCard
    key={service.service_id}
    service={service}
    checked={selectedServices.includes(service.service_id)}
    onCheckChange={handleServiceToggle}
  />
))}

        <div class="contact-title"  >
            <h2 >Additional Requests</h2>
            <div class="text">Praising pain was born and I will give you a complete account of the system, and </div>
        </div>
        <div class="row clearfix"  style={{backgroundColor: "#ffff"}}>
            
            <div class="form-column col-lg-9">
                <div class="inner-column">
                    <div class="contact-form">
                        <form onSubmit={handleSubmit}>
                            <div class="row clearfix">
                                <div class="form-group col-md-12">
                                    <input />
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    {success && <div className="alert alert-success">{success}</div>}
                                    {/* {error && <div className="validation-error" role="alert">{error}</div>} */}
                                </div>
                                <div class="form-group col-md-12">
                                    <textarea name="service_description" value={service_description} onChange={event => setServiceDescription(event.target.value) } placeholder="service description"></textarea>
                                </div>

                                <div class="form-group col-md-12">
                                    <input type="text" name="service_name" value={price} onChange={event => setPrice(event.target.value) } placeholder="price" required/>
                                </div>
                           
                                
                                    
                                <div class="form-group col-md-12">
                                    <input />
                                </div>
                                
                                
                                <div class="form-group col-md-12">
                                    <input id="form_botcheck" name="form_botcheck" class="form-control" type="hidden" value=""/>
                                    <button class="theme-btn btn-style-one" type="submit" data-loading-text="Please wait..."><span>Submit order</span></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
           
            
        </div>
    </div>
</section>
  )
}

export default AdditionalRequests