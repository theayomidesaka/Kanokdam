import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Package, Inbox, ArrowLeft, Menu, X, LogOut } from 'lucide-react';

export default function DashboardLayout({ onLogout, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Overview',       path: '/dashboard/overview',  icon: LayoutDashboard },
    { label: 'Products',       path: '/dashboard/inventory', icon: Package },
    { label: 'Quote Requests', path: '/dashboard/inquiries', icon: Inbox },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate('/');
  };

  const currentLabel = menuItems.find(item => isActive(item.path))?.label || 'Dashboard';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex relative overflow-hidden">

      <div className="absolute top-0 left-0 h-[300px] w-[300px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-white/5 z-20 shrink-0 select-none">
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <img src="/LOGO-white.svg" alt="Kanokdam Logo" className="h-8 w-auto" />
        </div>

        <div className="p-4 border-b border-white/5 bg-slate-950/20">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-xs font-bold text-brand-orange uppercase">
              AD
            </div>
            <div>
              <span className="block text-xs font-bold text-white">System Admin</span>
              <span className="text-[10px] text-slate-500 font-medium">admin@kanokdam.com</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive(item.path)
                    ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/15'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <Link
            to="/"
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border border-white/5 bg-slate-950 hover:bg-slate-950/80 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-red/10 hover:bg-brand-red text-xs font-bold text-brand-red hover:text-white transition-all"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-30 md:hidden transition-all duration-300 ${
          sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar (Mobile) */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-slate-900 border-r border-white/5 z-40 flex flex-col md:hidden transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
          <img src="/LOGO-white.svg" alt="Kanokdam Logo" className="h-8 w-auto" />
          <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 border-b border-white/5">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-brand-orange uppercase">
              AD
            </div>
            <div>
              <span className="block text-xs font-bold text-white">System Admin</span>
              <span className="text-[10px] text-slate-500">admin@kanokdam.com</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                  isActive(item.path)
                    ? 'bg-brand-orange text-white'
                    : 'text-slate-400 hover:bg-white/5'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <Link
            to="/"
            onClick={() => setSidebarOpen(false)}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border border-white/5 bg-slate-950 text-xs font-semibold text-slate-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Site</span>
          </Link>
          <button
            onClick={() => { handleLogout(); setSidebarOpen(false); }}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-red/10 hover:bg-brand-red text-xs font-bold text-brand-red hover:text-white transition-all"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-slate-900 border-b border-white/5 flex items-center justify-between px-6 z-10">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-slate-400 hover:text-white md:hidden focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 hidden sm:block">
              {currentLabel} Management
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              Server status: <span className="text-brand-green font-bold">ONLINE</span>
            </span>
            <div className="h-4 w-px bg-white/5 hidden sm:block"></div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1.5 text-xs font-bold text-slate-400 hover:text-brand-red transition-colors"
            >
              <LogOut className="h-4 w-4 text-brand-red" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto relative">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
