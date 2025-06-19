import { useState, useEffect } from "react";

function AdminSettings() {
  // State for admin data and form inputs
  const [admin, setAdmin] = useState({
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "********", // Placeholder for security
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setFormData({
      name: admin.name,
      email: admin.email,
      password: "",
      newPassword: "",
    });
  }, [admin]);

  const fetchAdminData = async () => {
    try {
      // Simulate API call
      // const response = await api.get('/admin/me');
      // setAdmin(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch admin data");
    }
  };

  // Mock API call to update admin data (UPDATE)
  const updateAdminData = async (data) => {
    try {
      // Simulate API call
      // await api.put('/admin/me', data);
      setAdmin((prev) => ({
        ...prev,
        name: data.name,
        email: data.email,
        ...(data.newPassword && { password: "********" }), // Update password placeholder
      }));
      setSuccess("Profile updated successfully");
      setError("");
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update profile");
      setSuccess("");
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!formData.name || !formData.email) {
      setError("Name and email are required");
      return;
    }
    if (formData.newPassword && !formData.password) {
      setError("Current password is required to set a new password");
      return;
    }

    // Prepare data for update
    const updateData = {
      name: formData.name,
      email: formData.email,
      ...(formData.newPassword && { password: formData.newPassword }),
    };

    updateAdminData(updateData);
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setError("");
    setSuccess("");
    if (!isEditing) {
      setFormData({
        name: admin.name,
        email: admin.email,
        password: "",
        newPassword: "",
      });
    }
  };

  // Load admin data on component mount
  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Admin Settings
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Admin Profile
          </h2>
          {!isEditing ? (
            <div className="space-y-2">
              <p>
                <span className="font-medium">Name:</span> {admin.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {admin.email}
              </p>
              <p>
                <span className="font-medium">Password:</span> {admin.password}
              </p>
              <button
                onClick={toggleEdit}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password (optional)
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter new password"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={toggleEdit}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
