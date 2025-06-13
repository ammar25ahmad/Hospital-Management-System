import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { CiMedicalCross } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { FaRegNewspaper } from "react-icons/fa";

function AdminMenu() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin-login");
  };

  return (
    <aside className="w-60 bg-blue-600 text-white p-4 h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Admin</h1>
      <ul>
        <Link to="/admin">
          <li className="mb-4 flex items-center bg-blue-700 rounded-lg p-2">
            <span className="mr-2">
              <MdOutlineDashboard />
            </span>
            Dashboard
          </li>
        </Link>
        <Link to="/admin/doctors">
          <li className="mb-4 flex items-center bg-blue-700 rounded-lg p-2">
            <span className="mr-2">
              <FaUserDoctor />
            </span>
            Doctors
          </li>
        </Link>
        <Link to="/admin/patients">
          <li className="mb-4 flex items-center bg-blue-700 rounded-lg p-2">
            <span className="mr-2">
              <FaUser />
            </span>
            Patients
          </li>
        </Link>
        <Link to="/admin/medications">
          <li className="mb-4 flex items-center bg-blue-700 rounded-lg p-2">
            <span className="mr-2">
              <CiMedicalCross />
            </span>
            Medications
          </li>
        </Link>
        <Link to="/admin/news">
          <li className="mb-4 flex items-center bg-blue-700 rounded-lg p-2">
            <span className="mr-2">
              <FaRegNewspaper />
            </span>
            News
          </li>
        </Link>
        {/* Logout Button */}
        <li
          className="mb-4 flex items-center bg-blue-700 rounded-lg p-2 cursor-pointer hover:bg-blue-800"
          onClick={handleLogout}
        >
          <span className="mr-2">
            <CiLogout />
          </span>
          Logout
        </li>
      </ul>
    </aside>
  );
}

export default AdminMenu;
