import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { generators as generatorsApi, inquiries as inquiriesApi } from '../lib/api';

export default function Quote() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    capacityNeeded: '50kVA',
    generatorInterest: 'Select a type of Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [generators, setGenerators] = useState([]);

  useEffect(() => {
    generatorsApi.list().then(setGenerators).catch(() => {});
  }, []);

  // Ticker text
  const tickerItems = [
    "AUTOMATIC TRANSFER SWITCH",
    "LOW NOISE",
    "FUEL EFFICIENT",
    "5-YEAR WARRANTY"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await inquiriesApi.submit(formData);
      setSubmitted(true);
      setFormData({ name: '', company: '', email: '', phone: '', capacityNeeded: '50kVA', generatorInterest: 'Select a type of Inquiry', message: '' });
    } catch (err) {
      alert(err.message || 'Failed to submit. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full bg-white font-sans text-left">
      
      {/* 1. Hero Header */}
      <section className="relative w-full h-[calc(80vh-5rem)] flex items-center justify-center overflow-hidden bg-[#0A0E17]">
        <div 
          className="absolute inset-0 opacity-35 bg-cover bg-center bg-[url('/get-quote-bg.png')]"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17]/90 to-transparent"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6">
          <h1 className="font-noto text-3xl md:text-[4rem] font-extrabold uppercase tracking-tight text-white leading-tight">
            Power Solutions Built Around Your Needs
          </h1>
          <p className="font-noto text-base md:text-[1.5rem] font-medium text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We supply high-performance generators and genuine accessories designed to deliver dependable power in every environment. From backup systems to heavy-duty industrial generators, we help individuals and businesses find the right equipment with expert guidance and competitive pricing.
          </p>
        </div>
      </section>

      {/* 2. Scrolling Ticker Band */}
      <div className="w-full h-[5rem] bg-[#E5E7EB] flex items-center overflow-hidden border-y border-gray-200 select-none">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="font-noto flex items-center gap-[3rem] pr-[3rem] shrink-0 text-[1.875rem] font-extrabold uppercase text-[#1F2937] tracking-wider">
              {tickerItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  <span>{item}</span>
                  <span className="h-[1rem] w-[1rem] rounded-full bg-brand-red inline-block shrink-0"></span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Quote Form block */}
      <section className="w-full bg-[#05080E] text-white py-20 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column Text */}
            <div className="lg:col-span-5 space-y-4 pt-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase leading-tight">
                Request<br />A Quote..
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed font-semibold">
                Fill in your details and our team will get back to you with a tailored recommendation and pricing.
              </p>
            </div>

            {/* Right Column Form Card */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-[#0A0E17] border border-white/5 p-6 sm:p-8 shadow-2xl relative">
                
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-fade-in">
                    <CheckCircle2 className="h-16 w-16 text-brand-green" />
                    <h3 className="text-xl font-bold text-white">Quote Request Received!</h3>
                    <p className="text-xs text-gray-400 max-w-sm">
                      Thank you. A Kanokdam sales engineer has been notified and will prepare your quotation shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 rounded-lg bg-[#05080E] border border-white/10 hover:border-brand-red px-6 py-2.5 text-xs font-semibold text-white transition-colors"
                    >
                      Send another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 text-left text-xs">
                    
                    {/* Full Name */}
                    <div>
                      <label htmlFor="name" className="block font-bold text-gray-400 mb-2 uppercase tracking-wide">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Mr Teokase"
                        className="w-full rounded-lg bg-[#05080E] border border-white/10 p-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-red font-semibold"
                      />
                    </div>

                    {/* Email and Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block font-bold text-gray-400 mb-2 uppercase tracking-wide">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="alex@gmail.com"
                          className="w-full rounded-lg bg-[#05080E] border border-white/10 p-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-red font-semibold"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block font-bold text-gray-400 mb-2 uppercase tracking-wide">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+234000000..."
                          className="w-full rounded-lg bg-[#05080E] border border-white/10 p-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-red font-semibold font-mono"
                        />
                      </div>
                    </div>

                    {/* Inquiry Type and Company Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="generatorInterest" className="block font-bold text-gray-400 mb-2 uppercase tracking-wide">
                          Inquiry Type *
                        </label>
                        <select
                          name="generatorInterest"
                          id="generatorInterest"
                          value={formData.generatorInterest}
                          onChange={handleInputChange}
                          className="w-full rounded-lg bg-[#05080E] border border-white/10 p-3.5 text-white focus:outline-none focus:border-brand-red font-semibold"
                        >
                          <option value="Select a type of Inquiry" disabled>Select a type of Inquiry</option>
                          {generators.map((gen) => (
                            <option key={gen.id} value={gen.name}>{gen.name}</option>
                          ))}
                          <option value="Annual Maintenance Contract (AMC)">Annual Maintenance Contract (AMC)</option>
                          <option value="Electrical/Mechanical Engineering Works">Electrical/Mechanical Engineering Works</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="company" className="block font-bold text-gray-400 mb-2 uppercase tracking-wide">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="company"
                          id="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Company Name"
                          className="w-full rounded-lg bg-[#05080E] border border-white/10 p-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-red font-semibold"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block font-bold text-gray-400 mb-2 uppercase tracking-wide">
                        Detailed Message *
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        required
                        rows="5"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Detailed Message"
                        className="w-full rounded-lg bg-[#05080E] border border-white/10 p-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-red font-semibold resize-none"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-brand-red py-4 text-xs font-bold text-white shadow-lg transition-all duration-200 hover:bg-red-600 active:scale-[0.98] uppercase tracking-widest"
                    >
                      Submit Request
                    </button>

                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
