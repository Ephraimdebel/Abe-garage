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

const getAllOrders = async(token) =>{
    const requestOption = {
        method:'GET',
        headers:{
            'Content-Type':'applications/json',
            'x-access-token' : token
        }
    
    }

    const response = await fetch(`${api_url}/api/orders`,requestOption)
    return response;
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

async function updateOrderStatus(orderId, newStatus, token) {
    return fetch(`${api_url}/api/order/${orderId}/status`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        'x-access-token' : token
      },
      body: JSON.stringify({ order_status: newStatus }),
    });
  }

async function deleteOrder(id,token){
    const requestOption = {
        method: 'DELETE',
        headers : {
            'Content-Type':'application/json',
            'x-access-token':token
        }
    }

    const response = await fetch(`${api_url}/api/order/${id}`,requestOption)

    return response
}
  
const orderService = {
    creatOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
}

export default orderService