import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, MoonIcon as LemonIcon, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <LemonIcon className="h-8 w-8 text-lemon-secondary" />
            <span className="font-heading text-xl font-bold text-lemon-primary">Little Lemon</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-lemon-dark hover:text-lemon-primary font-medium">
              Home
            </Link>
            <Link to="/menu" className="text-lemon-dark hover:text-lemon-primary font-medium">
              Menu
            </Link>
            <Link to="/booking" className="text-lemon-dark hover:text-lemon-primary font-medium">
              Book a Table
            </Link>
            
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 text-lemon-dark hover:text-lemon-primary font-medium"
                >
                  <User className="w-5 h-5" />
                  <span>{user?.firstName}</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl">
                    <Link
                      to="/bookings"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-lemon-dark focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-1 border-t mt-4 animate-slide-down">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-lemon-dark hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className="block px-3 py-2 rounded-md text-base font-medium text-lemon-dark hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Menu
            </Link>
            <Link
              to="/booking"
              className="block px-3 py-2 rounded-md text-base font-medium text-lemon-dark hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Book a Table
            </Link>
            
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-lemon-dark hover:bg-gray-100"
              >
                Sign out
              </button>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium bg-lemon-primary text-white"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;