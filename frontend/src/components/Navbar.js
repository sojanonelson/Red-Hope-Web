import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userService';
import { Bell } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [hasNotifications, setHasNotifications] = useState(true); // Simulating notifications

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          const userData = await getUser(storedUser._id);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              <span className="text-red-600">Red</span> Hope
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:justify-between md:flex-1 md:ml-10">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-gray-800 hover:text-red-600 font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-red-600 pb-1">
                HOME
              </Link>
              <Link to="/about" className="text-gray-800 hover:text-red-600 font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-red-600 pb-1">
                ABOUT US
              </Link>
              {user && user.role === "donor" && (
                <Link to="/DonateBlood" className="text-gray-800 hover:text-red-600 font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-red-600 pb-1">
                  DONATE BLOOD
                </Link>
              )}
              {user && user.role === "recipient" && (
                <Link to="/LookingBlood" className="text-gray-800 hover:text-red-600 font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-red-600 pb-1">
                  LOOKING FOR BLOOD
                </Link>
              )}
               {user && user.role === "recipient" && (
                <Link to="/service-history" className="text-gray-800 hover:text-red-600 font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-red-600 pb-1">
                  SERVICE HISTORY
                </Link>
              )}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-800 font-medium">{user.name}</span>
                  <div className="relative">
                    <Bell className="w-6 h-6 text-gray-800 hover:text-red-600 cursor-pointer" />
                    {hasNotifications && (
                      <span className="absolute top-0 right-0 block h-2 w-2 bg-red-600 rounded-full"></span>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200">
                      Log in
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors duration-200">
                      Sign up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 focus:outline-none"
              aria-expanded={isMenuOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;