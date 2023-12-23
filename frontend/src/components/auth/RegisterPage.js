import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    role: 'user',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setFormErrors({
      ...formErrors,
      [e.target.name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.email) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Email is required',
        }));
        return;
      }

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

      const response = await axios.post('/register', formData);
      console.log("Register successful", response.data);

      onSubmit(formData);

      setFormData({
        email: '',
        username: '',
        password: '',
        role: 'user',
      });

    } catch (error) {
      if (error.response && error.response.data) {
        setFormErrors(error.response.data);
      } else {
        console.error('Error during registration:', error.message);
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className={`${
              formErrors.email ? 'border-red-500' : 'border-gray-300'
            } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue`}
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
          />
          {formErrors.email && <p className="text-red-500 text-xs italic">{formErrors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className={`${
              formErrors.username ? 'border-red-500' : 'border-gray-300'
            } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue`}
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter Username"
          />
          {formErrors.username && <p className="text-red-500 text-xs italic">{formErrors.username}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className={`${
              formErrors.password ? 'border-red-500' : 'border-gray-300'
            } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue`}
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
          />
          {formErrors.password && <p className="text-red-500 text-xs italic">{formErrors.password}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
            Role
          </label>
          <select
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="mb-6">
          <button
            className="w-full bg-blue-500 text-white p-2 rounded"
            type="submit"
          >
            Register
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
