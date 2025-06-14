import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ChartBarIcon,
} from '@heroicons/react/24/solid';



const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const toggleVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Mock login (replace with API call later)
      login();
      navigate('/dashboard');
      
      // Example API integration (uncomment when ready):
      /*
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) throw new Error('Login failed');
      const { token } = await response.json();
      login(); // AuthContext will handle token storage
      navigate('/dashboard');
      */
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 bg-gradient-to-br from-[#dbeaff] to-[#ffffff]">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="w-[60px] h-[60px] bg-[#2563ea] rounded-[10px] flex items-center justify-center">
            <ChartBarIcon className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-semibold mt-6 mb-2 font-poppins text-black text-center dark:text-gray-600">Sport Admin</h1>
          <p className="font-poppins text-center mb-6 text-black text-base dark:text-gray-600">Back Office Management Portal</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-2 font-poppins text-black text-center">Admin Login</h1>
          <p className="font-poppins text-center mb-6 text-black text-base">Sign in to your admin account</p>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-poppins font-medium text-gray-700 dark:text-gray-200 mb-1">
                Username
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="outline-none w-full text-md font-poppins text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-7">
              <label htmlFor="password" className="block text-sm font-poppins font-medium text-gray-700 dark:text-gray-200 mb-1">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="outline-none w-full text-md font-poppins text-gray-700 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full font-poppins bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
            >
              Sign in
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;