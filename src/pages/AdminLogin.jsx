import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { auth, saveToken } from '../lib/api';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]   = useState(false);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token } = await auth.login(email, password);
      saveToken(token);
      onLogin();
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05080E] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background glow blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] bg-brand-red/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-[320px] h-[320px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">

        {/* Card */}
        <div className="bg-[#0A0E17] border border-white/8 rounded-3xl p-8 sm:p-10 shadow-2xl">

          {/* Brand header */}
          <div className="flex flex-col items-center mb-10">
            <img src="/LOGO-white.svg" alt="Kanokdam Logo" className="h-14 w-auto mb-4" />
            <h1 className="font-noto text-xl font-black text-white tracking-tight">
              KANOKDAM
            </h1>
            <span className="font-noto text-xs font-bold text-brand-red uppercase tracking-widest mt-0.5">
              Admin Control Panel
            </span>
            <p className="font-noto text-xs text-slate-500 mt-3 text-center">
              Enter your credentials to access the dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="space-y-2">
              <label className="font-noto text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Email Address
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@kanokdamlimited.com"
                className="w-full bg-[#111827] border border-white/8 rounded-xl px-4 py-3.5 font-noto text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-red/50 focus:ring-1 focus:ring-brand-red/30 transition-all"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="font-noto text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full bg-[#111827] border border-white/8 rounded-xl px-4 py-3.5 pr-12 font-noto text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-red/50 focus:ring-1 focus:ring-brand-red/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(p => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-red-950/40 border border-red-500/20 rounded-xl px-4 py-3">
                <AlertCircle className="h-4 w-4 text-brand-red shrink-0" />
                <p className="font-noto text-xs text-red-400">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brand-red hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed py-4 font-noto text-sm font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Authenticating…</span>
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          {/* Footer note */}
          <p className="font-noto text-[10px] text-slate-600 text-center mt-8">
            Restricted access · Kanokdam Limited © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
