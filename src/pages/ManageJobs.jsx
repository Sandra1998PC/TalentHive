import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { Card, Row, Col, Badge, Button, Modal } from "react-bootstrap";
import { deleteJob, getJobs } from '../services/APIcalls';
import Swal from 'sweetalert2';
import UpdateJob from '../components/UpdateJob';

function ManageJobs() {
  const { data } = useOutletContext();
  const [dspData, setDspData] = useState([])
  const [loading, setLoading] = useState(false)
  const [jobId,setJobId] = useState()
  const [show, setShow] = useState(false);
  const [updateData,setUpdateData] = useState([])

  const getAllJobs = async () => {
    setLoading(true)
    const result = await getJobs()
    console.log("Manage Jobs : ", result)
    const resData = result.data.filter(item => item.EmpId == data.id)
    if (resData.length > 0) {
      setDspData(resData)
      console.log("dspData", dspData)
    }
    else{
      setDspData([])
    }
    setLoading(false)
  }

  useEffect(() => {
    getAllJobs()
    console.log(data.id)
  }, [])

  const deleteOneJob = async (id) => {
    setLoading(true)
    const result1 = await deleteJob(id)
    console.log(result1)
    if (result1.status == 200) {
      Swal.fire({
        title: "Data Deleted successfully",
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
    getAllJobs()
  }

  const handleClose = () => {
    setShow(false)
    setJobId()
  };

  const handleShow = (id) => {
    setJobId(id)
    setShow(true)
    const upData = dspData.filter(item => item.id == jobId)
    setUpdateData(upData)
  };

  return (
    <div className='p-5'>
      {loading ? (
        <div className="overlayLoader">
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      ) :
        (<Row className="align-items-center">
          {
            dspData.length > 0 ?
              (dspData.map((job, index) => (
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

                      {/* <div className="mb-3">
            <h6 className="text-secondary">Required Skills</h6>

            {job.skills
              .split(",")
              .map((skill, index) => (
                <Badge
                  key={index}
                  bg="light"
                  text="dark"
                  className="me-2 mb-2 p-2"
                >
                  {skill.trim()}
                </Badge>
              ))}
          </div>

          <div className="mb-4">
            <h6 className="text-secondary">Job Description</h6>
            <p className="text-muted" style={{ lineHeight: "28px" }}>
              {job.description}
            </p>
          </div>

          <Row className="mb-3">
            <Col md={6}>
              <small className="text-muted">
                <strong>Posted:</strong> {job.postedDate}
              </small>
            </Col>

            <Col md={6} className="text-md-end">
              <small className="text-muted">
                <strong>Status:</strong> {job.status}
              </small>
            </Col>
          </Row> */}

                      <div className="d-flex justify-content-center gap-3">
                        <Button variant='danger'
                          style={{
                            // backgroundColor: "#491077",
                            border: "none",
                            padding: "10px 35px",
                          }}
                          onClick={() => deleteOneJob(job.id)}>
                          Delete
                        </Button>

                      {/* <Button variant='success'
                          style={{
                            // backgroundColor: "#491077",
                            border: "none",
                            padding: "10px 35px",
                          }}
                          onClick={() => handleShow(job.id)}>
                          Update
                        </Button> */}
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
      {/* <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Body><UpdateJob data={updateData} userId={data.id} /></Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  )
}

export default ManageJobs
