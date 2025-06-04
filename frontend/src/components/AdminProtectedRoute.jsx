import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {  jwtDecode } from'jwt-decode';


const AdminProtectedRoute = () => {
    const token = localStorage.getItem('adminToken');

    if (!token) {
        // If no token, redirect to the admin login page
        return <Navigate to="/admin-login" replace />; // Ensure '/admin-login' is your login route
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // in seconds

        if (decoded.exp < currentTime) {
            // Token expired
            localStorage.removeItem('adminToken');
            return <Navigate to="/admin-login" replace />;
        }
    } catch (error) {
        // Invalid token format or decode error
        localStorage.removeItem('adminToken');
        return <Navigate to="/admin-login" replace />;
    }

    // If token exists and is valid, render the child components (the protected page)
    return <Outlet />;
};

export default AdminProtectedRoute;