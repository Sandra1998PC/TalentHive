import React from "react";
import { IoNotifications } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
  const navigate = useNavigate();
  const logOut = () => {
    navigate('/login');
    localStorage.removeItem("adminData");
  }
  return (
    <div>
      <Navbar
        expand="lg"
        bg="light"
        className="shadow-sm py-2 adminheader "
        sticky="top"
      >
        <Container>
          <Navbar.Brand as={Link} to="/user">
            <img
              src={logo}
              alt="TalentHive"
              style={{ width: "110px" }}
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="user-navbar" />

          <Navbar.Collapse id="user-navbar">
            <Nav className="ms-auto align-items-lg-center gap-lg-4 text-center">
               <Nav.Link as={Link} to="/user/jobs" className="textColor">
                Jobs
              </Nav.Link>
              <Nav.Link as={Link} to="/user/applications" className="textColor">
                Applications
              </Nav.Link>

              {/* <Nav.Link as={Link} to="/user/notifications" className="textColor">
                <IoNotifications size={22} />
              </Nav.Link> */}

              <NavDropdown
                title="My Profile"
                id="nav-dropdown"
                className="profile-dropdown"
              >
                <NavDropdown.Item eventKey="4.1" as={Link} to="/user/viewuser">View</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.2" as={Link} to="/user/userprofile">Update</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="4.4" onClick={logOut}>Log Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
