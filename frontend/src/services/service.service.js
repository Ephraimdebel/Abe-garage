const api_url =  import.meta.env.VITE_API_URL;

const createService = async (formData, loggedInEmployeeToken) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': loggedInEmployeeToken
      },
      body: JSON.stringify(formData)
    };
    console.log(requestOptions);
    const response = await fetch(`${api_url}/api/service`, requestOptions);
    return response;
  }

  // A function to send get request to get all employees

// A function to send get request to get all employees
const getAllServices = async (loggedInEmployeeToken) => {
    // console.log(token);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': loggedInEmployeeToken
      }
    };
    const response = await fetch(`${api_url}/api/service`, requestOptions);
    return response;
  }

  
  const serviceServices = {
    getAllServices,
    createService
  }

  export default serviceServices;