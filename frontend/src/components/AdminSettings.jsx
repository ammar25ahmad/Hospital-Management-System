import { useState, useEffect } from "react";
import axios from "axios";

function AdminSettings() {
  const [editPassword, setEditPassword] = useState(false)
  const [button, setButton] = useState(true)
  const [error, setError] = useState("")
  const [adminName, setAdminName] = useState("")
  const [adminEmail, setAdminEmail] = useState("")
  const [dashboardData, setDashboardData] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const fetchData = async () => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      setError("No Token, Please try again")
    }
    try {
      const response = await fetch(
        "https://hospital-management-system-bice.vercel.app/api/admin/dashboard",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setDashboardData(data);
        // Assuming the admin's name is part of the response under data.admin.name
        if (data.admin && data.admin.name) {
          setAdminName(data.admin.name);
        } else if (data.admin && data.admin.email) {
          setAdminName(data.admin.email); // Fallback to email if name is not present
        }
        if (data.admin && data.admin.name) {
          setAdminEmail(data.admin.email);
        }
        setError("");
      } else {
        setError(data.message || "Failed to fetch dashboard data.");
        if (response.status === 401 || response.status === 403) {
          // Token might be invalid or expired
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminUser");
          // navigate('/admin/login'); // Redirect to login
        }
      }
    } catch (err) {
      console.error("Fetch dashboard error:", err);
      setError("An error occurred while fetching dashboard data.");
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const passwordChange = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("adminToken")
    if (!token) {
      setError("No Token, Please try again")
    }

    try {
      // const adminString = localStorage.getItem("adminUser")
      // if(adminString){
      //   const admin = JSON.parse(adminString);
      //   const adminID = admin.id;
      const response = await axios.post('https://hospital-management-system-bice.vercel.app/api/admin/change-password', {
        adminEmail, currentPassword, newPassword
      }
      )
      setEditPassword(false)
      setButton(true)
      const data = await response.json()


    } catch (err) {
      console.log(err)
    }


  }
  useEffect(() => {
    passwordChange()
  }, [])

  function passwordForm() {
    setEditPassword(true)
    setButton(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Admin Settings
        </h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Admin Profile
          </h2>
          <h4 className="font-bold">Name: <i> {adminName} </i></h4>
          <h4 className="font-bold">Email: {adminEmail}</h4>
          {button && (
            <button onClick={passwordForm} className="bg-blue-600 text-white p-2 mt-6 cursor-pointer rounded-sm ">Change Password</button>
          )}
          {editPassword && (
            <div>
              <form onSubmit={passwordChange}>
                <input value={adminEmail} readOnly name="email" type="text" className="border-black border-2 block mt-4 pl-3 rounded-sm pt-1 pb-1 focus:outline-blue-600 w-3xs" />
                <input type="password" placeholder="Current Password" name="currentPassword" className="border-black border-2 block mt-4 pl-3 rounded-sm pt-1 pb-1 focus:outline-blue-600 w-3xs" value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)} />
                <input type="password" placeholder="New Password" name="newPassword" className="border-black border-2 block mt-4 pl-3 rounded-sm pt-1 pb-1 focus:outline-blue-600 w-3xs" value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)} />
                <button type="submit" className="bg-blue-600 text-white p-2 mt-6 cursor-pointer rounded-sm ">Change Password</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
