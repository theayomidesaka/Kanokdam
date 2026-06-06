import React, { useState } from 'react';
import { Zap, Plus, Minus } from 'lucide-react';

export default function About({ setRoute }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "What generator brands do you specialize in?",
      a: "We specialize in Perkins and YORC generating sets, ensuring top-tier reliability and access to original parts."
    },
    {
      q: "Do you offer soundproof options?",
      a: "Yes, our primary focus is on soundproof (silent) generator models suitable for residential estates and sensitive industrial areas."
    },
    {
      q: "What is included in the Annual Maintenance Contract (AMC)?",
      a: "Our AMC covers quarterly preventive maintenance, oil/filter changes, battery/belt checks, load bank testing, and priority 24/7 emergency response support."
    }
  ];

  const clientLogos = [
    { src: '/surulere.png', alt: 'Surulere Local Government' },
    { src: '/bokku.png', alt: 'Bokku' },
    { src: '/orile-agege.png', alt: 'Orile Agege General Hospital' },
    { src: '/my-noodle.png', alt: 'My Noodle' },
    { src: '/glosam.png', alt: 'Glosam' },
    { src: '/Zeno.png', alt: 'Zeno' }
  ];

  return (
    <div className="w-full bg-[#FFFFFF] font-sans text-left">
      
      {/* 1. Header Section: Story & Commitment */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column Story */}
          <div className="space-y-8 text-left">
            <h1 className="font-noto text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-[#0B0F19] tracking-tight leading-[1.1]">
              Our Story &<br className="hidden sm:inline" /> Commitment
            </h1>
            <p className="font-noto text-sm sm:text-base text-gray-700 leading-relaxed font-semibold">
              Kanokdam Limited is a formidable global brand with core competencies in Mechanical and Electrical Engineering Works, specializing in high-performance soundproof diesel and gas generators. Built on a foundation of integrity and technical excellence, we serve large estates, construction projects, and key industrial sectors, ensuring seamless, uninterrupted power supply.
            </p>
            <button
              onClick={() => setRoute('quote')}
              className="font-noto inline-block w-fit px-8 py-3.5 bg-[#0B0F19] hover:bg-slate-800 active:scale-95 text-white font-bold text-xs rounded-full transition-all duration-200 uppercase tracking-wider shadow-md"
            >
              Get in touch
            </button>
          </div>

          {/* Right Column Team Photo & Description Card */}
          <div className="rounded-[2rem] overflow-hidden border border-gray-100 bg-[#0B0F19] flex flex-col shadow-xl">
            {/* Top Half: Team Photo */}
            <div className="w-full h-72 sm:h-80 overflow-hidden relative">
              <img 
                src="/kanokdam-worker.png" 
                alt="Kanokdam Team" 
                className="w-full h-full object-cover"
                fetchpriority="high"
              />
            </div>
            {/* Bottom Half: Who Are We Text */}
            <div className="p-8 sm:p-10 space-y-4 text-left">
              <h2 className="font-noto text-lg sm:text-xl font-extrabold text-white uppercase tracking-wider">
                Who Are We
              </h2>
              <p className="font-noto text-xs sm:text-sm text-gray-400 font-semibold leading-relaxed">
                Our team is composed of highly professional, qualified engineers dedicated to unrivalled workmanship and accurate testing processes. We don't just supply power; we engineer reliability.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Clientele Bar */}
      <div className="w-full bg-[#EAEAEA] py-6 border-y border-gray-200 select-none overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-12 md:gap-16">
            {/* Static Title on Left */}
            <span className="font-noto text-3xl font-black uppercase text-[#0B0F19] tracking-wider shrink-0">
              Clientele
            </span>
            
            {/* Scrolling Marquee of Logos on Right */}
            <div className="flex-grow overflow-hidden relative">
              {/* Fade overlays on edges to make the scrolling blend in and look premium */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#EAEAEA] to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#EAEAEA] to-transparent z-10"></div>
              
              <div className="flex animate-ticker whitespace-nowrap gap-4 py-2">
                {[...Array(12)].map((_, loopIdx) => (
                  <div key={loopIdx} className="flex gap-4 shrink-0">
                    {clientLogos.map((logo, logoIdx) => (
                      <div 
                        key={logoIdx} 
                        className="h-16 w-16 sm:h-20 sm:w-20 bg-white rounded-[1.25rem] flex items-center justify-center p-3 border border-black/5 shrink-0"
                      >
                        <img 
                          src={logo.src} 
                          alt={logo.alt} 
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Values / Vision / Mission */}
      <section className="w-full bg-[#F3F4F6] py-20 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Values Left Column (Dark block) */}
            <div className="bg-[#0B0F19] rounded-[2rem] text-white p-8 sm:p-12 flex flex-col justify-center shadow-xl">
              <h2 className="font-noto text-2xl sm:text-3xl font-black text-white uppercase text-center mb-10 tracking-wider">
                Core Values
              </h2>
              
              <ul className="space-y-6">
                {[
                  { title: "Excellence", desc: "Exceeding expectations through consistent quality." },
                  { title: "Proactive", desc: "Controlling situations to ensure client peace of mind." },
                  { title: "Responsibility", desc: "Taking ownership of every power project." },
                  { title: "Trust", desc: "Believing in our strength to surpass your power needs." },
                  { title: "Safety", desc: "Core priority in all execution processes." }
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3.5 text-xs sm:text-sm leading-relaxed">
                    <svg className="h-5 w-5 text-white shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="12" r="3" fill="currentColor" />
                    </svg>
                    <span className="font-noto">
                      <strong className="text-white font-bold">{item.title}:</strong>
                      <span className="text-gray-300 font-medium"> {item.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision / Mission Right Column (Light blocks) */}
            <div className="flex flex-col gap-6">
              
              {/* Vision Card */}
              <div className="bg-white rounded-[2rem] border border-gray-100 p-8 sm:p-10 flex flex-col justify-center flex-1 shadow-sm">
                <h2 className="font-noto text-xl sm:text-2xl font-black text-[#0B0F19] uppercase mb-4 tracking-wider">
                  Our Vision
                </h2>
                <p className="font-noto text-xs sm:text-sm text-gray-700 leading-relaxed font-semibold">
                  To be the world's most trusted provider of specialized power generation and electrical solutions, recognized globally for innovation and commitment to safety.
                </p>
              </div>

              {/* Mission Card */}
              <div className="bg-white rounded-[2rem] border border-gray-100 p-8 sm:p-10 flex flex-col justify-center flex-1 shadow-sm">
                <h2 className="font-noto text-xl sm:text-2xl font-black text-[#0B0F19] uppercase mb-4 tracking-wider">
                  Our Mission
                </h2>
                <p className="font-noto text-xs sm:text-sm text-gray-700 leading-relaxed font-semibold">
                  To utilize the latest processing solutions and decades of work experience to provide every client with a sufficient, reliable, and efficient power supply, leveraging top-tier equipment like Perkins and YORC.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. End-to-End Power Services */}
      <section className="w-full bg-[#F3F4F6] py-20 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="font-noto text-3xl sm:text-[4rem] font-black text-[#0B0F19] uppercase tracking-wider leading-[1.1]">
              End-to-End<br />Power Services
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                title: "DIESEL & GAS GENERATOR SALES & EXPERTISE",
                desc: "We guide you in selecting the ideal generating set (Perkins or YORC) tailored to your specific load requirements, from commercial complexes to large industrial plants. Our soundproof enclosures ensure quiet operation, meeting global environmental standards.",
                img: "/Diesel-Sales.png",
                dark: false,
                bullets: [
                  "Load assessment and right-sizing",
                  "Quality control system & pre-delivery testing",
                  "Custom electrical panel configuration"
                ]
              },
              {
                title: "ANNUAL MAINTENANCE CONTRACT (AMC)",
                desc: "Our preventive maintenance service ensures your generator set is always in good operational condition. This comprehensive agreement minimizes unexpected breakdowns and extends the lifespan of your critical power asset.",
                img: "/Maintenance.png",
                dark: true,
                bullets: [
                  "Routine inspection and servicing for all grades",
                  "Major and minor overhaul services (Priority",
                  "On-site technical training for client's staff"
                ]
              },
              {
                title: "NATIONWIDE DELIVERY & INSTALLATION",
                desc: "From initial site survey to final commissioning, our logistics team ensures the safe, timely, and professional deployment of your equipment. We handle all aspects of mechanical and electrical setup, guaranteeing full functionality and compliance.",
                img: "/delivery.png",
                dark: false,
                bullets: [
                  "Secure transport and nationwide coverage",
                  "Concrete foundation and piping work",
                  "Seamless integration with existing infrastructure"
                ]
              }
            ].map((svc, idx) => (
              <div 
                key={idx} 
                className={`grid grid-cols-1 md:grid-cols-2 overflow-hidden border border-gray-200/60 ${
                  svc.dark ? 'bg-[#0B0F19] text-white' : 'bg-white text-[#0B0F19]'
                }`}
              >
                {/* Left Column: Image */}
                <div className="h-80 md:h-auto min-h-[22rem] md:min-h-[28rem] relative">
                  <img 
                    src={svc.img} 
                    alt={svc.title} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Right Column: Content */}
                <div className="p-8 sm:p-12 md:p-16 space-y-6 flex flex-col justify-center text-left">
                  <h3 className="font-noto text-xl md:text-2xl font-black uppercase tracking-tight leading-tight">
                    {svc.title}
                  </h3>
                  <p className={`font-noto text-xs sm:text-sm leading-relaxed font-semibold ${
                    svc.dark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {svc.desc}
                  </p>
                  <ul className="space-y-4">
                    {svc.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start space-x-3 text-xs sm:text-sm leading-relaxed">
                        <svg className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${svc.dark ? 'text-white' : 'text-[#0B0F19]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <circle cx="12" cy="12" r="9" />
                          <circle cx="12" cy="12" r="3" fill="currentColor" />
                        </svg>
                        <span className={`font-noto font-semibold ${svc.dark ? 'text-gray-200' : 'text-gray-700'}`}>
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. FAQ Accordion */}
      <section className="w-full bg-[#05080E] py-20 text-white border-t border-white/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-noto text-3xl sm:text-4xl font-black text-white uppercase tracking-[-0.04em] leading-[1.2]">
              Questions ? Let's<br />Clarify Together
            </h2>
            <p className="font-noto text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
              Want to understand our process, timeline, or what to expect in a consulting engagement? Let's have a chat.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-white/20 pb-4">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left text-sm sm:text-base font-semibold text-white transition-colors hover:text-gray-300"
                >
                  <span className="font-noto">{faq.q}</span>
                  {openFaq === i ? (
                    <Minus className="h-5 w-5 text-brand-red shrink-0 ml-4" />
                  ) : (
                    <Plus className="h-5 w-5 text-brand-red shrink-0 ml-4" />
                  )}
                </button>
                
                <div className={`transition-all duration-300 overflow-hidden ${
                  openFaq === i ? 'max-h-[200px] mt-2 mb-4' : 'max-h-0'
                }`}>
                  <div className="p-6 bg-[#111827] rounded-xl">
                    <p className="font-noto text-xs sm:text-sm text-gray-300 leading-relaxed font-semibold">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Join the Team CTA */}
      <section
        className="relative w-full bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/out-team-bg.png')" }}
      >
        {/* subtle dark overlay so text reads well */}
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
          {/* White card */}
          <div className="relative bg-white rounded-[2rem] shadow-xl w-full max-w-2xl px-10 pt-24 pb-14 text-center">

            {/* Floating image — positioned to overflow above the card */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-44 h-44 flex items-center justify-center">
              <img
                src="/jointeam-img.png"
                alt="Kanokdam power tech"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>

            {/* Heading */}
            <h2 className="font-noto text-3xl sm:text-[2.75rem] font-black text-brand-red uppercase leading-[1.1] mb-4">
              JOIN THE<br />KANOKDAM TEAM
            </h2>

            {/* Body */}
            <p className="font-noto text-sm sm:text-base text-gray-700 max-w-md mx-auto leading-relaxed mb-10">
              We are always looking for passionate Mechanical and Electrical Engineers
              to lead the future of power. Send your CV to the HR department today.
            </p>

            {/* CTA button */}
            <button
              onClick={() => alert("Please send your CV to careers@kanokdamlimited.com")}
              className="font-noto inline-block px-8 py-4 rounded-xl bg-[#0A0E17] hover:bg-brand-red text-white text-sm font-semibold transition-colors duration-200 cursor-pointer"
            >
              Explore Career Opportunities
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
