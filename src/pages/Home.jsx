import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ChevronDown, CheckCircle } from 'lucide-react';
import { services } from '../data/mockData';
import { generators as generatorsApi } from '../lib/api';

export default function Home() {
  const navigate = useNavigate();
  const [generators, setGenerators] = useState([]);

  useEffect(() => {
    generatorsApi.list().then(data => setGenerators(Array.isArray(data) ? data : [])).catch(() => {});
  }, []);

  const featuredIds = ['sp-50', 'sp-60', 'accessories'];
  const seenIds = new Set();
  const featured = generators.filter(gen => {
    if (!gen || !gen.id || !featuredIds.includes(gen.id)) return false;
    if (seenIds.has(gen.id)) return false;
    seenIds.add(gen.id);
    return gen.name && gen.description;
  });

  const getFeaturedCardDetails = (id, defaultName, defaultDesc) => {
    switch (id) {
      case 'sp-50': return { title: 'KANOKDAMYORC SP50', desc: 'Affordability meets performance at its peak. YORC generating sets are engineered for demanding industrial environments, offering high power output and robust reliability.' };
      case 'sp-60': return { title: 'KANOKDAMYORC SP60', desc: 'Dependable and trusted worldwide, Perkins engines offer unparalleled longevity and efficient performance, ideal for critical power backup solutions.' };
      case 'accessories': return { title: 'ACCESSORIES', desc: 'Affordability meets performance at its peak. YORC generating sets are engineered for demanding industrial environments, offering high power output and robust reliability.' };
      default: return { title: defaultName, desc: defaultDesc };
    }
  };

  const tickerItems = ["AUTOMATIC TRANSFER SWITCH", "LOW NOISE", "FUEL EFFICIENT", "5-YEAR WARRANTY"];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Kanokdam Limited",
    "description": "Kanokdam Limited specializes in premium diesel and gas soundproof generators (YORC), mechanical & electrical engineering works, installations, and Annual Maintenance Contracts (AMC).",
    "url": "https://kanokdam.com",
    "telephone": "+2349150111122",
    "email": "support@kanokdamlimited.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1 Uwa Close, Off Akingbola Street, Oregun",
      "addressLocality": "Lagos",
      "addressCountry": "NG"
    },
    "openingHours": "Mo-Fr 08:00-19:00",
    "sameAs": []
  };

  return (
    <>
      <Helmet>
        <title>Kanokdam Limited | Industrial Power Generation & Engineering Nigeria</title>
        <meta name="description" content="Kanokdam Limited — Nigeria's trusted source for premium YORC soundproof diesel generators, electrical engineering works, installations, and Annual Maintenance Contracts (AMC). Power without limit." />
        <meta name="keywords" content="Kanokdam, YORC Generators, Soundproof Generators, Diesel Generators Nigeria, Generator Lagos, AMC, Mechanical Engineering, Power Solutions Nigeria" />
        <link rel="canonical" href="https://kanokdam.com/" />
        <meta property="og:title" content="Kanokdam Limited | Industrial Power Generation & Engineering" />
        <meta property="og:description" content="Premium YORC soundproof diesel generators and engineering services across Nigeria. Power without limit." />
        <meta property="og:url" content="https://kanokdam.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://kanokdam.com/hero_bg.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kanokdam Limited | Power Without Limit" />
        <meta name="twitter:description" content="Premium YORC soundproof diesel generators and engineering services across Nigeria." />
        <meta name="twitter:image" content="https://kanokdam.com/hero_bg.png" />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      <div className="w-full bg-[#FFFFFF] font-sans text-left">

        {/* 1. Hero Section */}
        <section className="relative w-full h-[calc(100vh-11.25rem)] flex items-center justify-center overflow-hidden bg-[#0A0E17]">
          <div className="absolute inset-0 opacity-40 bg-cover bg-center bg-[url('/hero_bg.png')] mix-blend-luminosity"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#05080E] via-[#0A0E17]/80 to-transparent"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
            <h1 className="font-noto text-4xl sm:text-[8.75rem] font-extrabold uppercase tracking-tight text-white leading-none">
              POWER<br />WITHOUT<br />LIMIT
            </h1>
            <p className="text-[1.5rem] text-white max-w-3xl mx-auto leading-relaxed font-medium">
              Industrial-grade power solutions engineered for the most demanding environments on Earth. Precision-built for absolute continuity in the digital age.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/quote')}
                className="rounded-[1.25rem] bg-brand-red px-8 py-3.5 text-[1.25rem] font-medium text-white shadow-lg shadow-brand-red/20 transition-all duration-200 hover:bg-red-600 active:scale-95 flex items-center space-x-2 mx-auto"
              >
                <span>Let's Discuss your Solutions</span>
                <img src="/arrow-right-circle.svg" alt="Arrow" className="h-6 w-6 block ml-1" />
              </button>
            </div>
          </div>
        </section>

        {/* 2. Infinite Ticker Band */}
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

        {/* 3. Featured Generators */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 bg-white">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-14">
            <h2 className="font-noto text-4xl sm:text-[3.375rem] font-extrabold text-[#E53E3E] uppercase tracking-tight leading-none">
              Featured<br />Generators
            </h2>
            <p className="font-noto text-[1.5rem] font-medium text-[#121827] leading-relaxed">
              Silent operation and seamless logistics guaranteed, wherever your project is located.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((gen) => (
              <div key={gen.id} className="h-full rounded-[1.75rem] border border-gray-200 bg-[#EAEAEA] overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300 relative">
                <div className="absolute top-6 left-6 rounded-full border border-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0A0E17]/45 backdrop-blur-[2px] z-10">
                  {gen.id === 'accessories' ? 'PEAK PERFORMANCE' : '5-YEAR WARRANTY'}
                </div>
                <div className="h-72 w-full relative overflow-hidden bg-gray-200">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${
                    gen.id === 'accessories' ? '/accessories_bg.png' : gen.id === 'sp-50' ? '/sp50-1.jpg' : '/sp60-1.jpg'
                  })` }}></div>
                </div>
                <div className="p-8 text-left flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="font-noto text-[1.875rem] font-extrabold text-[#121827] uppercase tracking-tight leading-none">
                      {getFeaturedCardDetails(gen.id, gen.name, gen.description).title}
                    </h3>
                    <p className="font-noto text-[0.75rem] font-normal text-[#121827]/85 mt-4 leading-relaxed line-clamp-4 min-h-[4.5rem]">
                      {getFeaturedCardDetails(gen.id, gen.name, gen.description).desc}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-0 text-center items-start pt-6 border-t border-gray-300">
                    <div className="px-1 border-r border-gray-300 flex flex-col items-center justify-between min-h-[5.5rem]">
                      <div className="flex-1 flex items-center justify-center">
                        <img src="/rating-rate.svg" alt="Rating" className="h-8 w-8 mx-auto" />
                      </div>
                      <span className="font-noto text-[10px] font-bold leading-tight text-[#121827] uppercase tracking-tight mt-3">Available in popular KVA ratings</span>
                    </div>
                    <div className="px-1 border-r border-gray-300 flex flex-col items-center justify-between min-h-[5.5rem]">
                      <div className="flex-1 flex items-center justify-center">
                        <img src="/forging.svg" alt="Base Frame" className="h-8 w-8 mx-auto" />
                      </div>
                      <span className="font-noto text-[10px] font-bold leading-tight text-[#121827] uppercase tracking-tight mt-3">Heavy Duty Fabricated Steel Base Frame</span>
                    </div>
                    <div className="px-1 flex flex-col items-center justify-between min-h-[5.5rem]">
                      <div className="flex-1 flex items-center justify-center">
                        <img src="/control-knobs.svg" alt="Control Panel" className="h-8 w-8 mx-auto" />
                      </div>
                      <span className="font-noto text-[10px] font-bold leading-tight text-[#121827] uppercase tracking-tight mt-3">Advanced COMAP Control Panels</span>
                    </div>
                  </div>
                  <div className="flex justify-center pt-2">
                    <button
                      onClick={() => navigate(`/generators/${gen.id}`)}
                      className="font-noto w-full max-w-[15rem] rounded-full border border-[#121827] bg-transparent py-4 text-base font-bold text-[#121827] uppercase tracking-wider transition-all duration-200 hover:bg-[#121827] hover:text-[#EAEAEA] active:scale-95 cursor-pointer text-center"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <button
              onClick={() => navigate('/generators')}
              className="font-noto flex items-center space-x-2 rounded-[1.25rem] bg-[#0A0E17] text-white hover:bg-brand-red px-6 py-3.5 text-[1rem] font-medium transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <span>Explore More Products</span>
              <img src="/arrow-right-circle-red.svg" alt="Arrow" className="h-5 w-5 block ml-1" />
            </button>
          </div>
        </section>

        {/* 4. Built Different, Runs Longer */}
        <section className="w-full text-white py-24 border-t border-white/5" style={{ backgroundColor: 'hsla(223, 37%, 11%, 1)' }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-6 flex justify-center items-center lg:pr-16 lg:border-r lg:border-white/10">
                <img src="/build-different-last-longer.jpg" alt="Industrial Machine" className="w-full h-auto object-cover rounded-[2rem] shadow-2xl" />
              </div>
              <div className="lg:col-span-6 text-left lg:pl-4 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <img src="/thunder-bolt.svg" alt="⚡" className="h-5 w-[18px]" />
                    <span className="font-noto text-xs font-bold text-brand-red uppercase tracking-wider">WHY KANOKDAM</span>
                  </div>
                  <h2 className="font-noto text-4xl sm:text-[3.5rem] font-extrabold uppercase tracking-tight text-white leading-none">
                    BUILT DIFFERENT.<br />RUNS LONGER.
                  </h2>
                </div>
                <div className="border-t border-white/20 pt-4">
                  {[
                    { num: "01", title: "AUTOMATIC TRANSFER SWITCH", desc: "Switches to backup power within 10 seconds of grid failure. Zero manual intervention needed your operations never pause." },
                    { num: "02", title: "SMART FUEL MANAGEMENT", desc: "Adaptive load sensing optimizes fuel consumption in real time, delivering up to 40% better fuel economy versus standard generators." },
                    { num: "03", title: "REMOTE MONITORING DASHBOARD", desc: "Monitor output, fuel levels, and system health from your phone. Get alerts before problems become failures." }
                  ].map((item, index) => (
                    <div key={item.num} className={`py-6 ${index !== 2 ? 'border-b border-white/20' : ''}`}>
                      <div className="flex items-start">
                        <span className="font-noto text-lg sm:text-[1.25rem] font-bold text-cyan-400 mr-4 mt-[3px] leading-none shrink-0">{item.num}</span>
                        <div className="flex-1 space-y-2">
                          <h4 className="font-noto text-[1.125rem] sm:text-[1.25rem] font-extrabold text-white tracking-wide uppercase leading-none">{item.title}</h4>
                          <p className="font-noto text-[0.875rem] text-white/80 leading-relaxed font-normal max-w-xl">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Our Core Capabilities */}
        <section className="w-full bg-[#EAEAEA] py-24 border-t border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
              <h2 className="font-noto text-4xl sm:text-[3.375rem] font-extrabold text-[#E53E3E] uppercase tracking-tight leading-none">
                OUR CORE<br />CAPABILITIES
              </h2>
              <p className="font-noto text-[1.125rem] font-medium text-[#121827] leading-relaxed max-w-lg mx-auto">
                Global reliability built on decades of trusted performance and robust engineering.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              <div className="h-full bg-white rounded-[1.75rem] overflow-hidden border border-gray-100 shadow-sm flex flex-col justify-between">
                <div className="h-[26rem] overflow-hidden relative bg-gray-200">
                  <img src="/diesel-and-gas-sales-expert.jpg" alt="Diesel & Gas Generator Expert" className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="flex justify-between items-start">
                    <h3 className="font-noto text-[1.5rem] font-extrabold text-[#111827] uppercase tracking-tight leading-tight">
                      DIESEL & GAS<br />GENERATOR EXPERT
                    </h3>
                    <button onClick={() => navigate('/about')} className="text-[#E53E3E] hover:scale-110 transition-transform cursor-pointer">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                  <p className="font-noto text-[0.875rem] text-[#121827]/85 font-medium leading-relaxed">
                    Specializing in Dependable Perkins and High-Performance YORC generating sets. We guarantee reliable, clean power for all applications.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-8 justify-between">
                <div className="bg-white rounded-[1.75rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between space-y-16 flex-1">
                  <div className="flex justify-between items-start">
                    <img src="/delivery-truck.svg" alt="Logistics" className="h-10 w-auto" />
                    <button onClick={() => navigate('/about')} className="text-[#E53E3E] hover:scale-110 transition-transform cursor-pointer">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-noto text-[1.5rem] font-extrabold text-[#111827] uppercase tracking-tight leading-none">LOGISTICS & INSTALLATION</h3>
                    <p className="font-noto text-[0.875rem] text-[#121827]/85 font-medium leading-relaxed">Full nationwide delivery available with seamless, professional installation and setup.</p>
                  </div>
                </div>
                <div className="bg-white rounded-[1.75rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between space-y-16 flex-1">
                  <div className="flex justify-between items-start">
                    <img src="/maintenance-plan.svg" alt="Maintenance" className="h-10 w-auto" />
                    <button onClick={() => navigate('/about')} className="text-[#E53E3E] hover:scale-110 transition-transform cursor-pointer">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-noto text-[1.5rem] font-extrabold text-[#111827] uppercase tracking-tight leading-none">PREVENTIVE MAINTENCE (AMC)</h3>
                    <p className="font-noto text-[0.875rem] text-[#121827]/85 font-medium leading-relaxed">Our Annual Maintenance Contract (AMC) keeps your generating set in peak condition year-round.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Leading the Way */}
        <section className="w-full bg-[#F9FAFB] py-24 border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-noto text-3xl sm:text-[2.5rem] font-extrabold text-[#0B0F19] uppercase tracking-tight leading-none">
                LEADING THE WAY IN<br />ELECTRICAL ENGINEERING
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-6 flex justify-center items-center">
                <img src="/leading-the-way-in-electrical.jpg" alt="Electrical Engineering" className="w-full h-auto object-cover rounded-[2rem] shadow-lg" />
              </div>
              <div className="lg:col-span-6 text-left space-y-6 flex flex-col justify-center">
                <div>
                  <h3 className="font-noto text-[1.5rem] font-bold text-brand-red mb-4">About Kanokdam Limited</h3>
                  <p className="font-noto text-[1rem] text-[#121827] leading-relaxed font-semibold">
                    Kanokdam Limited is built on decades of experience in Mechanical and Electrical Engineering Works. Our mission is to utilize the latest processing solutions and expertise to ensure you receive sufficient, reliable power supply without worry.
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => navigate('/about')}
                    className="rounded-[1.25rem] bg-[#121827] text-white hover:bg-[#E53E3E] px-8 py-3.5 text-[0.875rem] font-bold transition-colors cursor-pointer"
                  >
                    Read more
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
