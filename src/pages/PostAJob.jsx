import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { addJob } from '../services/APIcalls';
import Swal from 'sweetalert2';

function PostAJob() {
  const { data } = useOutletContext();
  const today = new Date().toISOString().split("T")[0];
  const [loading, setLoading] = useState(false)
  const [jobData, setJobData] = useState({
    "EmpId": data.id,
    "jobTitle": "",
    "companyName": "",
    "location": "",
    "employmentType": "",
    "experience": "",
    "salary": "",
    "vacancies": 0,
    "skills": "",
    "description": "",
    "deadline": "",
    "postedDate": today,
    "status": "Open"
  })

  const postJob = async () => {
    const { jobTitle, companyName, location, employmentType, experience, salary, vacancies, skills, description, deadline, postedDate, status } = jobData
    if (jobTitle && companyName && location && employmentType && experience && salary && vacancies && skills && description && deadline && postedDate && status) {
      setLoading(true)
      const result = await addJob(jobData)
      console.log("job : ", result)
      if (result.status == 201) {
        Swal.fire({
          title: "Job Posted successfully",
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
      setJobDatauseState({
        "EmpId": data.id,
        "jobTitle": "",
        "companyName": "",
        "location": "",
        "employmentType": "",
        "experience": "",
        "salary": "",
        "vacancies": 0,
        "skills": "",
        "description": "",
        "deadline": "",
        "postedDate": today,
        "status": "Open"
      })
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
    postJob()
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  return (
    <div>
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
          <Card className="shadow rounded-4 border-0">
            <Card.Header
              className="text-white text-center py-3"
              style={{ background: "#491077" }}
            >
              <h3>Post a New Job</h3>
            </Card.Header>

            <Card.Body className="p-4">

              <form onSubmit={handleSubmit}>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Job Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="jobTitle"
                        value={jobData.jobTitle}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="companyName"
                        value={jobData.companyName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        name="location"
                        value={jobData.location}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Employment Type</Form.Label>
                      <Form.Select
                        name="employmentType"
                        value={jobData.employmentType}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                        <option value="Remote">Remote</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Experience Required</Form.Label>
                      <Form.Select
                        name="experience"
                        value={jobData.experience}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Fresher">Fresher</option>
                        <option value="1-2 Years">1-2 Years</option>
                        <option value="3-5 Years">3-5 Years</option>
                        <option value="5+ Years">5+ Years</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Salary</Form.Label>
                      <Form.Control
                        type="text"
                        name="salary"
                        value={jobData.salary}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Vacancies</Form.Label>
                      <Form.Control
                        type="number"
                        name="vacancies"
                        value={jobData.vacancies}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Application Deadline</Form.Label>
                      <Form.Control
                        type="date"
                        name="deadline"
                        value={jobData.deadline}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Required Skills</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="skills"
                    value={jobData.skills}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Job Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="description"
                    value={jobData.description}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="text-center">
                  <Button
                    type="submit"
                    style={{
                      background: "#491077",
                      border: "none",
                      padding: "10px 40px"
                    }}
                  >
                    Post Job
                  </Button>
                </div>

              </form>

            </Card.Body>
          </Card>)}
      </div>
    </div>
  )
}

export default PostAJob
