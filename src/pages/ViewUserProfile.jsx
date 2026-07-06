import React, { useEffect, useState } from "react";
import { Card, Row, Col, Badge, Button } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { getUserData } from "../services/APIcalls";

function ViewUserProfile() {
    const { data } = useOutletContext();
    const [loading,setLoading] = useState(false)


    const [user, setUser] = useState({
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
    });

    const getProfile = async () => {
        setLoading(true)
        const result = await getUserData();

        if (result.status === 200) {
            const resData = result.data.filter(
                (item) => item.userId === data.id
            );

            if (resData.length > 0) {
                setUser(resData[0]);
            }
        }
        else {
            if (data) {
                setUser(prev => ({
                    ...prev,
                    userId: data.id,
                    name: data.firstname + " " + data.lastname,
                    email: data.emailid
                }));
            }
        }
        setLoading(false)
    };

    useEffect(() => {
        getProfile();
    }, []);

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

                {/* Header */}
                <Card.Header
                    className="text-white py-4"
                    style={{ backgroundColor: "#491077" }}
                >
                    <Row className="align-items-center">
                        <Col md={2} className="text-center">
                            <div
                                style={{
                                    width: "90px",
                                    height: "90px",
                                    borderRadius: "50%",
                                    backgroundColor: "#fff",
                                    color: "#491077",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: "35px",
                                    fontWeight: "bold",
                                    margin: "auto",
                                }}
                            >
                                {user.name?.charAt(0)}
                            </div>
                        </Col>

                        <Col md={10}>
                            <h2 className="fw-bold mb-1">{user.name}</h2>
                            <h5>{user.jobtitle}</h5>
                            <Badge bg="light" text="dark" className="px-3 py-2">
                                {user.experience}
                            </Badge>
                        </Col>
                    </Row>
                </Card.Header>

                {/* Body */}
                <Card.Body className="p-4">

                    <Row className="mb-3">
                        <Col md={6}>
                            <h6 className="text-secondary">User ID</h6>
                            <p>
                                {user.userId < 10
                                    ? "USR00" + user.userId
                                    : user.userId < 100
                                        ? "USR0" + user.userId
                                        : "USR" + user.userId}
                            </p>
                        </Col>

                        <Col md={6}>
                            <h6 className="text-secondary">Full Name</h6>
                            <p>{user.name}</p>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <h6 className="text-secondary">Email</h6>
                            <p>{user.email}</p>
                        </Col>

                        <Col md={6}>
                            <h6 className="text-secondary">Phone Number</h6>
                            <p>{user.pnumber}</p>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <h6 className="text-secondary">Date of Birth</h6>
                            <p>{user.dob}</p>
                        </Col>

                        <Col md={6}>
                            <h6 className="text-secondary">Address</h6>
                            <p>{user.address}</p>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <h6 className="text-secondary">Current Job Title</h6>
                            <p>{user.jobtitle}</p>
                        </Col>

                        <Col md={6}>
                            <h6 className="text-secondary">Experience</h6>
                            <p>{user.experience}</p>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <h6 className="text-secondary">Highest Qualification</h6>
                            <p>{user.highestQualification}</p>
                        </Col>

                        <Col md={6}>
                            <h6 className="text-secondary">Skills</h6>
                            <p>{user.skills}</p>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <h6 className="text-secondary">Career Summary</h6>
                            <p
                                className="text-muted"
                                style={{ lineHeight: "28px" }}
                            >
                                {user.careerSummary}
                            </p>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <h6 className="text-secondary">Resume</h6>

                            {user.resume ? (
                                <Button
                                    href={user.resume}
                                    target="_blank"
                                    variant="outline-primary"
                                >
                                    View Resume
                                </Button>
                            ) : (
                                <p className="text-muted">No Resume Uploaded</p>
                            )}
                        </Col>
                    </Row>

                </Card.Body>
            </Card>)}
        </div>
    );
}

export default ViewUserProfile
