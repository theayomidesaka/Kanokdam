import React, { useState } from 'react';
import { Mail, Phone, Building, Calendar, Inbox, CheckCircle, Trash2, Eye, X, Filter } from 'lucide-react';
import { getStoredData, setStoredData, initialInquiries } from '../../data/mockData';

export default function Inquiries() {
  const [inquiries, setInquiries] = useState(() => 
    getStoredData('kanokdam_inquiries_v2', initialInquiries)
  );

  const [activeInq, setActiveInq] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [successMsg, setSuccessMsg] = useState('');

  // Status handler
  const handleStatusChange = (id, newStatus) => {
    const updated = inquiries.map(inq => 
      inq.id === id ? { ...inq, status: newStatus } : inq
    );
    setInquiries(updated);
    setStoredData('kanokdam_inquiries_v2', updated);
    
    // Update active inquiry detail view if open
    if (activeInq && activeInq.id === id) {
      setActiveInq(prev => ({ ...prev, status: newStatus }));
    }
    
    showNotification(`Inquiry status updated to ${newStatus}.`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry? This cannot be undone.")) {
      const updated = inquiries.filter(inq => inq.id !== id);
      setInquiries(updated);
      setStoredData('kanokdam_inquiries_v2', updated);
      
      if (activeInq && activeInq.id === id) {
        setActiveInq(null);
      }
      showNotification("Inquiry deleted successfully.");
    }
  };

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Filtered inquiries
  const filteredInquiries = inquiries.filter(inq => 
    filterStatus === 'All' || inq.status === filterStatus
  );

  return (
    <div className="space-y-6 text-left relative">
      
      {/* Toast Notification */}
      {successMsg && (
        <div className="fixed top-24 right-6 z-50 rounded-xl bg-slate-900 border border-brand-green/30 p-4 shadow-xl flex items-center space-x-3 animate-slide-down">
          <CheckCircle className="h-5 w-5 text-brand-green" />
          <span className="text-xs font-semibold text-white">{successMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center space-x-2">
            <Inbox className="h-5 w-5 text-brand-orange" />
            <span>Customer Inquiries</span>
          </h1>
          <p className="text-xs text-slate-500">View and respond to customer quotes and maintenance request forms from the website.</p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-slate-500 shrink-0" />
          <div className="flex space-x-1 border border-white/5 bg-slate-900 p-1 rounded-lg">
            {['All', 'Pending', 'Contacted', 'Resolved'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-md transition-colors ${
                  filterStatus === status 
                    ? 'bg-brand-orange text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inquiries Table list */}
      <div className="rounded-xl border border-white/5 bg-slate-900/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 bg-slate-900/60 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="p-4">Customer</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Requested Item</th>
                <th className="p-4">Capacity</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-slate-950/20 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-white block">{inq.name}</span>
                    <span className="text-[10px] text-slate-500 flex items-center space-x-1 mt-0.5">
                      <Building className="h-3 w-3 shrink-0" />
                      <span>{inq.company || 'Private Customer'}</span>
                    </span>
                  </td>
                  <td className="p-4 space-y-0.5">
                    <span className="text-slate-400 block">{inq.email}</span>
                    <span className="text-slate-500 font-mono">{inq.phone}</span>
                  </td>
                  <td className="p-4 text-slate-300 font-medium">{inq.generatorInterest}</td>
                  <td className="p-4 font-mono text-brand-orange font-semibold">{inq.capacityNeeded}</td>
                  <td className="p-4 text-slate-400 font-mono">{inq.date}</td>
                  <td className="p-4">
                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                      inq.status === 'Pending' ? 'bg-brand-amber/10 text-brand-amber border border-brand-amber/20' : 
                      inq.status === 'Contacted' ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20' : 
                      'bg-green-500/10 text-brand-green border border-brand-green/20'
                    }`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setActiveInq(inq)}
                        className="p-1.5 rounded-lg border border-white/5 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-800 transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(inq.id)}
                        className="p-1.5 rounded-lg border border-white/5 bg-slate-900 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredInquiries.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-500">
                    No customer inquiries match selected filter status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal Overlay */}
      {activeInq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-5">
            {/* Close */}
            <button
              onClick={() => setActiveInq(null)}
              className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="border-b border-white/5 pb-3">
              <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                activeInq.status === 'Pending' ? 'bg-brand-amber/10 text-brand-amber' : 
                activeInq.status === 'Contacted' ? 'bg-brand-blue/10 text-brand-blue' : 
                'bg-green-500/10 text-brand-green'
              }`}>
                {activeInq.status} Inquiry
              </span>
              <h3 className="text-lg font-bold text-white mt-2">Inquiry Details</h3>
              <p className="text-slate-500 text-xs">Submitted on {activeInq.date}</p>
            </div>

            {/* Content info card */}
            <div className="space-y-4 text-xs">
              
              {/* Contact Block */}
              <div className="rounded-xl bg-slate-950 border border-white/5 p-4 space-y-2">
                <div className="flex items-center space-x-2 text-white font-bold text-sm">
                  <span>{activeInq.name}</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400 pt-2 border-t border-white/5">
                  <div className="flex items-center space-x-2">
                    <Building className="h-3.5 w-3.5 text-brand-orange shrink-0" />
                    <span>{activeInq.company || 'Private Customer'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-3.5 w-3.5 text-brand-orange shrink-0" />
                    <span>Received: {activeInq.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-3.5 w-3.5 text-brand-orange shrink-0" />
                    <span>{activeInq.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-3.5 w-3.5 text-brand-orange shrink-0" />
                    <span className="font-mono">{activeInq.phone}</span>
                  </div>
                </div>
              </div>

              {/* Requirement Details */}
              <div className="grid grid-cols-2 gap-3 text-slate-400">
                <div className="rounded-lg bg-slate-950 border border-white/5 p-3">
                  <span className="block text-[10px] text-slate-500 font-bold uppercase mb-0.5">Product Interest</span>
                  <span className="text-white font-semibold">{activeInq.generatorInterest}</span>
                </div>
                <div className="rounded-lg bg-slate-950 border border-white/5 p-3">
                  <span className="block text-[10px] text-slate-500 font-bold uppercase mb-0.5">KVA Capacity</span>
                  <span className="text-brand-orange font-bold font-mono">{activeInq.capacityNeeded}</span>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Customer Message</span>
                <div className="rounded-lg bg-slate-950 border border-white/5 p-4 text-slate-300 leading-relaxed max-h-40 overflow-y-auto">
                  {activeInq.message || 'No message provided.'}
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="border-t border-white/5 pt-4">
              <span className="text-[10px] text-slate-500 font-bold uppercase block mb-3">Update Status</span>
              
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleStatusChange(activeInq.id, 'Pending')}
                  className={`rounded-lg py-2.5 text-xs font-bold transition-all border ${
                    activeInq.status === 'Pending' 
                      ? 'bg-brand-amber text-slate-950 border-transparent shadow' 
                      : 'border-white/5 text-slate-400 hover:text-white hover:bg-slate-950'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => handleStatusChange(activeInq.id, 'Contacted')}
                  className={`rounded-lg py-2.5 text-xs font-bold transition-all border ${
                    activeInq.status === 'Contacted' 
                      ? 'bg-brand-blue text-white border-transparent shadow' 
                      : 'border-white/5 text-slate-400 hover:text-white hover:bg-slate-950'
                  }`}
                >
                  Contacted
                </button>
                <button
                  onClick={() => handleStatusChange(activeInq.id, 'Resolved')}
                  className={`rounded-lg py-2.5 text-xs font-bold transition-all border ${
                    activeInq.status === 'Resolved' 
                      ? 'bg-brand-green text-slate-950 border-transparent shadow' 
                      : 'border-white/5 text-slate-400 hover:text-white hover:bg-slate-950'
                  }`}
                >
                  Resolved
                </button>
              </div>

              <div className="flex space-x-3 mt-4 pt-4 border-t border-white/5">
                <button
                  onClick={() => handleDelete(activeInq.id)}
                  className="flex-1 rounded-lg border border-red-500/20 hover:border-red-500 hover:bg-red-500/5 py-2.5 text-xs font-semibold text-red-400 transition-colors"
                >
                  Delete Record
                </button>
                <button
                  onClick={() => setActiveInq(null)}
                  className="flex-1 rounded-lg bg-slate-950 hover:bg-slate-900 border border-white/5 py-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  Close View
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
