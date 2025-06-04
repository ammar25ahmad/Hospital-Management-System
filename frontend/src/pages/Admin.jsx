import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admindash from "../components/Admindash";
import AdminMenu from "../components/AdminMenu";
import AdminDoctor from "../components/AdminDoctor";


function Admin() {
    return (
        <>
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex">
                            <AdminMenu />
                        <Routes>
                            <Route path='/' element={<Admindash />} />
                            <Route path='/doctors' element={<AdminDoctor />} />
                        </Routes>
                </div>
            </div>
        </>
    )
}

export default Admin