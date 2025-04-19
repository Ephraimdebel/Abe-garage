// Import react 
import React from 'react';
// Import the Routes and Route components from react-router 
import { Routes, Route } from "react-router";
// Import the page components 
import Home from "./markup/pages/Home";
import Login from "./markup/pages/Login";
import AddEmployee from './markup/pages/admin/AddEmployee';
import Unauthorized from './markup/pages/Unauthorized';
// Import the Orders and Customers components 
import Orders from './markup/pages/admin/Orders';
import Customers from './markup/pages/admin/Customers';
// Import the Employees component 
import Employees from './markup/pages/admin/Employees';

// Import the css files 
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";

// Import the custom css file 
import "./assets/styles/custom.css";

// Import the Header component 
import Header from './markup/components/Header/Header';
// Import the Footer component
import Footer from './markup/components/Footer/Footer';

// Import the PrivateAuthRoute component 
import PrivateAuthRoute from './markup/components/Auth/PrivateAuthRoute';
import Services from './markup/pages/Services';
import AboutPage from './markup/pages/AboutPage';
import Contact from './markup/pages/Contact';
import AdminPage from './markup/pages/admin/AdminPage';
import AddNewCustomerPage from './markup/pages/admin/AddNewCustomer';
import EditCustomer from './markup/pages/admin/EditCustomer';
import EmployeeUpdatePage from './markup/pages/admin/EmployeeUpdatePage';
import AddVehiclePage from './markup/pages/admin/AddVehiclePage';
import Vehicle from './markup/components/Admin/Vehicles/Vehicle';
import ServiceListPage from './markup/pages/admin/ServiceListPage';
import OrdersTwo from './markup/pages/admin/OrderesTwo';
import OrdersThree from './markup/pages/admin/OrdersThree';
import OrdersFour from './markup/pages/admin/OrderFour';
import OrderDetail from './markup/components/OrderDetail/OrderDetail';
import TrackOrderPopup from './markup/components/TrackOrder/TrackOrder';
import FourO4 from './markup/pages/404';


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path='/service' element = {<Services />} />
        <Route path='/about' element = {<AboutPage />} />
        <Route path='/contact' element = {<Contact />} />
        <Route path='/trackorder' element = {<TrackOrderPopup />} />

        <Route path='/admin' element = {
          <PrivateAuthRoute roles = {[2,3]}>

            <AdminPage />
          </PrivateAuthRoute>
          } />
        <Route path='/admin/vehicle' element = {
          <PrivateAuthRoute>

            <Vehicle />
          </PrivateAuthRoute>
          } />

        <Route path='/admin/add-customer' element = {
          <PrivateAuthRoute roles = {[1,2,3]}>

            <AddNewCustomerPage />
          </PrivateAuthRoute>
          } />
        <Route path='/admin/customer/edit/:id' element = {
          <PrivateAuthRoute roles = {[1,2,3]}>

            <EditCustomer />
          </PrivateAuthRoute>
          } />
        <Route path='/admin/customers/:id' element = {
          <PrivateAuthRoute roles = {[1,2,3]}>

            <AddVehiclePage />
          </PrivateAuthRoute>
          } />

        <Route path='/admin/order' element = {
          <PrivateAuthRoute roles = {[1,2,3]}>

            <Orders />
          </PrivateAuthRoute>
          } />
        <Route path='/admin/orderstwo/:id' element = {
          <PrivateAuthRoute roles = {[1,2,3]}>

            <OrdersTwo />
          </PrivateAuthRoute>
          
          } />
        <Route path='/admin/ordersthree/:c_id/:v_id' element = {
          <PrivateAuthRoute roles = {[1,2,3]}>

            <OrdersThree/>
          </PrivateAuthRoute>
          
          } />
        <Route path='/admin/orders' element = {
          <PrivateAuthRoute roles = {[1,2,3]}>

            <OrdersFour />
          </PrivateAuthRoute>
          } />
        <Route path='/admin/order/:id' element = {

            <OrderDetail />
          
          } />



        <Route path="/admin/services"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <ServiceListPage />
             </PrivateAuthRoute>
          } />
        {/* // Add the Service List Route  */}
       
        {/* // Add the Customers Route  */}
        <Route path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Customers />
           </PrivateAuthRoute>
          } />
        {/* // Add the Employees Route  */}
        <Route path="/admin/employees" element={
          <PrivateAuthRoute roles = {[2,3]}>

            <Employees />
          </PrivateAuthRoute>
        }
           />
        <Route path="/admin/employee/edit/:id" element={
          <PrivateAuthRoute roles={[3]}>
            <EmployeeUpdatePage />
          </PrivateAuthRoute>
        } />
        <Route path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
             </PrivateAuthRoute>
          } />
        {/* 
          Customers (/admin/customers) - managers and admins
          Orders (/admin/orders) - Can be accessed by all employees
          Add employee (/admin/add-employee) - admins only 
            - Admin: 3 
            - Manager: 2 
            - Employee: 1 
        */}

        <Route path="*" element ={<FourO4/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
