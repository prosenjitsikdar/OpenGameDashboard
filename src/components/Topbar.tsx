import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { User, Moon, Sun } from 'lucide-react';
import { Url } from '../routes/Routes';
import {
    LockClosedIcon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Topbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    // Apply saved theme on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' && !isDarkMode) {
            toggleTheme(); // Sync context if saved theme is dark
            document.documentElement.classList.add('dark');
        } else if (savedTheme === 'light' && isDarkMode) {
            toggleTheme(); // Sync context if saved theme is light
            document.documentElement.classList.remove('dark');
        }
    }, []); // Empty dependency array to run once on mount

    const handleThemeToggle = () => {
        toggleTheme();
        const newTheme = !isDarkMode ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme); // Save theme
        document.documentElement.classList.toggle('dark', !isDarkMode);
    };


    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center h-16 transition-shadow ${isDarkMode ? 'dark:bg-gray-800' : 'bg-white'
                } ${scrolled ? 'shadow' : ''}`}
        >
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white">
                    <span className="font-bold text-xl">S</span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-my">Sport Admin</h1>
            </div>

            <nav className="flex items-center space-x-1 md:space-x-3">
                <button
                    className="inline-flex items-center cursor-pointer font-poppins px-2 md:px-4 text-[13px] md:text-[16px] py-1 md:py-2 rounded-md text-white bg-green-600 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-300 transition"
                    onClick={() => {
                        setLoading(true);
                        setTimeout(() => setLoading(false), 1000);
                    }}
                >
                    {loading && (
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                    )}
                    Back Admin
                </button>

                {/* Theme Toggle */}
                <button
                    onClick={handleThemeToggle}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    title={isDarkMode ? 'Light mode' : 'Dark mode'}
                >
                    {isDarkMode ? (
                        <Sun size={20} className='text-my' />
                    ) : (
                        <Moon size={20} className='text-my' />
                    )}
                </button>

                {/* Profile Dropdown */}
                {isAuthenticated ? (
                    <div className="relative" ref={profileRef}>
                        <button className="flex items-center space-x-2 cursor-pointer" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
                            <div className="hidden md:block text-right">
                                <div className="text-sm font-medium font-poppins text-my">Admin User</div>
                                <div className="text-xs opacity-75 font-poppins text-my">Administrator</div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                <User size={16} />
                            </div>
                        </button>
                        {showProfileDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-1">
                                <Link to={Url.ChangePassword}
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => setShowProfileDropdown(false)}
                                >
                                    <LockClosedIcon className="w-5 h-5 mr-2" />
                                    Password
                                </Link>
                                <button
                                    onClick={() => {
                                        setShowProfileDropdown(false);
                                        logout();
                                    }}
                                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
                        Login
                    </Link>
                )}
            </nav>
        </motion.header>
    );
};

export default Topbar;