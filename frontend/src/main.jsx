import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import "./index.css";
import Admindash from "./components/Admindash";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admindash />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
