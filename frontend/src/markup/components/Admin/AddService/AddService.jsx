import React from 'react'
import serviceServices from '../../../../services/service.service';

const AddService = () => {
    const [service_name, setServiceName] = React.useState("");
    const [service_description, setServiceDescription] = React.useState("");
    const [error,setError] = React.useState("")
    const [success,setSuccess] = React.useState("")
    const handleSubmit = (e) =>{
        e.preventDefault();
        let valid = true
        if (!service_name || !service_description){
            setError("all fields are required")
            valid = false
        }
        if (!valid){
            return
        }

        const formData={
            service_name,
            service_description
        }

        const newservice = serviceServices.createService(formData).then((response) => response.json()).then((data) => {
            // If Error is returned from the API server, set the error message
            if (!data) {
              setError(data.error)
            } else {
              // Handle successful response
              console.log(data);
                setServiceName("");
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
        <div class="contact-title"  >
            <h2 >Add a new service</h2>
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
                                    <input type="text" name="service_name" value={service_name} onChange={event => setServiceName(event.target.value) } placeholder="service name" required/>
                                </div>
                           
                                
                                    
                                <div class="form-group col-md-12">
                                    <input />
                                </div>
                                
                                <div class="form-group col-md-12">
                                    <textarea name="service_description" value={service_description} onChange={event => setServiceDescription(event.target.value) } placeholder="service description"></textarea>
                                </div>
                                
                                <div class="form-group col-md-12">
                                    <input id="form_botcheck" name="form_botcheck" class="form-control" type="hidden" value=""/>
                                    <button class="theme-btn btn-style-one" type="submit" data-loading-text="Please wait..."><span>Add service</span></button>
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

export default AddService