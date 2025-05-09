import React from "react";
// Import the auth hook 
import { useAuth } from "../../../Contexts/AuthContext";
// Import the login form component 
import LoginForm from '../../components/LoginForm/LoginForm';
// Import the admin menu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import EmployeeUpdate from "../../components/Admin/EmployeeUpdate/EmployeeUpdate";
import { useParams } from "react-router";
// Import the EmployeesList component 
function EmployeeUpdatePage() {
  // Destructure the auth hook 
  useParams();
  const {id} = useParams();
  const { isLogged, isAdmin } = useAuth();

  if (isLogged) {

    console.log("Kebede");

    if (true) {
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                <EmployeeUpdate id = {id} />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>You are not authorized to access this page</h1>
        </div>
      );
    }
  } else {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }

}

export default EmployeeUpdatePage; 