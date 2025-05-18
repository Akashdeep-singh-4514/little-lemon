import { Link } from 'react-router-dom';
import { MoonIcon as LemonIcon, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-lemon-dark text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <LemonIcon className="h-8 w-8 text-lemon-secondary" />
              <span className="font-heading text-xl font-bold">Little Lemon</span>
            </Link>
            <p className="mt-4 text-gray-400">
              A family-owned Mediterranean restaurant focused on traditional recipes with a modern twist.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-medium mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-400 hover:text-white transition">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-400 hover:text-white transition">
                  Reservations
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>123 Main Street</li>
              <li>Chicago, IL 60614</li>
              <li>Tel: (123) 456-7890</li>
              <li>Email: info@littlelemon.com</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-medium mb-4">Opening Hours</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Monday - Friday: 11:00am - 10:00pm</li>
              <li>Saturday: 10:00am - 11:00pm</li>
              <li>Sunday: 10:00am - 9:00pm</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Little Lemon Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;