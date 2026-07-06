import React from "react";
import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaBuilding,
    FaPlusCircle,
    FaBriefcase,
    FaUsers,
    FaBell,
    FaChartBar,
    FaCog,
    FaSignOutAlt,
} from "react-icons/fa";

function AdminSidebar() {
    return (
        <div
            className="bg-dark text-white p-3 adminSideBar"
            style={{
                width: "260px",
                minHeight: "100vh",
            }}
        >
            <h3 className="text-center mb-4">TalentHive</h3>

            <NavLink
                to="/admin"
                end
                className="sidebar-link d-block mb-3 text-decoration-none"
            >
                <FaHome className="me-2" />
                Dashboard
            </NavLink>

            <NavLink
                to="/admin/companyprofile"
                className="sidebar-link d-block mb-3 text-decoration-none"
            >
                <FaBuilding className="me-2" />
                Company Profile
            </NavLink>

            <NavLink
                to="/admin/postajob"
                className="sidebar-link d-block mb-3 text-decoration-none"
            >
                <FaPlusCircle className="me-2" />
                Post Job
            </NavLink>

            <NavLink
                to="/admin/managejobs"
                className="sidebar-link d-block mb-3 text-decoration-none"
            >
                <FaBriefcase className="me-2" />
                Manage Jobs
            </NavLink>

            <NavLink
                to="/admin/applications"
                className="sidebar-link d-block mb-3 text-decoration-none"
            >
                <FaUsers className="me-2" />
                Applications
            </NavLink>

            <NavLink
                to="/admin/shortlistedcandidates"
                className="sidebar-link d-block mb-3 text-decoration-none"
            >
                <FaUsers className="me-2" />
                Shortlisted
            </NavLink>

            <NavLink
                to="/admin/notifications"
                className="sidebar-link d-block mb-3 text-decoration-none"
            >
                <FaBell className="me-2" />
                Notifications
            </NavLink>

            <NavLink
                to="/admin/reports"
                className="sidebar-link d-block mb-3 text-decoration-none"
            >
                <FaChartBar className="me-2" />
                Reports
            </NavLink>

            <NavLink
                to="/admin/settings"
                className="sidebar-link d-block mb-3 text-decoration-none"
            >
                <FaCog className="me-2" />
                Settings
            </NavLink>

            <hr className="text-secondary" />

            <NavLink
                to="/login"
                className="sidebar-link d-block text-decoration-none"
            >
                <FaSignOutAlt className="me-2" />
                Logout
            </NavLink>
        </div>
    );
}

export default AdminSidebar;