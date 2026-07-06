import { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { submitApplication } from "../services/APIcalls";

function JobApplication({ data, userId }) {
    const [loading, setLoading] = useState(false)
    const [application, setApplication] = useState({
        "EmpId": "",
        "jobId": "",
        "applicantId": "",
        "jobTitle": "",
        "companyName": "",
        "salary": "",
        "location": "",
        "name": "",
        "email": "",
        "phoneNumber": "",
        "coverLetter": "",
        "ApplicationStatus": "applied"
    })

    useEffect(() => {
        setApplication({
            ...application, "EmpId": data.EmpId,
            "jobId": data.id,
            "applicantId": userId,
            "jobTitle": data.jobTitle,
            "companyName": data.companyName,
            "location": data.location,
            "salary" : data.salary
        })
        console.log("Application Data", data)
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;

        setApplication({
            ...application,
            [name]: value,
        });
        console.log("application", application)
    };

    const submitApplicationData = async () => {
        if (application.name && application.email && application.phoneNumber) {
            setLoading(true)
            const result = await submitApplication(application)
            
            if (result.status == 201) {
                Swal.fire({
                    title: "Application Submitted successfully",
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
        else {
            Swal.fire({
                title: "Please fill in all required fields!!!",
                icon: "error"
            });
        }
        setApplication({
            "EmpId": "",
            "jobId": "",
            "applicantId": "",
            "jobTitle": "",
            "companyName": "",
            "name": "",
            "email": "",
            "phoneNumber": "",
            "coverLetter": "",
            "ApplicationStatus": "applied"
        })
        setApplication({
            ...application, "EmpId": data.EmpId,
            "jobId": data.id,
            "applicantId": userId,
            "jobTitle": data.jobTitle,
            "companyName": data.location,
        })
    }
    const submit = (e) => {
        e.preventDefault()
        submitApplicationData()
    }
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
                    )  : (<Card className="shadow rounded-4 border-0">
                <Card.Header
                    className="text-white text-center py-3"
                    style={{ backgroundColor: "#491077" }}
                >
                    <h4>Apply for Job</h4>
                </Card.Header>

                <Card.Body>
                    <Form onSubmit={submit}>

                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your full name"
                                name="name"
                                value={application.name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={application.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter your phone number"
                                name="phoneNumber"
                                value={application.phoneNumber}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Cover Letter (Optional)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Briefly explain why you're a good fit for this role..."
                                name="coverLetter"
                                value={application.coverLetter}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {/* 
                        <Form.Group className="mb-4">
                            <Form.Label>Upload Resume</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group> */}

                        <div className="text-center">
                            <Button
                                type="submit"
                                style={{
                                    backgroundColor: "#491077",
                                    border: "none",
                                    padding: "10px 35px",
                                }}
                            >
                                Submit Application
                            </Button>
                        </div>
                               
                    </Form>
                </Card.Body>
            </Card>)}
            
        </div>
    );
}

export default JobApplication;