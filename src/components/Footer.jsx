import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="footer bg-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">

          {/* Logo & About */}
          <div className="col-md-4 mb-4">
            <img
              src={logo}
              alt="TalentHive Logo"
              style={{ width: "140px" }}
            />
            <p className="mt-3" style={{ textAlign : "justify" }}>
              TalentHive connects talented professionals with leading companies.
              Find your dream job or hire the perfect candidate—all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-decoration-none textColor">Home</Link></li>
              <li><Link to="/jobs" className="text-decoration-none textColor">Jobs</Link></li>
              <li><Link to="/about" className="text-decoration-none textColor">About</Link></li>
              <li><Link to="/contact" className="text-decoration-none textColor">Contact</Link></li>
            </ul>
          </div>

          {/* For Employers */}
          <div className="col-md-3 mb-4">
            <h5>Employers</h5>
            <ul className="list-unstyled">
              <li><Link to="/admin/postajob" className="text-decoration-none textColor">Post a Job</Link></li>
              <li><Link to="/admin/managejobs" className="text-decoration-none textColor">Manage Jobs</Link></li>
              <li><Link to="/admin/companyprofile" className="text-decoration-none textColor">Company Profile</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3 mb-4">
            <h5>Contact Us</h5>
            <p>Email: support@talenthive.com</p>
            <p>Phone: +91 98765 43210</p>

            <div className="d-flex gap-3 fs-5">
              <FaFacebookF />
              <FaInstagram />
              <FaLinkedinIn />
              <FaTwitter />
            </div>
          </div>

        </div>

        <hr className="border-secondary" />

        <div className="text-center">
          <small>
            © {new Date().getFullYear()} TalentHive. All Rights Reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;