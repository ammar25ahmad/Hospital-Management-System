import { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";

function AdminMedicine() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle adding a medicine
  const handleAddMedicine = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/addmedicine",
        newMedicine
      );
      console.log(response.data);
      // Refresh medicines list after adding
      const fetchResponse = await axios.get(
        `http://localhost:3000/fetchmedicine${
          searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ""
        }`
      );
      setMedicines(fetchResponse.data);
      setNewMedicine({ name: "", price: "", quantity: "", description: "" });
    } catch (err) {
      console.log(err + " Error in adding medicine");
    }
    setShowAddModal(false);
  };

  // Function to handle showing medicine details
  const handleToggleDetail = (medicine) => {
    setSelectedMedicine(medicine);
    setShowDetail(true);
  };

  // Fetch medicines with search query
  useEffect(() => {
    const fetchMedicines = async (query = "") => {
      try {
        const url = query
          ? `http://localhost:3000/fetchmedicine?q=${encodeURIComponent(query)}`
          : "http://localhost:3000/fetchmedicine";
        const response = await axios.get(url);
        setMedicines(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching medicines:", error);
        setLoading(false);
      }
    };

    fetchMedicines(searchQuery);
  }, [searchQuery]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          List of Medicines
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
          Add New Medicine
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        {medicines.length || 0} available medicines
      </p>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search medicines..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {medicines.length > 0 ? (
                medicines.map((medicine) => (
                  <tr key={medicine._id} className="hover:bg-gray-50">
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-500">
                        {medicine.name}
                      </div>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                      ${parseFloat(medicine.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                      {medicine.quantity}
                    </td>
                    <td className="px-3 py-2  text-sm text-gray-500">
                      {medicine.description}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-[#155DFC] hover:text-blue-900 mr-4"
                        onClick={() => handleToggleDetail(medicine)}
                      >
                        <FaArrowRight size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No medicines found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Medicine Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Add New Medicine
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
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddMedicine} className="space-y-4">
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
                    value={newMedicine.name}
                    onChange={(e) =>
                      setNewMedicine({ ...newMedicine, name: e.target.value })
                    }
                    required
                    name="name"
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-1"
                    htmlFor="price"
                  >
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    step="0.01"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMedicine.price}
                    onChange={(e) =>
                      setNewMedicine({ ...newMedicine, price: e.target.value })
                    }
                    required
                    name="price"
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-1"
                    htmlFor="quantity"
                  >
                    Quantity
                  </label>
                  <input
                    id="quantity"
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMedicine.quantity}
                    onChange={(e) =>
                      setNewMedicine({
                        ...newMedicine,
                        quantity: e.target.value,
                      })
                    }
                    required
                    name="quantity"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    className="block text-gray-700 font-medium mb-1"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMedicine.description}
                    onChange={(e) =>
                      setNewMedicine({
                        ...newMedicine,
                        description: e.target.value,
                      })
                    }
                    required
                    name="description"
                    rows="3"
                  />
                </div>
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
                  Add Medicine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Medicine Details Modal */}
      {showDetail && selectedMedicine && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Medicine Details
              </h3>
              <button
                onClick={() => setShowDetail(false)}
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
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Name
                </label>
                <p className="text-gray-900">{selectedMedicine.name}</p>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Price
                </label>
                <p className="text-gray-900">
                  ${parseFloat(selectedMedicine.price).toFixed(2)}
                </p>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Quantity
                </label>
                <p className="text-gray-900">{selectedMedicine.quantity}</p>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Description
                </label>
                <p className="text-gray-900">{selectedMedicine.description}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setShowDetail(false)}
                className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminMedicine;
