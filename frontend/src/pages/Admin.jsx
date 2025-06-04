import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admindash from "../components/Admindash";
import AdminMenu from "../components/AdminMenu";
import AdminDoctor from "../components/AdminDoctor";
import AdminPatients from "../components/AdminPatients";
import AdminMedications from "../components/AdminMedications";
import AdminNews from "../components/AdminNews";


function Admin() {
    return (
        <>
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex">
                            <AdminMenu />
                        <Routes>
                            <Route path='/' element={<Admindash />} />
                            <Route path='/doctors' element={<AdminDoctor />} />
                            <Route path='/patients' element={<AdminPatients />} />
                            <Route path='/medications' element={<AdminMedications />} />
                            <Route path='/news' element={<AdminNews />} />
                        </Routes>
                </div>
            </div>
        </>
    )
}

export default Admin