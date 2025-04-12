import React, { useEffect, useState } from "react";
import serviceServices from "../../../services/service.service";
import { useAuth } from "../../../Contexts/AuthContext";
import ServiceCard from "./ServiceCard";
import AddService from "../Admin/AddService/AddService";
import EditServiceModal from "./EditServiceModal"; // Import modal

const ServiceListCard = () => {
  const [services, setServices] = useState([]);
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const { employee } = useAuth();
  const loggedInEmployeeToken = employee?.employee_token || "";

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this service?");
    if (!confirm) return;

    serviceServices
      .deleteService(id, loggedInEmployeeToken)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          setServices((prev) => prev.filter((serv) => serv.service_id !== id));
          setSuccess("Service successfully deleted");
          setError("");
        } else {
          setError(data?.error || "Delete failed");
          setSuccess("");
        }
      });
  };

  const handleEditClick = (service) => {
    setSelectedService(service);
    setShowEditModal(true);
  };

  const handleSaveEdit = (id, name, description) => {
    serviceServices
      .updateService(id, name, description, loggedInEmployeeToken)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          setServices((prev) =>
            prev.map((srv) =>
              srv.service_id === id
                ? { ...srv, service_name: name, service_description: description }
                : srv
            )
          );
          setSuccess("Service updated successfully");
          setError("");
          setShowEditModal(false);
        } else {
          setError(data?.error || "Update failed");
        }
      })
      .catch((err) => {
        console.log(err);
        setError("An error occurred");
      });
  };

  useEffect(() => {
    serviceServices
      .getAllServices(loggedInEmployeeToken)
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          setServerError(data?.error || "Server error");
        } else {
          setServices(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Services We provide</h2>
          <div className="text">
            Bring to the table win-win survival strategies to ensure proactive domination...
          </div>
        </div>

        {/* Alerts */}
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {serverError && <div className="alert alert-danger">{serverError}</div>}

        <div className="row clearfix">
          {services.map((service) => (
            <ServiceCard
              key={service.service_id}
              service={service}
              handleDelete={handleDelete}
              handleEditClick={handleEditClick}
            />
          ))}
          <AddService />
        </div>

        {/* Edit Modal */}
        <EditServiceModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          service={selectedService}
          onSave={handleSaveEdit}
        />
      </div>
    </section>
  );
};

export default ServiceListCard;
