import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from './components/AdminHeader'
import Footer from './components/Footer'
import AdminSidebar from './components/AdminSidebar'
import Header from './components/Header'

function UserLayout() {
    const data = JSON.parse(localStorage.getItem("userData"));
    return (
        <>
            <Header/>

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

export default UserLayout