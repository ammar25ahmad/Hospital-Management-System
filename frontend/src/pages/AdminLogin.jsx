import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // If user is already logged in (token exists), redirect to admin dashboard
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            // Optionally, you could verify the token with the backend here
            // For simplicity, we'll just assume if a token exists, they are logged in.
            navigate('/admin/dashboard');
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (!email || !password) {
            setError('Email and password are required.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/admin/login', { // Updated API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // Using email
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(data.message || 'Login successful!');
                localStorage.setItem('adminToken', data.token);
                localStorage.setItem('adminUser', JSON.stringify(data.admin)); // Store admin user info

                setEmail('');
                setPassword('');
                // Redirect to admin dashboard or another protected page
                navigate('/admin/dashboard');
            } else {
                setError(data.message || 'Login failed. Please check your credentials.');
                // Clear token if login fails and a token was somehow present
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminUser');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred during login. Please try again.');
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
        }
    };

    return (
        <>
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label> {/* Changed from username to email */}
                    <input
                        type="email" // Changed type to email
                        id="email"
                        name="email"
                        placeholder="Admin Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </>
    );
}

export default AdminLogin;