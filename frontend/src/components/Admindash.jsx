import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { GiCrossMark } from "react-icons/gi";

const Admindash = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');
  const [adminName, setAdminName] = useState('Admin');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('No token found. Please login.');
        // navigate('/admin/login'); // Optionally redirect to login
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/admin/dashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setDashboardData(data);
          // Assuming the admin's name is part of the response under data.admin.name
          if (data.admin && data.admin.name) {
            setAdminName(data.admin.name);
          } else if (data.admin && data.admin.email) {
            setAdminName(data.admin.email); // Fallback to email if name is not present
          }
          setError('');
        } else {
          setError(data.message || 'Failed to fetch dashboard data.');
          if (response.status === 401 || response.status === 403) {
            // Token might be invalid or expired
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            // navigate('/admin/login'); // Redirect to login
          }
        }
      } catch (err) {
        console.error('Fetch dashboard error:', err);
        setError('An error occurred while fetching dashboard data.');
      }
    };

    fetchDashboardData();
    const adminUser = JSON.parse(localStorage.getItem('adminUser'));
    if (adminUser && adminUser.name) {
        setAdminName(adminUser.name);
    } else if (adminUser && adminUser.email) {
        setAdminName(adminUser.email);
    }
  }, [navigate]);

  return (
    <>
        <main className="flex-1 p-4">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl text-blue-600 font-bold">Hospital Dashboard</h1>
            <div className="flex items-center">
              <span className="mr-2">
                <FaUser />
              </span>
              <p>{adminName}</p> {/* Display dynamic admin name */}
            </div>
          </header>
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          {/* Display loading or dashboard content based on dashboardData */}
          {!dashboardData && !error && <p>Loading dashboard...</p>}
          {dashboardData && (
            <>
          {/* Cards Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Link to='/admin/patients'>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-2">New Patients</h2>
                <p className="text-gray-600">10</p>
              </div>
            </Link>
            <Link to='/admin/doctors'>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-2">Our Doctors</h2>
                <p className="text-gray-600">50</p>
              </div>
            </Link>

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
            <div className="col-span-2 md:col-span-1 lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
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
            </div>
            <div className="bg-blue-700 text-white p-4 rounded-lg shadow-lg">
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
          {/* Side wale Tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Appointments Requests</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-gray-200">
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/*1*/}
                  <tr className="border-b">
                    <td className="py-2 flex items-center">
                      <span className="mr-2">
                        <FaUser /> Qasim
                      </span>
                    </td>
                    <td className="py-2">2022-03-01</td>
                    <td className="py-2">10:00 AM</td>
                    <td className="py-2">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                        <TiTick />
                      </button>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                        <GiCrossMark />
                      </button>
                    </td>
                  </tr>
                  {/*2*/}
                  <tr className="border-b">
                    <td className="py-2 flex items-center">
                      <span className="mr-2">
                        <FaUser /> Farhan
                      </span>
                    </td>
                    <td className="py-2">2022-03-01</td>
                    <td className="py-2">10:00 AM</td>
                    <td className="py-2">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                        <TiTick />
                      </button>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                        <GiCrossMark />
                      </button>
                    </td>
                  </tr>
                  {/*3*/}
                  <tr className="border-b">
                    <td className="py-2 flex items-center">
                      <span className="mr-2">
                        <FaUser /> Laiba
                      </span>
                    </td>
                    <td className="py-2">2022-03-01</td>
                    <td className="py-2">10:00 AM</td>
                    <td className="py-2">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                        <TiTick />
                      </button>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                        <GiCrossMark />
                      </button>
                    </td>
                  </tr>
                  {/*4*/}
                  <tr className="border-b">
                    <td className="py-2 flex items-center">
                      <span className="mr-2">
                        <FaUser /> Hira
                      </span>
                    </td>
                    <td className="py-2">2022-03-01</td>
                    <td className="py-2">10:00 AM</td>
                    <td className="py-2">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                        <TiTick />
                      </button>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                        <GiCrossMark />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">Recent Patients</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-gray-200">
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Age</th>
                    <th className="pb-2">gender</th>
                    <th className="pb-2">Ward</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2">
                      <span>
                        <FaUser />
                        Ali
                      </span>
                    </td>
                    <td className="py-2">25</td>
                    <td className="py-2">Male</td>
                    <td className="py-2">Ward 1</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2">
                      <span>
                        <FaUser />
                        Imran
                      </span>
                    </td>
                    <td className="py-2">33</td>
                    <td className="py-2">Female</td>
                    <td className="py-2">Ward 4</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2">
                      <span>
                        <FaUser />
                        Shahbaz Sharif
                      </span>
                    </td>
                    <td className="py-2">65</td>
                    <td className="py-2">Male</td>
                    <td className="py-2">Ward 6</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2">
                      <span>
                        <FaUser />
                        Hania Amir
                      </span>
                    </td>
                    <td className="py-2">45</td>
                    <td className="py-2">Female</td>
                    <td className="py-2">Ward 2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
            </>
          )}
        </main>
    </>
  );
};

export default Admindash;
