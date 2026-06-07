import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { generators as generatorsApi } from '../lib/api';

export default function Generators() {
  const navigate = useNavigate();
  const [generators, setGenerators] = useState([]);

  useEffect(() => {
    generatorsApi.list().then(data => setGenerators(Array.isArray(data) ? data : [])).catch(() => {});
  }, []);

  return (
    <>
      <Helmet>
        <title>Generator Products | Kanokdam Limited — YORC Soundproof Diesel Generators Nigeria</title>
        <meta name="description" content="Browse Kanokdam's full range of YORC soundproof diesel generators from 20kVA to 200kVA. Industrial-grade power solutions for businesses, estates, hospitals and factories across Nigeria." />
        <link rel="canonical" href="https://kanokdam.com/generators" />
        <meta property="og:title" content="Generator Products | Kanokdam Limited" />
        <meta property="og:description" content="Browse our full range of YORC soundproof diesel generators from 20kVA to 200kVA." />
        <meta property="og:url" content="https://kanokdam.com/generators" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://kanokdam.com/our-portfolio.png" />
      </Helmet>

      <div className="w-full bg-[#FFFFFF] font-sans text-left">

        <section className="relative w-full bg-cover bg-center min-h-[70vh]" style={{ backgroundImage: "url('/our-portfolio.png')" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/70" />
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-28 sm:py-36">
            <h1 className="font-noto text-5xl sm:text-6xl lg:text-7xl font-black text-brand-red uppercase leading-[1.05] tracking-tight mb-6">
              OUR POWER<br />PORTFOLIO
            </h1>
            <p className="font-noto text-sm sm:text-base text-white/90 font-semibold max-w-xl leading-relaxed">
              Explore our premium range of generating sets and critical accessories designed for long-term reliability and peak performance.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {generators.map((gen, idx) => {
              const staticImgMap = { 'sp-50': '/SP50.png', 'sp-60': '/SP60.png', 'accessories': '/accessories_bg.png' };
              const shuffled = idx % 2 === 0 ? '/SP50.png' : '/SP60.png';
              const cardImg = gen.images?.[0] || staticImgMap[gen.id] || shuffled;

              const features = gen.id === 'accessories'
                ? [
                    { label: 'ATS & Sync\nPanels', icon: <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9 mx-auto"><rect x="6" y="10" width="28" height="20" rx="3" stroke="#111827" strokeWidth="2.2"/><line x1="14" y1="10" x2="14" y2="30" stroke="#111827" strokeWidth="2"/><line x1="26" y1="10" x2="26" y2="30" stroke="#111827" strokeWidth="2"/><circle cx="20" cy="20" r="3" fill="#111827"/></svg> },
                    { label: 'Fuel Tanks\n& Piping', icon: <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9 mx-auto"><ellipse cx="20" cy="22" rx="12" ry="9" stroke="#111827" strokeWidth="2.2"/><path d="M20 13V8" stroke="#111827" strokeWidth="2.2" strokeLinecap="round"/><path d="M8 22H4M36 22h-4" stroke="#111827" strokeWidth="2" strokeLinecap="round"/></svg> },
                    { label: 'Spare Parts\n& Consumables', icon: <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9 mx-auto"><path d="M10 30L30 10" stroke="#111827" strokeWidth="2.2" strokeLinecap="round"/><circle cx="12" cy="12" r="5" stroke="#111827" strokeWidth="2.2"/><circle cx="28" cy="28" r="5" stroke="#111827" strokeWidth="2.2"/></svg> },
                  ]
                : [
                    { label: 'Available in popular\nkVA ratings', icon: <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9 mx-auto"><path d="M20 5l3.09 9.26H32l-7.27 5.28 2.77 8.52L20 23.4l-7.5 4.66 2.77-8.52L8 14.26h8.91z" stroke="#111827" strokeWidth="2" strokeLinejoin="round"/><path d="M14 28l-2 7M26 28l2 7M20 28v7" stroke="#111827" strokeWidth="2" strokeLinecap="round"/></svg> },
                    { label: 'Heavy Duty Fabricated\nSteel Base Frame', icon: <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9 mx-auto"><rect x="6" y="26" width="28" height="6" rx="2" stroke="#111827" strokeWidth="2.2"/><path d="M12 26V18c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v8" stroke="#111827" strokeWidth="2.2"/><path d="M16 16v-4a4 4 0 018 0v4" stroke="#111827" strokeWidth="2.2"/></svg> },
                    { label: 'Advanced COMAP\nControl Panels', icon: <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9 mx-auto"><circle cx="20" cy="20" r="13" stroke="#111827" strokeWidth="2.2"/><path d="M20 20l6-6" stroke="#111827" strokeWidth="2.2" strokeLinecap="round"/><circle cx="20" cy="20" r="2.5" fill="#111827"/><path d="M20 10v2M10 20h2M20 30v-2M30 20h-2" stroke="#111827" strokeWidth="2" strokeLinecap="round"/></svg> },
                  ];

              return (
                <div key={gen.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-64 sm:h-72 overflow-hidden">
                    <img src={cardImg} alt={gen.name} className="w-full h-full object-cover" onError={e => { e.currentTarget.src = '/SPGeneric.png'; }} />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
                      <svg className="w-3 h-3 text-brand-red shrink-0" viewBox="0 0 12 12" fill="currentColor"><circle cx="6" cy="6" r="5"/></svg>
                      <span className="font-noto text-[10px] font-bold uppercase tracking-wider text-gray-800">Peak Performance</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="font-noto text-xl sm:text-2xl font-black text-[#0B0F19] uppercase leading-tight mb-3">{gen.name}</h2>
                    <p className="font-noto text-sm text-gray-500 leading-relaxed line-clamp-3 mb-6">{gen.description}</p>
                    <hr className="border-gray-200 mb-6" />
                    <div className="grid grid-cols-3 divide-x divide-gray-200">
                      {features.map((feat, fi) => (
                        <div key={fi} className="flex flex-col items-center text-center px-2 gap-2">
                          {feat.icon}
                          <span className="font-noto text-[10px] sm:text-xs font-semibold text-gray-600 leading-snug whitespace-pre-line">{feat.label}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => navigate(`/generators/${gen.id}`)}
                      className="mt-6 w-full rounded-xl border border-gray-200 bg-[#F9FAFB] hover:bg-[#0A0E17] hover:text-white hover:border-[#0A0E17] py-3 text-xs font-extrabold text-gray-800 transition-all duration-200 font-noto uppercase tracking-wider"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-14">
            <button
              onClick={() => navigate('/quote')}
              className="flex items-center space-x-2 rounded-xl bg-[#0A0E17] text-white hover:bg-brand-red px-7 py-3.5 text-xs font-bold transition-all duration-200"
            >
              <span>Inquire For Custom Load Capacity</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
