import React, { useEffect, useState } from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { getEmpData } from "../services/APIcalls";

function ViewEmployer() {
    const [isExist, setExist] = useState(false)
      const { data } = useOutletContext();
      const [isExistId, setExistId] = useState()
    console.log("View Employer : ", data)
    const [employer, setEmployer] = useState({
        empId: "",
        name: "",
        designation: "",
        companyName: "",
        email: "",
        phone: "",
        address: "",
        industry: "",
        description: ""
    })
    const [loading,setLoading] = useState(false)

    const isDataExist = async () => {
        setLoading(true)
        const result1 = await getEmpData()
        if (result1.status === 200) {
            const resData = result1.data.filter(item => item.empId === data.id);

            if (resData.length > 0 && resData[0]) {
                setEmployer(resData[0]);
                setExistId(resData[0].id);
                console.log("id : ",resData[0].id)
                setExist(true);
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        isDataExist()
    }, [])

    return (
        <div className="container py-4">
             {
             loading ? (
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
                                {employer.companyName.charAt(0)}
                            </div>
                        </Col>

                        <Col md={10}>
                            <h2 className="fw-bold mb-1">{employer.name}</h2>
                            <h5>{employer.designation}</h5>
                            <h6>{employer.companyName}</h6>
                        </Col>
                    </Row>
                </Card.Header>

                {/* Body */}
                <Card.Body className="p-4">

                    <Row className="mb-3">
                        <Col md={6}>
                            <h6 className="text-secondary">Employer ID</h6>
                            <p>{employer.empId < 10 ? 'EMP00'+employer.empId : employer.empId < 100 ? 'EMP0'+employer.empId : 'EMP'+employer.empId}</p>
                        </Col>

                        <Col md={6}>
                            <h6 className="text-secondary">Employer Name</h6>
                            <p>{employer.name}</p>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <h6 className="text-secondary">Email</h6>
                            <p>{employer.email}</p>
                        </Col>

                        <Col md={6}>
                            <h6 className="text-secondary">Phone</h6>
                            <p>{employer.phone}</p>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <h6 className="text-secondary">Industry</h6>
                            <p className="fs-6">
                                {employer.industry}
                            </p>
                        </Col>

                        <Col md={6}>
                            <h6 className="text-secondary">Address</h6>
                            <p>{employer.address}</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <h6 className="text-secondary">Company Description</h6>
                            <p className="text-muted" style={{ lineHeight: "28px" }}>
                                {employer.description}
                            </p>
                        </Col>
                    </Row>

                </Card.Body>
            </Card>)}
        </div>
    );
}

export default ViewEmployer;