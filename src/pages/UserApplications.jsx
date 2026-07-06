import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { Card, Button, Row, Col } from "react-bootstrap";
import { getApplications } from '../services/APIcalls';

function UserApplications() {
    const { data } = useOutletContext();
    const [applData, setApplData] = useState([])
    const [Loading, setLoading] = useState(false)
    const getAllApplicationsData = async () => {
        setLoading(true)
        const result = await getApplications()
        console.log("user Appl : ", result)
        if (result.status == 200) {
            const resData = result.data.filter(item => item.applicantId == data.id)
            console.log("appl resData", resData)
            if (resData.length > 0) {
                setApplData(resData)
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        getAllApplicationsData()
        console.log("appl applData", applData)
    }, [])
    return (
        <div className='p-5'>
            {Loading ? (
                <div className="overlayLoader">
                    <div className="d-flex justify-content-center mt-5">
                        <div className="spinner-border text-dark" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            ) : (
                <Row className="g-4 text-center">
                    {applData.length > 0 ? (applData.map((job, index) => (
                        <Col lg={4} key={index}>
                            <Card className="shadow border-0">
                                <Card.Body>
                                    <h4>{job.jobTitle}</h4>

                                    <p className="text-secondary">
                                        {job.companyName}
                                    </p>

                                    <p>📍 {job.location}</p>

                                    <p>{job.salary}</p>

                                    <p>{job.ApplicationStatus == "applied" ? (<span className='text-primary'>Applied</span>)
                                        : job.ApplicationStatus == "Rejected" ? (<span className='text-danger'>Rejected</span>)
                                            : job.ApplicationStatus == "ShortListed" ? (<span className='text-success'>ShortListed</span>) : ""}</p>

                                    {/* <Button
                            style={{
                              background: "#491077",
                              border: "none",
                            }}
                          >
                            Apply Now
                          </Button> */}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))) : (<div className="text-center py-5">
                        <h5 className="text-muted">No Applications have been Submitted yet.</h5>
                    </div>)}
                </Row>)}
        </div>
    )
}

export default UserApplications
