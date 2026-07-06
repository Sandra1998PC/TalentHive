import React from 'react'
import Header from '../components/Header'
import { useLocation } from 'react-router-dom';
import {useOutletContext } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import jobseeker from '../assets/jobseeker.png'

function Home() {
    const location = useLocation();
    const data = location.state?.data;

    return (
          <div>
               {/* Hero Section */}
              <section
                className="w-100"
                style={{ background: "#F8F6FC", minHeight: "75vh",width : "100%" }}
              >
                <div className='container-fluid px-5 pt-5'>
                  <Row className="align-items-center">
                    <Col lg={6}>
                      <h1 className="display-4 fw-bold text-dark">
                        Find Your <span style={{ color: "#491077" }}>Dream Job</span>
                      </h1>
        
                      <p className="text-secondary my-4 fs-5">
                        Connect with top employers and discover opportunities that
                        match your skills.
                      </p>
        
                      {/* <Row>
                        <Col md={5}>
                          <Form.Control
                            type="text"
                            placeholder="Job Title"
                          />
                        </Col>
        
                        <Col md={4}>
                          <Form.Control
                            type="text"
                            placeholder="Location"
                          />
                        </Col>
        
                        <Col md={3}>
                          <Button
                            style={{
                              background: "#491077",
                              border: "none",
                              width: "100%",
                            }}
                          >
                            Search
                          </Button>
                        </Col>
                      </Row> */}
                    </Col>
        
                    <Col lg={6} className="text-center p-5">
                      <img
                        src={jobseeker}
                        alt="Hero"
                        className="img-fluid"
                      />
                    </Col>
                  </Row>
                </div>
              </section>
        
              {/* Categories */}
              <Container className="py-5">
                <h2 className="text-center fw-bold mb-5">
                  Popular Categories
                </h2>
        
                <Row className="g-4">
                  {[
                    "IT & Software",
                    "Marketing",
                    "Finance",
                    "Healthcare",
                    "Engineering",
                    "Education",
                    "Design",
                    "Sales",
                  ].map((item) => (
                    <Col md={3} key={item}>
                      <Card className="shadow-sm border-0 text-center p-4">
                        <h5>{item}</h5>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Container>
        
              {/* Featured Jobs */}
              <Container className="py-5">
                <h2 className="text-center fw-bold mb-5">
                  Featured Jobs
                </h2>
        
                <Row className="g-4">
                  {[1, 2, 3].map((job) => (
                    <Col lg={4} key={job}>
                      <Card className="shadow border-0">
                        <Card.Body>
                          <h4>Frontend Developer</h4>
        
                          <p className="text-secondary">
                            ABC Technologies
                          </p>
        
                          <p>📍 Kochi</p>
        
                          <p>₹6-10 LPA</p>
        
                          <Button
                            style={{
                              background: "#491077",
                              border: "none",
                            }}
                          >
                            Apply Now
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Container>
        
              {/* Why Choose Us */}
              <section
                className="py-5"
                style={{ background: "#F8F6FC" }}
              >
                <Container>
                  <h2 className="text-center fw-bold mb-5">
                    Why Choose TalentHive?
                  </h2>
        
                  <Row className="g-4">
                    {[
                      "Thousands of Jobs",
                      "Verified Companies",
                      "Easy Applications",
                      "Career Growth",
                    ].map((item) => (
                      <Col md={3} key={item}>
                        <Card className="border-0 shadow-sm text-center p-4">
                          <h5>{item}</h5>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Container>
              </section>
        
              {/* Statistics */}
              <Container className="py-5">
                <Row className="text-center">
                  <Col md={3}>
                    <h1 style={{ color: "#491077" }}>20K+</h1>
                    <p>Jobs</p>
                  </Col>
        
                  <Col md={3}>
                    <h1 style={{ color: "#491077" }}>15K+</h1>
                    <p>Candidates</p>
                  </Col>
        
                  <Col md={3}>
                    <h1 style={{ color: "#491077" }}>1200+</h1>
                    <p>Companies</p>
                  </Col>
        
                  <Col md={3}>
                    <h1 style={{ color: "#491077" }}>35K+</h1>
                    <p>Applications</p>
                  </Col>
                </Row>
              </Container>
        
              {/* CTA */}
              <section
                className="py-5 text-center text-white"
                style={{ background: "#491077" }}
              >
                <Container>
                  <h2>Ready to Start Your Career?</h2>
        
                  <p className="my-4">
                    Join thousands of professionals finding their dream jobs.
                  </p>
        
                  <Button variant="outline-light" className="me-3">
                    Find Jobs
                  </Button>
        
                  {/* <Button variant="outline-light">
                    Post a Job
                  </Button> */}
                </Container>
              </section>
            </div>
    )
}

export default Home
