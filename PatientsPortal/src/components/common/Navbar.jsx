import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Stethoscope } from 'lucide-react';

function Navbar({ onMenuClick }) {
  return (
    <nav className="bg-cyan-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl lg:max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={onMenuClick}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-shrink-0 flex items-center mx-4">
              <Link to="/" className="flex items-center">
                <Stethoscope className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold text-primary-800">Patient Portal</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-3 relative">
              <div className="flex items-center">
                <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                  Dr. John Doe
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
