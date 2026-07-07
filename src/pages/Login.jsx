import React, { useEffect, useState } from 'react'
import loginImg from '../assets/login.jpg'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { getAllRegData } from '../services/APIcalls';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [showModPassword, setShowModPassword] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modPassword, setModPassword] = useState("");
    const [allRegData, setAllRegData] = useState([])
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useState()
    const [loading, setLoading] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const setAllData = async () => {
        setLoading(true)
        const result = await getAllRegData()
        if (result.status == 200) {
            setAllRegData(result.data)
        }
        setLoading(false)
    }

    useEffect(() => {
        setAllData()
    }, [])

    const signIn = () => {
        const user = allRegData?.filter(
            (data) => data.emailid === email && data.password === password
        );

        if (user.length == 1) {
            Swal.fire({
                title: "Login successful!",
                icon: "success"
            });
            if (user[0].user == "user") {
                navigate('/user', { state: { data: user[0] } });
                localStorage.setItem("userData", JSON.stringify(user[0]));
            }
            else if (user[0].user == "admin") {
                navigate('/admin', { state: { data: user[0] } });
                localStorage.setItem("adminData", JSON.stringify(user[0]));
            }
        } else {
            Swal.fire({
                title: "Invalid User ID or Password",
                icon: "error"
            });
        }
    }

    // const updatePassword = () =>{
    //     if(userData){
    //         setUserData({...userData,password : modPassword})
    //         const result = updatePassword(userData,userData.id)
    //         console.log("updatePassword : ",result)
    //         handleClose()
    //     }
    // }

    return (
        <div>

            {loading ? (
                <div className="overlayLoader">
                    <div className="d-flex justify-content-center mt-5">
                        <div className="spinner-border text-dark" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            ) : (<div className="d-flex justify-content-center align-items-center">
                <div className='row w-75 bg-white mt-5 rounded-2 shadow regMain' style={{ height: '80vh' }}>
                    <div className='regImb'>
                        <img src={loginImg} alt="Register Image" style={{ height: '90%', width: '100%' }} />
                    </div>
                    <div className="p-5 ">
                        <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
                            <h4>Sign In</h4>
                            <span className='mt-2'>Welcome to TalentHive connect discover jobs build your future today</span>
                            {/* <div className="d-flex gap-3 mt-2">
                        <button className='btn btn-success'>Sign up with Google</button>
                        <button className='btn btn-dark'>Sign up with linkedin</button>
                    </div> */}
                            <div className="row mt-5">
                                <div className="col-12 my-4">
                                    <label htmlFor="">Enter your Email</label>
                                    <Form.Control type="email" placeholder="name@example.com" autoComplete="off" value={email}
                                        onChange={(e) => { setEmail(e.target.value) }} />
                                </div>
                                <div className="col-12">
                                    <label>Password</label>
                                    <div className="position-relative">
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password" autoComplete="new-password" value={password}
                                            onChange={(e) => { setPassword(e.target.value) }}
                                        />

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
                                <div className="col-12 my-5 d-flex justify-content-between align-items-center">
                                    {/* <Link className='text-decoration-none' style={{ color: '#491077' }} onClick={handleShow}>Forgot Password?</Link> */}
                                    <button className='btn w-100' style={{ backgroundColor: '#3d0e63', color: 'white' }} onClick={(signIn)}>Sign In</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body><div className="col-12">
                                    <label>Password</label>
                                    <div className="position-relative">
                                        <Form.Control
                                            type={showModPassword ? "text" : "password"}
                                            placeholder="Password" value={modPassword}
                                            onChange={(e) => {setModPassword(e.target.value) }}
                                        />

                                        <span
                                            onClick={() => setshowModPassword(!showModPassword)}
                                            style={{
                                                position: "absolute",
                                                right: "10px",
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                cursor: "pointer"
                                            }}
                                        >
                                            {showModPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                </div></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updatePassword}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </div>
    )
}

export default Login
