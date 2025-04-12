const serviceService = require("../services/service.service");

async function addService(req, res) {
  try {
    const { service_name, service_description } = req.body;

    if (!service_name) {
      return res.status(400).json({ error: "Service name is required!" });
    }

    const success = await serviceService.addService(service_name, service_description);

    if (!success) {
      return res.status(500).json({ error: "Failed to add service!" });
    }

    return res.status(201).json({ success: "true" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
}
async function getAllServices(req, res) {
  try {
    const services = await serviceService.getAllServices();

    // Check if services exist
    if (!services) {
      return res.status(404).json({ message: "No services found!" });
    }

    return res.status(200).json(services);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
}


async function getServiceById(req,res) {
  try{

    const {id} = req.params
    // Validate if ID is a number
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid service ID!" });
    }
    const service = await serviceService.getServiceById(id);
    if (!service){
      res.status(400).json({
        error : " Failed to get employee!"
      });
    }else{
      res.status(200).json(service)
    }
  }catch{
    return res.status(500).json({ error: "Something went wrong!" });
  }
}
async function updateService(req, res) {
  try {
    const { service_id, service_name, service_description } = req.body;

    // Validate service ID
    if (!service_id || isNaN(service_id)) {
      return res.status(400).json({ error: "Invalid service ID!" });
    }

    // Ensure at least one field is provided for update
    if (!service_name && !service_description) {
      return res.status(400).json({ error: "At least one field is required to update!" });
    }

    // Call service layer function
    const success = await serviceService.updateService(service_id, service_name, service_description);

    if (!success) {
      return res.status(404).json({ message: "Service not found!" });
    }

    return res.status(200).json({ success: "true" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
}

async function deleteService(req,res){
 
  try{

    const {id} = req.params;
   
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid service ID!" });
    }
    const service = await serviceService.deleteService(id)
    if (!service?.success){
      res.status(400).json({error:service?.message})
    }
    else{
      res.status(200).json({success:"true"})
    }

  }catch{
    res.status(500).json({error:"server error"})
  }
}

module.exports = { addService,getAllServices,getServiceById,updateService ,deleteService};
