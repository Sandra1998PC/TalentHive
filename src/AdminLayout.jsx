import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AdminHeader from './components/AdminHeader'
import Footer from './components/Footer'
import AdminSidebar from './components/AdminSidebar'

function AdminLayout() {
    const location = useLocation();
    // const data = location.state?.data;
     const data = JSON.parse(localStorage.getItem("adminData"));
    return (
        <>
            <AdminHeader />

            <div className="container-fluid p-0" style={{ minHeight: '50vh' }}>
                <div className="d-flex">
                    <div className="flex-grow-1 p-0">
                        <Outlet context={{ data }} />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default AdminLayout