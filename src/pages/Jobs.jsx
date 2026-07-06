import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { getJobs } from '../services/APIcalls';
import { Button, Card, Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import JobApplication from '../components/JobApplication';

function Jobs() {
    const { data } = useOutletContext();
    const [dspData, setDspData] = useState([])
    const [show, setShow] = useState(false);
    const [applydata, setApplydata] = useState([])
    const [loading,setLoading] = useState(false)

    const handleClose = () => setShow(false);

    const getAllJobs = async () => {
        setLoading(true)
        const result = await getJobs()
        console.log("Manage Jobs : ", result)
        if (result.status == 200) {
            const resData = result.data
            if (resData.length > 0) {
                setDspData(resData)
                console.log("dspData", dspData)
            }
        }
        setLoading(false)
    }

    const handleShow = (id) => {
        if (dspData.length > 0) {
            setShow(true)
            const applData = dspData.filter(item => item.id == id)
            setApplydata(applData)
        }
    };

    useEffect(() => {
        getAllJobs()
        console.log(data.id)
    }, [])

    return (
        <div>
            <div className='p-5'>
                {loading ? (
                        <div className="overlayLoader">
                            <div className="d-flex justify-content-center mt-5">
                                <div className="spinner-border text-dark" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                    ) : (  
                <Row className="align-items-center">
                    {
                        dspData.length > 0 ? (dspData.map((job, index) => (
                            <Col lg={6} key={index}>
                                <Card className="shadow border-0 rounded-4 mb-4 w-100">
                                    <Card.Body className="p-4">

                                        {/* Header */}
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div>
                                                <h3 className="fw-bold mb-1">{job.jobTitle}</h3>
                                                <h5 className="text-muted">{job.companyName}</h5>
                                            </div>

                                            {/* <Badge
                  bg={job.status === "Open" ? "success" : "secondary"}
                  className="fs-6 px-3 py-2"
                >
                  {job.status}
                </Badge> */}
                                        </div>

                                        <Row className="mb-3">
                                            <Col md={6}>
                                                <h6 className="text-secondary">Location</h6>
                                                <p>{job.location}</p>
                                            </Col>

                                            <Col md={6}>
                                                <h6 className="text-secondary">Employment Type</h6>
                                                <p>{job.employmentType}</p>
                                            </Col>
                                        </Row>

                                        <Row className="mb-3">
                                            <Col md={6}>
                                                <h6 className="text-secondary">Experience</h6>
                                                <p>{job.experience}</p>
                                            </Col>

                                            <Col md={6}>
                                                <h6 className="text-secondary">Salary</h6>
                                                <p>{job.salary}</p>
                                            </Col>
                                        </Row>

                                        <Row className="mb-3">
                                            <Col md={6}>
                                                <h6 className="text-secondary">Vacancies</h6>
                                                <p>{job.vacancies}</p>
                                            </Col>

                                            <Col md={6}>
                                                <h6 className="text-secondary">Application Deadline</h6>
                                                <p>{job.deadline}</p>
                                            </Col>
                                        </Row>



                                        <div className="text-center">
                                            <Button
                                                style={{
                                                    backgroundColor: "#491077",
                                                    border: "none",
                                                    padding: "10px 35px",
                                                }}
                                                onClick={() => handleShow(job.id)}>
                                                Apply
                                            </Button>
                                        </div>

                                    </Card.Body>
                                </Card>
                            </Col>
                        ))) : (<div className="text-center py-5">
                            <h5 className="text-muted">No jobs have been posted yet.</h5>
                            <p className="text-secondary">
                                Once employers post job openings, they will appear here.
                            </p>
                        </div>)
                    }

                </Row>)}
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body><JobApplication data={applydata[0]} userId={data.id}/></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Jobs
