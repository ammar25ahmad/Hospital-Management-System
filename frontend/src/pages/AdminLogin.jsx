import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // If user is already logged in (token exists), redirect to admin dashboard
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      // Optionally, you could verify the token with the backend here
      // For simplicity, we'll just assume if a token exists, they are logged in.
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/admin/login", {
        // Updated API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Using email
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || "Login successful!");
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUser", JSON.stringify(data.admin)); // Store admin user info

        setEmail("");
        setPassword("");
        // Redirect to admin dashboard or another protected page
        navigate("/admin");
      } else {
        setError(
          data.message || "Login failed. Please check your credentials."
        );
        // Clear token if login fails and a token was somehow present
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login. Please try again.");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-xl p-8 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-blue-900"
            >
              Email
            </label>
            <input
              className="mt-1 block w-full px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out sm:text-sm"
              type="email"
              id="email"
              name="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-blue-900"
            >
              Password
            </label>
            <input
              className="mt-1 block w-full px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out sm:text-sm"
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
            type="submit"
          >
            Log In
          </button>
        </form>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        {success && <p className="mt-4 text-sm text-green-600">{success}</p>}
      </div>
    </div>
  );
}

export default AdminLogin;
