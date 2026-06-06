import React, { useState, useEffect, Component } from 'react';
import { saveToken, clearToken } from './lib/api';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Generators from './pages/Generators';
import ProductDetails from './pages/ProductDetails';
import Quote from './pages/Quote';
import AdminLogin from './pages/AdminLogin';

import DashboardLayout from './components/DashboardLayout';
import Overview from './pages/Dashboard/Overview';
import Inventory from './pages/Dashboard/Inventory';
import Inquiries from './pages/Dashboard/Inquiries';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', color: '#f87171', background: '#0b0f19', minHeight: '100vh', fontFamily: 'sans-serif' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>Runtime Render Error</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>The application crashed during render. See traceback below:</p>
          <pre style={{ background: '#1e293b', padding: '16px', borderRadius: '8px', overflowX: 'auto', color: '#ef4444', fontSize: '13px' }}>
            {this.state.error?.toString()}
          </pre>
          <pre style={{ background: '#1e293b', padding: '16px', borderRadius: '8px', overflowX: 'auto', color: '#cbd5e1', fontSize: '11px', marginTop: '16px' }}>
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [route, setRoute]                       = useState('home');
  const [subRoute, setSubRoute]                 = useState('overview');
  const [selectedProductId, setSelectedProductId] = useState('sp-50');
  const [isAdminAuthed, setIsAdminAuthed]       = useState(false);

  // Scroll to top on route/subroute change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route, subRoute]);

  // Logout handler — clears auth and returns home
  const handleAdminLogout = () => {
    clearToken();
    setIsAdminAuthed(false);
    setRoute('home');
    setSubRoute('overview');
  };

  const renderContent = () => {
    // ── Admin: Login Gate ──────────────────────────────────────────
    if (route === 'admin-login') {
      if (isAdminAuthed) {
        // Already logged in — jump straight to dashboard
        setRoute('dashboard-main');
        return null;
      }
      return (
        <AdminLogin
          onLogin={() => {
            setIsAdminAuthed(true);
            setRoute('dashboard-main');
            setSubRoute('overview');
          }}
        />
      );
    }

    // ── Admin: Dashboard (protected) ───────────────────────────────
    if (route.startsWith('dashboard-')) {
      if (!isAdminAuthed) {
        // Redirect to login if not authenticated
        setRoute('admin-login');
        return null;
      }
      return (
        <DashboardLayout
          currentSubRoute={subRoute}
          setSubRoute={setSubRoute}
          setRoute={setRoute}
          onLogout={handleAdminLogout}
        >
          {subRoute === 'overview'   && <Overview setSubRoute={setSubRoute} />}
          {subRoute === 'inventory'  && <Inventory />}
          {subRoute === 'inquiries'  && <Inquiries />}
        </DashboardLayout>
      );
    }

    // ── Public Website ─────────────────────────────────────────────
    return (
      <div className="flex flex-col min-h-screen bg-white text-gray-800">
        <Navbar currentRoute={route} setRoute={setRoute} />

        <main className="flex-grow">
          {route === 'home' && (
            <Home setRoute={setRoute} setSelectedProductId={setSelectedProductId} />
          )}
          {route === 'about' && (
            <About setRoute={setRoute} />
          )}
          {route === 'products' && (
            <Generators setRoute={setRoute} setSelectedProductId={setSelectedProductId} />
          )}
          {route === 'product-details' && (
            <ProductDetails
              setRoute={setRoute}
              productId={selectedProductId}
              setSelectedProductId={setSelectedProductId}
            />
          )}
          {route === 'quote' && (
            <Quote />
          )}
        </main>

        <Footer setRoute={setRoute} />
      </div>
    );
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white font-sans antialiased">
        {renderContent()}
      </div>
    </ErrorBoundary>
  );
}

export default App;
