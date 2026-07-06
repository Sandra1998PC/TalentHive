import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav } from "react-bootstrap";
import { Link, useOutletContext } from "react-router-dom";
import { getApplications, getJobs } from "../services/APIcalls";

function AdminHome() {
  const { data } = useOutletContext();
  const [dspData, setDspData] = useState([])
  const [loading, setLoading] = useState(false)
  const [applData, setApplData] = useState([])
  const [actJobs, setActJobs] = useState(0)
  const [applReceived, setapplReceived] = useState(0)
  const [shortlisted, setShortlisted] = useState(0)

  const getAllJobs = async () => {
    setLoading(true)
    const result = await getJobs()
    console.log("Manage Jobs : ", result)
    const resData = result.data.filter(item => item.EmpId == data.id)
    if (resData.length > 0) {
      setDspData(resData)
      console.log("dspData", dspData)
    }
    else {
      setDspData([])
    }
    setLoading(false)
    setActJobs(resData.length)
  }

  useEffect(() => {
    getAllJobs()
    console.log("1", dspData)
  }, [])

  const getAllApplicationsData = async () => {
    setLoading(true)
    const result = await getApplications()
    console.log("user Appl : ", result)
    if (result.status == 200) {
      const resData = result.data.filter(item => item.EmpId == data.id)
      console.log("appl resData", resData)
      if (resData.length > 0) {
        setApplData(resData)
        setapplReceived(resData.length)
        const shCan = resData.filter(item => item.ApplicationStatus === "ShortListed")
        console.log("shCan",shCan)
        setShortlisted(shCan.length)
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    getAllApplicationsData()
    console.log("home applData", applData)
  }, [])


  return (
    <>
      {loading ? (
        <div className="overlayLoader">
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <div>

          {/* Hero Section */}
          <div style={{ background: "#F8F6FC", padding: "80px 0" }}>
            <Container>
              <Row className="align-items-center">
                <Col md={6}>
                  <h1 className="fw-bold">
                    Hire the <span style={{ color: "#491077" }}>Best Talent</span> Faster
                  </h1>
                  <p className="text-muted mt-3">
                    Post jobs, manage applicants, and find the right candidates easily with TalentHive.
                  </p>

                  <Button
                    as={Link}
                    to="/employer/post-job"
                    style={{ background: "#491077", border: "none" }}
                    className="mt-3"
                  >
                    Post a Job
                  </Button>
                </Col>

                {/* <Col md={6} className="text-center">
                <img
                  src="https://illustrations.popsy.co/gray/recruitment.svg"
                  alt="Hiring"
                  style={{ width: "90%" }}
                />
              </Col> */}
              </Row>
            </Container>
          </div>

          {/* Quick Stats */}
          <Container className="my-5">
            <Row className="g-4">
              <Col md={4}>
                <Card className="shadow-sm text-center p-3">
                  <h2 className="fw-bold" style={{ color: "#491077" }}>{actJobs}</h2>
                  <p>Active Job Posts</p>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="shadow-sm text-center p-3">
                  <h2 className="fw-bold" style={{ color: "#491077" }}>{applReceived}</h2>
                  <p>Applications Received</p>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="shadow-sm text-center p-3">
                  <h2 className="fw-bold" style={{ color: "#491077" }}>{shortlisted}</h2>
                  <p>Shortlisted Candidates</p>
                </Card>
              </Col>
            </Row>
          </Container>

          {/* Quick Actions */}
          <Container className="mb-5">
            <Row className="g-4">
              <Col md={4}>
                <Card className="p-4 shadow-sm">
                  <h5>Post a New Job</h5>
                  <p className="text-muted">Create job listings in minutes.</p>
                  <Button as={Link} to="/admin/postajob" style={{
                    background: "#491077",
                    border: "none",
                    width: "100%",
                  }}>
                    Get Started
                  </Button>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="p-4 shadow-sm">
                  <h5>View Applicants</h5>
                  <p className="text-muted">Track and manage applications.</p>
                  <Button as={Link} to="/admin/applications" style={{
                    background: "#491077",
                    border: "none",
                    width: "100%",
                  }}>
                    View
                  </Button>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="p-4 shadow-sm">
                  <h5>Manage Jobs</h5>
                  <p className="text-muted">Edit or remove job posts anytime.</p>
                  <Button as={Link} to="/admin/managejobs" style={{
                    background: "#491077",
                    border: "none",
                    width: "100%",
                  }}>
                    Manage
                  </Button>
                </Card>
              </Col>
            </Row>
          </Container>

        </div>)}
    </>
  )
}

export default AdminHome
