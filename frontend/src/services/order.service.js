const api_url = import.meta.env.VITE_API_URL;

const creatOrder = async (formData,loggedInEmployeeToken) => {
    console.log("formdata->",formData)
    const requestOption = {
        method : 'POST',
        headers:{
            'Content-Type':'application/json',
            'x-access-token':loggedInEmployeeToken

        },
        body:JSON.stringify(formData)
    }
    const response = await fetch(`${api_url}/api/order`,requestOption)

    return response;

}

const getAllOrders = async(loggedInEmployeeToken) =>{
    const requestOption = {
        method:'GET',
        headers:{
            'Content-Type':'applications/json',
            'x-access-token' : loggedInEmployeeToken
        },
    
    }

    const response = await fetch(`${api_url}/api/orders`,requestOption)
    return response
}      
const getOrderById = async(id,loggedInEmployeeToken)=>{
    const requestOption = {
        method:'GET',
        headers:{
            'Content-Type':'applications/json',
            'x-access-token' : loggedInEmployeeToken
        }

    }
    const response = await fetch(`${api_url}/api/order/${id}`,requestOption)
    return response
}
const orderService = {
    creatOrder,
    getAllOrders,
    getOrderById
}

export default orderService