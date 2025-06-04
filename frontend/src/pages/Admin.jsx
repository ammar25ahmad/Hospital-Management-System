import React from "react";
import { Outlet } from 'react-router-dom';
import AdminMenu from "../components/AdminMenu";



function Admin() {
    return (
        <>
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex">
                            <AdminMenu />
                        {/* This is where the content of nested routes will be rendered */}
                        <Outlet />
                </div>
            </div>
        </>
    )
}

export default Admin