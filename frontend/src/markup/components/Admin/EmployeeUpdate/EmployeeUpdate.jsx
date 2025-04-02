import React, { useState } from 'react';
// import employee.service.js 
// Import the useAuth hook 
import { useAuth } from "../../../../Contexts/AuthContext";
import employeeService from '../../../../services/employee.service';

function EmployeeUpdate({id}) {
  const [employee_first_name, setFirstName] = useState('');
  const [employee_last_name, setLastName] = useState('');
  const [employee_phone_number, setPhoneNumber] = useState('');
  const [active_employee_status, setActiveemployeeStatus] = useState(1);
  const [company_role_id, setCompany_role_id] = useState(1);

  // Errors 
  const [firstNameRequired, setFirstNameRequired] = useState('');

  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');

  // Create a variable to hold the user's token
  let loggedInEmployeeToken = '';
  // Destructure the auth hook and get the token 
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  const handleSubmit = (e) => {
    // Prevent the default behavior of the form
    e.preventDefault();
    // Handle client side validations  
    let valid = true; // Flag 
    // First name is required 
    if (!employee_first_name) {
      setFirstNameRequired('First name is required');
      valid = false;
    } else {
      setFirstNameRequired('');
    }
    // Email is required
    if (!employee_email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!employee_email.includes('@')) {
      setEmailError('Invalid email format');
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(employee_email)) {
        setEmailError('Invalid email format');
        valid = false;
      } else {
        setEmailError('');
      }
    }

    // If the form is not valid, do not submit 
    if (!valid) {
      return;
    }
    const formData = {
      employee_first_name,
      employee_last_name,
      employee_phone_number,
        company_role_id,
      active_employee_status
  
    };
    // Pass the form data to the service 
    const newemployee = employeeService.Updateemployee(formData, loggedInEmployeeToken,id);
    newemployee.then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // If Error is returned from the API server, set the error message
        if (data.error) {
          setServerError(data.error)
        } else {
          // Handle successful response 
          setSuccess(true);
          setServerError('')
          // Redirect to the employees page after 2 seconds 
          // For now, just redirect to the home page 
          setTimeout(() => {
            // window.location.href = '/admin/employees';
            window.location.href = '/';
          }, 2000);
        }
      })
      // Handle Catch 
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setServerError(resMessage);
      });
  }


  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Edit: employee Name</h2>
            <h4 style={{fontWeight: 'bold'}}>employee email: employee@email.com</h4>
        </div>
        <div>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">

                      {serverError && <div className="validation-error" role="alert">{serverError}</div>}
                        {success && <div className="success-message" role="alert">C{serverError && <div className="validation-error" role="alert">{serverError}</div>}ustomer added successfully</div>}
                     
                    </div>
                    <div className="form-group col-md-12">
                      <input type="text" name="employee_first_name" value={employee_first_name} onChange={event => setFirstName(event.target.value)} placeholder="employee first name" />
                      {firstNameRequired && <div className="validation-error" role="alert">{firstNameRequired}</div>}
                    </div>

                    <div className="form-group col-md-12">
                      <input type="text" name="employee_last_name" value={employee_last_name} onChange={event => setLastName(event.target.value)} placeholder="employee last name" required />
                    </div>

                    <div className="form-group col-md-12">
                      <input type="text" name="employee_phone_number" value={employee_phone_number} onChange={event => setPhoneNumber(event.target.value)} placeholder="employee phone (555-555-5555)" required />
                    </div>

                    <div className="form-group col-md-12">
                      <select name="employee_role" value={company_role_id} onChange={event => setCompany_role_id(event.target.value)} className="custom-select-box">
                        <option value="1">Employee</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </select>
                    </div>

                    <div className="form-group col-md-12">
                {/* is active ustome check box */}
                <label className="checkbox ">
                  <input type="checkbox" name="active_employee_status" value={active_employee_status}  onChange={event => setActiveemployeeStatus(event.target.value)}/>
                    <span className='p-2'>Is Active employee  </span>
                </label>
                {/* end of is active employee check box */}
                  </div>

                    <div className="form-group col-md-12">
                      <button className="theme-btn btn-style-one" type="submit" data-loading-text="Please wait..."><span>Update</span></button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default EmployeeUpdate;