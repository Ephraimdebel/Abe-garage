import React from "react";
import { Card } from "react-bootstrap";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
const ServiceCard = ({service}) => {
    return (
<Card className="shadow-sm my-1 w-100">
<Card.Body className="py-3">
  <div className="d-flex align-items-center justify-content-between">
    <Card.Title className="fw-bold mb-0 style-two">
      <div >

      <h4 className="mb-0 fw-bold">{service.service_name}</h4>
      </div>
    </Card.Title>
    <div className="d-flex gap-4">
        
      <FaRegEdit className="text-danger cursor-pointer mr-2" size={18} />
      <FaTrashAlt className="text-dark cursor-pointer" size={18} />
    </div>
  </div>
  <Card.Text className="text-muted mt-2">
    {service.service_description}
    <br />
    
    
  </Card.Text>
</Card.Body>
</Card>
    );
}
export default ServiceCard;