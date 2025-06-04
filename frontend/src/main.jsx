import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./index.css";

// Page Imports
import Home from "./pages/Home";
import Admin from "./pages/Admin"; // Assuming this is your main Admin dashboard/layout
import AdminLogin from "./pages/AdminLogin";

// Component Imports
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Admindash from "./components/Admindash"; // Assuming this is the actual dashboard content
import AdminDoctor from "./components/AdminDoctor";
import AdminPatients from "./components/AdminPatients";
import AdminMedications from "./components/AdminMedications";
import AdminNews from "./components/AdminNews";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        {/* This setup assumes Admin.jsx might be a layout for all /admin/* routes */}
        {/* and Admindash.jsx is the specific dashboard content. */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<Admin />}> {/* Admin layout route */}
            {/* Child routes will render inside Admin.jsx's <Outlet /> */}
            {/* Default child route for /admin (e.g., dashboard) */}
            <Route index element={<Admindash />} /> {/* Renders Admindash at /admin */}
            <Route path="dashboard" element={<Admindash />} /> {/* Explicit /admin/dashboard */}
            <Route path="doctors" element={<AdminDoctor />} />
            <Route path="patients" element={<AdminPatients />} />
            <Route path="medications" element={<AdminMedications />} />
            <Route path="news" element={<AdminNews />} />
            {/* Add other admin sub-routes here */}
          </Route>
        </Route>

        {/* Fallback for any other route - optional */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
