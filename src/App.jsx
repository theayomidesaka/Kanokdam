import React, { useState, useEffect, Component } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { clearToken } from './lib/api';

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
    console.error('ErrorBoundary caught an error', error, errorInfo);
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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

function PrivateRoute({ isAuthed, children }) {
  return isAuthed ? children : <Navigate to="/admin" replace />;
}

function App() {
  const [isAdminAuthed, setIsAdminAuthed] = useState(false);

  const handleAdminLogout = () => {
    clearToken();
    setIsAdminAuthed(false);
  };

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <div className="min-h-screen bg-white font-sans antialiased">
        <Routes>
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/generators" element={<PublicLayout><Generators /></PublicLayout>} />
          <Route path="/generators/:id" element={<PublicLayout><ProductDetails /></PublicLayout>} />
          <Route path="/quote" element={<PublicLayout><Quote /></PublicLayout>} />

          <Route path="/admin" element={
            isAdminAuthed
              ? <Navigate to="/dashboard/overview" replace />
              : <AdminLogin onLogin={() => setIsAdminAuthed(true)} />
          } />

          <Route path="/dashboard/*" element={
            <PrivateRoute isAuthed={isAdminAuthed}>
              <DashboardLayout onLogout={handleAdminLogout}>
                <Routes>
                  <Route path="overview"   element={<Overview />} />
                  <Route path="inventory"  element={<Inventory />} />
                  <Route path="inquiries"  element={<Inquiries />} />
                  <Route path="*"          element={<Navigate to="overview" replace />} />
                </Routes>
              </DashboardLayout>
            </PrivateRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
