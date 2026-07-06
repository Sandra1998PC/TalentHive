import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { Card, Button, Row, Col } from "react-bootstrap";
import { getApplications, updateapplications } from '../services/APIcalls';
import Modal from 'react-bootstrap/Modal';
import ReviewApplication from '../components/ReviewApplication';
import Swal from 'sweetalert2';


function Applications() {
  const { data } = useOutletContext();
  const [applData, setApplData] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingMod, setLoadingMod] = useState(false)
  const [show, setShow] = useState(false);
  const [jobId, setJobId] = useState()
  const [applStatus, setApplStatus] = useState("")
  const getAllApplicationsData = async () => {
    setLoading(true)
    const result = await getApplications()
    console.log("user Appl : ", result)
    if (result.status == 200) {
      const resData = result.data.filter(item => item.EmpId == data.id)
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

  const handleClose = () => {
    setShow(false)
    setJobId()
  };

  const handleShow = (id) => {
    setJobId(id)
    setShow(true)
  };

  const update = async () => {
    const updateData = applData.filter(item => item.id == jobId)
    updateData[0].ApplicationStatus = applStatus
    console.log("updateData",updateData)
    if (applStatus != "") {
      setLoadingMod(true)
      const result1 = await updateapplications(applData[0], jobId)
      if (result1.status == 200) {
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
      setLoadingMod(false)
      getAllApplicationsData()
      handleClose()
    }
    else{
      Swal.fire({
          title: "Please Select Valid Status!!!",
          icon: "error"
        });
    }
  }

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
      ) : (<Row className="g-4 text-center">
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

                <p>{job.ApplicationStatus == "applied" ? ( <span className='text-primary'>Applied</span>) 
                : job.ApplicationStatus == "Rejected" ? (<span className='text-danger'>Rejected</span>) 
                : job.ApplicationStatus == "ShortListed" ? ( <span className='text-success'>ShortListed</span>) : "" }</p>

                <Button
                  style={{
                    background: "#491077",
                    border: "none",
                  }}
                  onClick={() => handleShow(job.id)}
                >
                  Review
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))) : (<div className="text-center py-5">
          <h5 className="text-muted">No Applications have been Submitted yet.</h5>
        </div>)}
      </Row>
      
     )}
    {loadingMod ? (
        <div className="overlayLoader">
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Body><ReviewApplication data={applData[0]} userId={data.id} /></Modal.Body>
        <Modal.Footer>
          <div className='d-flex justify-content-center align-items-center gap-3'>
            <select name="status" id="status" className='form-control' value={applStatus} onChange={(e) => { setApplStatus(e.target.value) }}>
              <option value="">-- Select Course --</option>
              <option value="Rejected">Rejected</option>
              <option value="ShortListed">ShortListed</option>
            </select>
            <Button
              style={{
                background: "#491077",
                border: "none",
              }}
              onClick={update}
            >
              Update
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal> )}
      
    </div>
  )
}

export default Applications
