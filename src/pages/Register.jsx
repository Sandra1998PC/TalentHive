import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import registerImg from '../assets/register.jpg'
import { addRegData } from '../services/APIcalls';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Register() {
  const [registrationDetails, setRegistrationDetails] = useState({
    "firstname": "", "lastname": "", "emailid": "",
    "password": "", "user": "user", "admincode": ""
  })
  const [confirmPassword, setConfirmPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [showAdminCode, setShowAdminCode] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const storeRegData = async () => {
    const { firstname, lastname, emailid, password, user, admincode } = registrationDetails
    // if (user == "admin" && !admincode) {
    //   Swal.fire({
    //     title: "Please fill in all required fields",
    //     icon: "error"
    //   });
    //   return
    // }
    if (registrationDetails.password != confirmPassword) {
      Swal.fire({
        title: "Password mismatch. Please re-enter to confirm.",
        icon: "error"
      });
      return
    }
    if (firstname && lastname && emailid && password && user) {
      setLoading(true)
      const result = await addRegData(registrationDetails)
      if (result.status == 201) {
        Swal.fire({
          title: "Registration completed successfully",
          icon: "success"
        });
        navigate('/login')
      }
      else {
        Swal.fire({
          title: "Something went wrong!!!",
          icon: "error"
        });
      }
      setLoading(false)
      setRegistrationDetails({
        "firstname": "", "lastname": "", "emailid": "",
        "password": "", "user": "user", "admincode": ""
      })
      setConfirmPassword("")
    }
    else {
      Swal.fire({
        title: "Please fill in all required fields!!!",
        icon: "error"
      });
    }
  }

  return (
    <div className='register'>
      {loading ? (
        <div className="overlayLoader">
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <div className='row w-75 bg-white mt-5 rounded-2 shadow regMain' style={{ height: '85vh' }}>
            <div className='regImb'>
              <img src={registerImg} alt="Register Image" style={{ height: '95%', width: '100%' }} />
            </div>
            <div className="p-5 ">
              <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
                <h4>Create Account</h4>
                <span className='mt-2'>Find your next Opportunity</span>
                {/* <div className="d-flex gap-3 mt-2">
                        <button className='btn btn-success'>Sign up with Google</button>
                        <button className='btn btn-dark'>Sign up with linkedin</button>
                    </div> */}
                <div className="row mt-5">
                  <div className="col-md-6 col-12">
                    <label htmlFor="">First Name</label>
                    <Form.Control type="text" placeholder="Enter First Name" value={registrationDetails.firstname}
                      onChange={(e) => setRegistrationDetails({ ...registrationDetails, firstname: e.target.value })} />
                  </div>
                  <div className="col-md-6 col-12">
                    <label htmlFor="">Last Name</label>
                    <Form.Control type="text" placeholder="Enter Last Name" value={registrationDetails.lastname}
                      onChange={(e) => setRegistrationDetails({ ...registrationDetails, lastname: e.target.value })} />
                  </div>
                  <div className="col-12 my-4">
                    <label htmlFor="">Enter your Email</label>
                    <Form.Control type="email" placeholder="name@example.com" autoComplete="off" value={registrationDetails.emailid}
                      onChange={(e) => setRegistrationDetails({ ...registrationDetails, emailid: e.target.value })} />
                  </div>
                  <div className="col-md-6 col-12">
                    <label htmlFor="">Password</label>
                    <div className="position-relative">
                      <Form.Control type={showPassword ? "text" : "password"} placeholder="Password"
                        autoComplete="new-password" value={registrationDetails.password}
                        onChange={(e) => setRegistrationDetails({ ...registrationDetails, password: e.target.value })} />

                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer"
                        }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <label htmlFor="">Confirm Password</label>
                    <div className="position-relative">
                      <Form.Control type={showConPassword ? "text" : "password"} placeholder="Password"
                        autoComplete="new-password" value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                      <span
                        onClick={() => setShowConPassword(!showConPassword)}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer"
                        }}
                      >
                        {showConPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mt-4">
                    <label htmlFor="">Select user type</label>
                    <Form.Select aria-label="Default select example" value={registrationDetails.user}
                      onChange={(e) => setRegistrationDetails({ ...registrationDetails, user: e.target.value })}>
                      <option value="user">Job Seeker</option>
                      <option value="admin">Employer</option>
                    </Form.Select>
                  </div>
                  {/* <div className="col-md-6 col-12 mt-4">
                  {registrationDetails.user === "admin" && (
                    <div>
                      <label>Admin Code</label>
                      <div className="position-relative">
                        <Form.Control type={showAdminCode ? "text" : "password"} placeholder="Enter Admin Code"
                          value={registrationDetails.admincode}
                          onChange={(e) => setRegistrationDetails({ ...registrationDetails, admincode: e.target.value })} />
                        <span
                          onClick={() => setShowAdminCode(!showAdminCode)}
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer"
                          }}
                        >
                          {showAdminCode ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                  )}
                </div> */}
                  <div className="col-12 my-4">
                    <button className='btn w-100' style={{ backgroundColor: '#3d0e63', color: 'white' }}
                      onClick={storeRegData}>Sign Up</button>
                  </div>
                </div>
                <p className='text-center'>Already have an account ?
                  <Link className='text-decoration-none fw-bold' to={'/login'} style={{ color: '#491077' }}> Log In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>)}
    </div>
  )
}

export default Register
