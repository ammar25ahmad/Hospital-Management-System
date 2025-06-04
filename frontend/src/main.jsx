import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import "./index.css";
import Admin from "./pages/Admin";
import Home from "./pages/Home";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
