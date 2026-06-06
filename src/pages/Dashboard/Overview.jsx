import React, { useState, useEffect } from 'react';
import {
  Package,
  Inbox,
  ShieldCheck,
  Clock,
  TrendingUp,
  MessageSquare,
  ArrowRight,
  Zap
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { dashboard, inquiries as inquiriesApi } from '../../lib/api';

export default function Overview({ setSubRoute }) {
  const [stats, setStats] = useState(null);
  const [recentInquiries, setRecentInquiries] = useState([]);

  useEffect(() => {
    dashboard.stats().then(setStats).catch(() => {});
    inquiriesApi.list().then((list) => setRecentInquiries(list.slice(0, 3))).catch(() => {});
  }, []);

  const totalGenerators  = stats?.totalGenerators  ?? '—';
  const totalInquiries   = stats?.totalInquiries   ?? '—';
  const pendingInquiries = stats?.pending          ?? '—';
  const resolvedInquiries = stats?.resolved        ?? 0;

  const COLORS = ['#3B82F6', '#FF5A1F', '#F59E0B'];

  const pieData = stats?.brandDistribution?.length
    ? stats.brandDistribution.map((b) => ({ name: b.brand, value: b.count }))
    : [{ name: 'YORC Sets', value: 1 }];

  const barData = stats?.monthlyInquiries?.length
    ? stats.monthlyInquiries
    : [];

  return (
    <div className="space-y-8 text-left">
      
      {/* Header Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center space-x-2">
            <Zap className="h-5 w-5 text-brand-orange" />
            <span>Dashboard Overview</span>
          </h1>
          <p className="text-xs text-slate-500">Real-time statistics of Kanokdam database, inquiries, and catalogue.</p>
        </div>
        
        {/* Quick Date Display */}
        <div className="text-xs text-slate-400 bg-slate-900 border border-white/5 py-1.5 px-3 rounded-lg font-mono">
          SYSTEM DATE: 2026-06-05
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Total Generators */}
        <div className="rounded-xl glass-card border border-white/5 p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Generator Models</span>
              <span className="block text-3xl font-black text-white">{totalGenerators}</span>
            </div>
            <div className="h-10 w-10 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center">
              <Package className="h-5 w-5" />
            </div>
          </div>
          <button 
            onClick={() => setSubRoute('inventory')}
            className="flex items-center space-x-1 text-[10px] font-bold text-blue-400 hover:text-white transition-colors mt-4"
          >
            <span>Manage Inventory</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* Card 2: Total Inquiries */}
        <div className="rounded-xl glass-card border border-white/5 p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Inquiry Leads</span>
              <span className="block text-3xl font-black text-white">{totalInquiries}</span>
            </div>
            <div className="h-10 w-10 rounded-lg bg-brand-orange/10 text-brand-orange border border-brand-orange/20 flex items-center justify-center">
              <Inbox className="h-5 w-5" />
            </div>
          </div>
          <button 
            onClick={() => setSubRoute('inquiries')}
            className="flex items-center space-x-1 text-[10px] font-bold text-brand-orange hover:text-white transition-colors mt-4"
          >
            <span>Manage Inquiries</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* Card 3: Pending Inquiries */}
        <div className="rounded-xl glass-card border border-white/5 p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Pending Quotes</span>
              <span className="block text-3xl font-black text-brand-orange">{pendingInquiries}</span>
            </div>
            <div className="h-10 w-10 rounded-lg bg-brand-amber/10 text-brand-amber border border-brand-amber/20 flex items-center justify-center">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="text-[10px] text-slate-500 font-semibold mt-4">
            {resolvedInquiries} Inquiries Resolved
          </div>
        </div>

        {/* Card 4: Active AMC Contracts */}
        <div className="rounded-xl glass-card border border-white/5 p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Active AMCs</span>
              <span className="block text-3xl font-black text-brand-green">12</span>
            </div>
            <div className="h-10 w-10 rounded-lg bg-green-500/10 text-brand-green border border-green-500/20 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="text-[10px] text-slate-500 font-semibold mt-4">
            Next renewal due: June 15
          </div>
        </div>

      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Bar Chart: Daily Quote Requests (Left 7 Columns) */}
        <div className="lg:col-span-7 rounded-xl border border-white/5 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
              <TrendingUp className="h-4 w-4 text-brand-orange" />
              <span>Weekly Request Flow</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-medium">Inquiry Submissions</span>
          </div>

          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="date" stroke="#64748B" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#131A2E', borderColor: 'rgba(255,255,255,0.08)', borderRadius: '8px' }}
                  labelStyle={{ color: '#94A3B8', fontSize: '11px', fontWeight: 'bold' }}
                  itemStyle={{ color: '#FF5A1F', fontSize: '11px' }}
                />
                <Bar dataKey="inquiries" fill="#FF5A1F" radius={[4, 4, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Product Popularity (Right 5 Columns) */}
        <div className="lg:col-span-5 rounded-xl border border-white/5 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
              <Zap className="h-4 w-4 text-brand-orange" />
              <span>Inquiry Distribution</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-medium">Interest Category</span>
          </div>

          <div className="h-[220px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#131A2E', borderColor: 'rgba(255,255,255,0.08)', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '11px' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span className="text-[10px] font-semibold text-slate-400">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Recent Activity / Inquiries Panel */}
      <div className="rounded-xl border border-white/5 bg-slate-900/60 p-5">
        <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
            <MessageSquare className="h-4 w-4 text-brand-orange" />
            <span>Recent Customer Inquiries</span>
          </h3>
          
          <button 
            onClick={() => setSubRoute('inquiries')}
            className="text-[10px] font-bold text-brand-orange hover:text-white transition-colors"
          >
            View All Inquiries
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-2.5">Customer / Company</th>
                <th className="py-2.5">Date</th>
                <th className="py-2.5">Product Interest</th>
                <th className="py-2.5">Capacity</th>
                <th className="py-2.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-slate-950/20 transition-colors">
                  <td className="py-3">
                    <span className="font-bold text-white block">{inq.name}</span>
                    <span className="text-[10px] text-slate-500">{inq.company || 'Private Customer'}</span>
                  </td>
                  <td className="py-3 font-mono text-slate-400">{new Date(inq.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 text-slate-300">{inq.generatorInterest}</td>
                  <td className="py-3 font-mono text-slate-400">{inq.capacityNeeded}</td>
                  <td className="py-3 text-right">
                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                      inq.status === 'Pending' ? 'bg-brand-amber/10 text-brand-amber' : 
                      inq.status === 'Contacted' ? 'bg-brand-blue/10 text-brand-blue' : 
                      'bg-green-500/10 text-brand-green'
                    }`}>
                      {inq.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
