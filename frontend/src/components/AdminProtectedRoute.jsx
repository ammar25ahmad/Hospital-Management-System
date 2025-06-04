import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = () => {
    const token = localStorage.getItem('adminToken');
    // You could add more sophisticated token validation here if needed,
    // e.g., checking token expiration or verifying with a backend endpoint.
    // For now, we just check for presence.

    if (!token) {
        // If no token, redirect to the admin login page
        return <Navigate to="/admin-login" replace />; // Ensure '/admin-login' is your login route
    }

    // If token exists, render the child components (the protected page)
    return <Outlet />;
};

export default AdminProtectedRoute;