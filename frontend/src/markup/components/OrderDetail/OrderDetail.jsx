import React, { useEffect, useState } from 'react'
import OrderServiceCard from './OrderServiceCard'
import orderService from '../../../services/order.service'
import { useAuth } from '../../../Contexts/AuthContext'
import { useParams } from 'react-router'

function OrderDetail() {
    const {id} = useParams()
    const [singleOrder,setSingleOrder] = useState("")
    const [services,setServices] = useState([])
    const [error,setError] = useState("")


    let loggedInEmployeeToken = ""
    const {employee} = useAuth()
    if (employee && employee.employee_token){
        loggedInEmployeeToken = employee.employee_token

    }
    useEffect(()=>{
        const singleOrder = orderService.getOrderById(id,loggedInEmployeeToken).then((response)=>response.json()).then((data)=>{
            if (!data){
                setError('invalid request')
            }else{
                setServices(data.services)
                setSingleOrder(data[0])

            }
        })
    },[])
    console.log("services ",services)
  return (
    <section className="services-section">
    <div className="auto-container">
    <div class="sec-title style-two">
  <div class="d-flex justify-content-between align-items-center">
    <h2>{singleOrder?.customer_first_name} {singleOrder?.customer_last_name}</h2>
    <div className="badge rounded-pill bg-warning text-dark p-2">in progress</div>
  </div>
  <div class="text">
    You can track the progress of your order using this page. we will constantly update this page to let you know how  we are progressing . As soon as we are done with the order , the status will turn green. That means, your car is ready for pickup
  </div>
</div>


        <div className="row">
            <div className="col-lg-6 service-block-one">
                <div className="inner-box hvr-float-shadow">
                    <h5>Customer </h5>
                    <h2>{singleOrder?.customer_first_name} {singleOrder?.customer_last_name}</h2>
                    <p>Email: <span className='text-muted small'>{singleOrder?.customer_email}</span></p>
                    <p>phone Number: <span className='text-muted small'>{singleOrder?.customer_phone_number}</span></p>
                    <p>Active customer: <span className='text-muted small'>{singleOrder?.active_customer_status} </span></p>
                    {/* <a href="#" className="read-more">read more +</a> */}
                    {/* <div className="icon"><span className="flaticon-power"></span></div> */}
                </div>
            </div>
            <div className="col-lg-6 service-block-one">
                <div className="inner-box hvr-float-shadow">
                    <h5>car in Service: </h5>
                    <h2>{singleOrder?.vehicle_make} </h2>
                    <p>vehicle tag: <span className='text-muted small'>{singleOrder?.vehicle_tag}</span></p>
                    <p>vehicle year: <span className='text-muted small'>{singleOrder?.vehicle_year}</span> </p>
                    <p>vehicle  mileage: <span className='text-muted small'>{singleOrder?.vehicle_mileage}</span> </p>
                    {/* <div className="icon"><span className="flaticon-gearbox"></span></div> */}
                </div>
            </div>
    
            <div className="col-lg-12 service-block-one">
                <div className="inner-box hvr-float-shadow">
                    <h5>{singleOrder?.vehicle_make} </h5>
                    <h2>Requested service</h2>
                    {services?.map((service) => (
                    <OrderServiceCard key={service.id} service={service} />
))}

                    
                    {/* <a href="#" className="read-more">read more +</a> */}
                    {/* <div className="icon"><span className="flaticon-spray-gun"></span></div> */}
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default OrderDetail