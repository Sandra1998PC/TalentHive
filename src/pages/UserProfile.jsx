import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useOutletContext } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addUserData, getEmpData, getUserData, updateEmpDetails, updateUserDetails } from '../services/APIcalls';

function Userprofile() {
    const [isExist, setExist] = useState(false)
    const { data } = useOutletContext();
    console.log("data : ", data)
    const [isExistId, setExistId] = useState()
    const [userData, setUserData] = useState({
        userId: "",
        name: "",
        email: "",
        pnumber: "",
        dob: "",
        address: "",
        jobtitle: "",
        experience: "",
        highestQualification: "",
        skills: "",
        careerSummary: "",
        resume: "",
        resumeName: ""

    })
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        if (data) {
            setUserData(prev => ({
                ...prev,
                userId: data.id,
                name: data.firstname + " " + data.lastname,
                email: data.emailid
            }));
        }
    }, [data]);

    const isDataExist = async () => {
        setLoading(true)
        const result1 = await getUserData()
        console.log("result 1 :", result1)
        if (result1.status === 200) {
            const resData = result1.data.filter(item => item.userId === data.id);
            console.log("resData : ", resData)
            if (resData.length > 0 && resData[0]) {
                setUserData(resData[0]);
                console.log("Resume", userData.resume)
                setExistId(resData[0].id);
                setExist(true);
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        isDataExist()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value || "" });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            setUserData(prev => ({
                ...prev,
                resume: reader.result,
                resumeName: file.name
            }));
        };

        reader.readAsDataURL(file);
    };

    const storeData = async () => {
        const { userId, name, email, pnumber, dob, address, jobtitle, experience, highestQualification, skills, careerSummary, resume, resumeName } = userData
        console.log(userId, name, email, pnumber, dob, address, jobtitle, experience, highestQualification, skills, careerSummary, resume, resumeName)

        if (userId && name && email && pnumber && dob && address &&
            jobtitle && experience && highestQualification && skills && careerSummary && resume && resumeName) {

            if (!isExist) {
                setLoading(true)
                const result = await addUserData(userData)
                if (result.status == 201) {
                    Swal.fire({
                        title: "Data Updated successfully",
                        icon: "success"
                    });
                }
                else {
                    Swal.fire({
                        title: "Something went wrong!!!",
                        icon: "error"
                    });
                }
                setLoading(false)
                setUserData({
                    userId: data.id,
                    name: data.firstname + " " + data.lastname,
                    email: data.emailid,
                    pnumber: "",
                    dob: "",
                    address: "",
                    jobtitle: "",
                    experience: "",
                    highestQualification: "",
                    skills: "",
                    careerSummary: "",
                    resume: "",
                    resumeName: ""
                })
            }
            else {
                setLoading(true)
                const result2 = await updateUserDetails(userData, isExistId)
                console.log("result2 : ",result2)
                if (result2.status == 200) {
                    setUserData(result2.data)
                    Swal.fire({
                        title: "Data Updated successfully",
                        icon: "success"
                    });
                }
                else {
                    Swal.fire({
                        title: "Something went wrong!!!",
                        icon: "error"
                    });
                }
                setLoading(false)
            }
        }
        else {
            Swal.fire({
                title: "Please fill in all required fields!!!",
                icon: "error"
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        storeData()
    };
    return (
        <div className="container py-4">
             {loading ? (
                        <div className="overlayLoader">
                            <div className="d-flex justify-content-center mt-5">
                                <div className="spinner-border text-dark" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                    ) : (  
            <Card className="shadow border-0 rounded-4">
                <Card.Header
                    className="text-white py-3"
                    style={{ backgroundColor: "#491077" }}
                >
                    <h3 className="mb-0">Complete Your Profile</h3>
                </Card.Header>

                <Card.Body className="p-4">
                    <form onSubmit={handleSubmit}>

                        {/* Personal Details */}
                        <h5 className="mb-3">Personal Information</h5>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your full name"
                                        name="name"
                                        value={userData.name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Enter phone number"
                                        name="pnumber"
                                        value={userData.pnumber}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control type="date"
                                        name="dob"
                                        value={userData.dob}
                                        onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Enter your address"
                                name='address'
                                value={userData.address}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {/* Career Details */}
                        <h5 className="mt-4 mb-3">Career Information</h5>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Job Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g. Frontend Developer"
                                        name='jobtitle'
                                        value={userData.jobtitle}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Experience</Form.Label>

                                    <Form.Select
                                        name="experience"
                                        value={userData.experience}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Experience</option>
                                        <option value="">Fresher</option>
                                        <option value="1-2 Years">1-2 Years</option>
                                        <option value="3-5 Years">3-5 Years</option>
                                        <option value="5+ Years">5+ Years</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Highest Qualification</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="B.Tech, MBA, MCA..."
                                        name='highestQualification'
                                        value={userData.highestQualification}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Skills</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name='skills'
                                        placeholder="React, Java, SQL..."
                                        value={userData.skills}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Career Summary</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Write a short professional summary..."
                                name='careerSummary'
                                value={userData.careerSummary}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {/* Resume */}
                        <h5 className="mt-4 mb-3">Documents</h5>
                        {
                                userData?.resume && (
                                    <a
                                        href={userData.resume}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        'View Resume {userData.resumeName} '
                                    </a>
                                )
                            }
                        <Form.Group className="mb-4">
                            <Form.Label>Upload Resume</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} />

                        </Form.Group>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn"
                                style={{
                                    background: "#491077",
                                    border: "none",
                                    color: "white",
                                    minWidth: "200px"
                                }}
                            >
                                Save Profile
                            </button>
                        </div>

                    </form>
                </Card.Body>
            </Card>)}
        </div>
    )
}

export default Userprofile
