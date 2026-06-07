import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home',     to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Products', to: '/generators' },
  ];

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[6.25rem] items-center justify-between">

          <Link to="/" className="flex cursor-pointer items-center">
            <img src="/LOGO.svg" alt="KANOKDAM" className="h-8 w-auto block" />
          </Link>

          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-noto text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-brand-red ${
                  isActive(link.to) ? 'text-brand-red' : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center space-x-1 text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-lg"
              title="Admin Panel"
            >
              <Shield className="h-4 w-4" />
            </button>
            <Link
              to="/quote"
              className="font-noto flex items-center justify-center h-[3.375rem] rounded-[1.25rem] bg-brand-red px-6 text-sm font-bold text-white shadow-md shadow-brand-red/10 transition-all duration-200 hover:bg-red-600 active:scale-95"
            >
              Get a Quote
            </Link>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`fixed inset-x-0 top-[6.25rem] z-40 border-b border-gray-200 bg-white p-6 shadow-xl transition-all duration-300 md:hidden ${
        isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
      }`}>
        <div className="flex flex-col space-y-4 text-left">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`font-noto text-base font-semibold py-2 transition-colors ${
                isActive(link.to) ? 'text-brand-red' : 'text-gray-700 hover:text-brand-red'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-gray-100 my-2"></div>
          <div className="flex flex-col space-y-3">
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="font-noto flex items-center justify-center space-x-2 w-full text-sm font-semibold text-gray-500 py-3 rounded-lg border border-gray-100 bg-gray-50"
            >
              <Shield className="h-4 w-4" />
              <span>Admin Control Panel</span>
            </Link>
            <Link
              to="/quote"
              onClick={() => setIsOpen(false)}
              className="font-noto flex items-center justify-center space-x-2 w-full h-[3.375rem] rounded-[1.25rem] bg-brand-red text-sm font-bold text-white shadow-lg"
            >
              <span>Get a Quote</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
