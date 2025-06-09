import { useState, useEffect } from "react";
import axios from "axios";

function AdminPatient() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    department: "",
    age: "",
    cnic: "",
    password: "",
  });

  // Function to handle adding a patient
  const handleAddPatient = async (e) => {
    // Prevent the default form submission
    e.preventDefault();
    try {
      // Send a POST request to the server to add a new patient
      const response = await axios.post(
        "http://localhost:3000/addPatient",
        newPatient
      );
      // Update patients state with the new patient
      setPatients([...patients, response.data]);
      // Log the response data
      console.log(response.data);
    } catch (err) {
      // Log any errors that occur
      console.log(err + " Error in adding patient");
    }
    // Set the showAddModal state to false
    setShowAddModal(false);
  };

  const handleDelete = async (patientId) => {
    try {
      // Send a DELETE request to the server to delete the patient
      const response = await axios.delete(
        `http://localhost:3000/deletePatient/${patientId}`
      );
      // Remove the deleted patient from state
      setPatients(patients.filter((patient) => patient.id !== patientId));
      // Log the response data
      console.log(response.data);
    } catch (err) {
      // Log any errors that occur
      console.log(err + " Error in deleting patient");
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch patients data
    const fetchPatients = async (query = "") => {
      try {
        // Replace with your actual API endpoint
        const url = query
          ? `http://localhost:3000/fetchPatient?q=${encodeURIComponent(query)}`
          : "http://localhost:3000/fetchPatient";
        const response = await axios.get(url);
        setPatients(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setLoading(false);
      }
    };

    fetchPatients(searchQuery);
  }, [searchQuery]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          List of patients
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#155DFC] hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add new patient
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        {patients.length || 0} available patients
      </p>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="p-5 mb-7">
          <label htmlFor="date">Filter By Date</label>
          <input
            type="date"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#155DFC]"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden gap-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Phone number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Gender
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={patient.avatar || "/user.png"}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {patient.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {patient.department}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.bloodGroup}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(patient.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Add New Patient
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-600 hover:text-gray-900 transition"
                aria-label="Close modal"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddPatient} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-1"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPatient.name}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, name: e.target.value })
                    }
                    required
                    name="name"
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-1"
                    htmlFor="age"
                  >
                    Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPatient.age}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, age: e.target.value })
                    }
                    required
                    name="age"
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-1"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPatient.email}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, email: e.target.value })
                    }
                    required
                    name="email"
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-1"
                    htmlFor="phone"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPatient.phone}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, phone: e.target.value })
                    }
                    required
                    name="phone"
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-1"
                    htmlFor="department"
                  >
                    Department
                  </label>
                  <input
                    id="department"
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPatient.department}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        department: e.target.value,
                      })
                    }
                    required
                    name="department"
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-1"
                    htmlFor="cnic"
                  >
                    CNIC
                  </label>
                  <input
                    id="cnic"
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPatient.cnic}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, cnic: e.target.value })
                    }
                    required
                    name="cnic"
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-1"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPatient.gender}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, gender: e.target.value })
                    }
                    required
                    name="gender"
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-1"
                  htmlFor="bloodGroup"
                >
                  Blood Group
                </label>
                <select
                  id="bloodGroup"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newPatient.blood}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, blood: e.target.value })
                  }
                  required
                  name="gender"
                >
                  <option value="" disabled>
                    Select Blood Group
                  </option>
                  <option value="Male">O+</option>
                  <option value="Female">AB+</option>
                  <option value="Other">A+</option>
                  <option value="Other">B+</option>
                </select>
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newPatient.password}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, password: e.target.value })
                  }
                  required
                  name="password"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#155DFC] text-white rounded-md hover:bg-blue-700 transition"
                >
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPatient;
