import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Form from "./Form";
import Admindash from "./Admindash";


createRoot(document.getElementById("root")).render(
  <StrictMode>

    <Form />
    <Admindash />
  </StrictMode>
);
