import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { CiMedicalCross } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { FaRegNewspaper } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
const Admindash = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex">
        <aside className="w-60 bg-orange-600 text-white p-4 h-screen">
          <h1 className="text-2xl font-bold mb-4 text-center">Admin</h1>
          <ul>
            <li className="mb-4 flex items-center bg-orange-700 rounded-lg p-2">
              <span className="mr-2">
                <MdOutlineDashboard />
              </span>
              <a href="">Dashboarda</a>
            </li>
            <li className="mb-4 flex items-center bg-orange-700 rounded-lg p-2">
              <span className="mr-2">
                <FaUserDoctor />
              </span>
              <a href="">Doctors</a>
            </li>
            <li className="mb-4 flex items-center bg-orange-700 rounded-lg p-2">
              <span className="mr-2">
                <FaUser />
              </span>
              <a href="">Patients</a>
            </li>
            <li className="mb-4 flex items-center bg-orange-700 rounded-lg p-2">
              <span className="mr-2">
                <CiMedicalCross />
              </span>
              <a href="">Medications</a>
            </li>
            <li className="mb-4 flex items-center bg-orange-700 rounded-lg p-2">
              <span className="mr-2">
                <FaRegNewspaper />
              </span>
              <a href="">News</a>
            </li>
            <li className="mb-4 flex items-center bg-orange-700 rounded-lg p-2">
              <span className="mr-2">
                <CiLogout />
              </span>
              <a href="">Logout</a>
            </li>
          </ul>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-6">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Hospital Dashboard</h1>
            <div className="flex items-center">
              <span className="mr-2">
                <FaUser />
              </span>
              <p>Muhammad Taha</p>
            </div>
          </header>
          {/* Cards Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-2">New Patients</h2>
              <p className="text-gray-600">10</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-2">Our Doctors</h2>
              <p className="text-gray-600">50</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-2">Operations</h2>
              <p className="text-gray-600">5</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-2">Income</h2>
              <p className="text-gray-600">1250000Rs.</p>
            </div>
          </div>
          {/* Doctor Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* <div className="col-span-2 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-2">Patient Status</h2>
              <div className="h-40 bg-gray-100 flex justify-center items-center">
                <p className="text-gray-600">No data available</p>
              </div>
              <div className="flex justify-around mt-4">
                <span className="text-gray-600 ">
                  Reovered:<b>113</b>
                </span>
                <span>
                  Death:<b>8</b>
                </span>
              </div>
            </div> */}
            <div className="bg-orange-400 text-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">Ali Ahmad</h2>
              <p>Emergency</p>
              <p>Sergimade Hospital</p>
              <div className="mt-4">
                <p>
                  Hours:<b>3,890</b>
                </p>
                <p>
                  Patients:<b>1870</b>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admindash;
