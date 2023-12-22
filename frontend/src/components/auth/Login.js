import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        username: 'Username is required',
      }));
      return;
    }

    if (!formData.password) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password is required',
      }));
      return;
    }

    setFormErrors({
      username: '',
      password: '',
    });

    try {
      const response = await axios.post('/login', formData);
      console.log('Login successful', response.data);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md">
      <h2 className="text-2xl mb-4">Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className={`w-full p-2 border ${
              formErrors.username ? 'border-red-500' : 'border-gray-300'
            } rounded`}
            placeholder="Enter Username"
          />
          {formErrors.username && (
            <p className="text-xs italic text-red-500">{formErrors.username}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className={`w-full p-2 border ${
              formErrors.password ? 'border-red-500' : 'border-gray-300'
            } rounded`}
            placeholder="Enter Password"
          />
          {formErrors.password && (
            <p className="text-xs italic text-red-500">{formErrors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
      <p className='text-sm mt-4'>
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
