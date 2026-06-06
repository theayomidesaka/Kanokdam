import React from 'react';

export default function Footer({ setRoute }) {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing to our newsletter!");
  };

  return (
    <footer className="w-full bg-[#05080E] text-slate-400 py-16 border-t border-white/5 relative z-10 text-left select-none font-noto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-12">
          
          {/* Left Column: Logo, Newsletter, Offices, Socials */}
          <div className="lg:col-span-6 lg:pr-12 lg:border-r lg:border-white/10 space-y-8">
            
            {/* Red Logo Mark */}
            <div className="flex items-center space-x-2">
              <svg width="24" height="32" viewBox="0 0 17 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto text-brand-red">
                <path d="M12.8484 15.0721L7.72139 9.57446L16.5546 0.0617409V10.8716L12.8484 15.0721Z" fill="currentColor"/>
                <path d="M7.10365 0L0 7.47428V25.9438L5.55938 19.8285L16.5546 31.5032V20.3844L7.10365 10.3775V0Z" fill="currentColor"/>
              </svg>
            </div>

            {/* Newsletter heading */}
            <div className="space-y-1">
              <h3 className="font-noto text-xl sm:text-[1.5rem] font-bold text-white tracking-tight leading-tight">
                Join our newsletter
              </h3>
              <p className="font-noto text-sm text-gray-500">Subscribe for email updates</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md w-full">
              <input
                type="email"
                placeholder="name@email.com"
                required
                className="flex-grow rounded-full bg-[#0A0E17] border border-white/10 px-6 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-red transition-all"
              />
              <button
                type="submit"
                className="rounded-full bg-brand-red px-8 py-3.5 text-sm font-bold text-white hover:bg-[#E53E3E] transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>

            {/* Offices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="space-y-2">
                <span className="block font-bold text-white">Head Office :</span>
                <p className="text-gray-400 leading-relaxed font-semibold">
                  1 Uwa Close, Off Akingbola<br />
                  Street, Oregun, Lagos
                </p>
              </div>
              
              <div className="space-y-2">
                <span className="block font-bold text-white">Branch Office :</span>
                <p className="text-gray-400 leading-relaxed font-semibold">
                  225 Akarigbo Road, Old MTD,<br />
                  Sagamu, Ogun State
                </p>
              </div>
            </div>

            {/* Socials & Hours */}
            <div className="flex flex-wrap items-center gap-8 pt-2">
              <div className="flex items-center space-x-3">
                {/* Instagram */}
                <a href="#" className="h-8 w-8 rounded-full border border-white/20 hover:border-brand-red hover:text-white text-gray-400 flex items-center justify-center transition-all">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                {/* Facebook */}
                <a href="#" className="h-8 w-8 rounded-full border border-white/20 hover:border-brand-red hover:text-white text-gray-400 flex items-center justify-center transition-all">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                {/* YouTube */}
                <a href="#" className="h-8 w-8 rounded-full border border-white/20 hover:border-brand-red hover:text-white text-gray-400 flex items-center justify-center transition-all">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" className="h-8 w-8 rounded-full border border-white/20 hover:border-brand-red hover:text-white text-gray-400 flex items-center justify-center transition-all">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
              <span className="font-noto text-sm text-gray-300 font-medium">Mon - Fri : 8am - 7pm</span>
            </div>

          </div>

          {/* Right Column: Links & Contacts */}
          <div className="lg:col-span-6 lg:pl-12 flex flex-col justify-between">
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
              
              {/* Company */}
              <div className="space-y-4">
                <h4 className="font-noto text-md font-bold text-white uppercase tracking-wider">COMPANY</h4>
                <ul className="space-y-3 text-sm text-gray-400 font-medium">
                  <li>
                    <button onClick={() => setRoute('home')} className="hover:text-white transition-colors cursor-pointer text-left block w-full">Home</button>
                  </li>
                  <li>
                    <button onClick={() => setRoute('about')} className="hover:text-white transition-colors cursor-pointer text-left block w-full">About us</button>
                  </li>
                  <li>
                    <button onClick={() => setRoute('home')} className="hover:text-white transition-colors cursor-pointer text-left block w-full">Services</button>
                  </li>
                  <li>
                    <button onClick={() => setRoute('products')} className="hover:text-white transition-colors cursor-pointer text-left block w-full">Product</button>
                  </li>
                  <li>
                    <button onClick={() => setRoute('quote')} className="hover:text-white transition-colors cursor-pointer text-left block w-full">Contact Us</button>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div className="space-y-4">
                <h4 className="font-noto text-md font-bold text-white uppercase tracking-wider">LEGAL & COMPLIANCE</h4>
                <ul className="space-y-3 text-sm text-gray-400 font-medium">
                  <li>
                    <span className="hover:text-white transition-colors cursor-pointer block">Privacy Policy</span>
                  </li>
                  <li>
                    <span className="hover:text-white transition-colors cursor-pointer block">Terms & Conditions</span>
                  </li>
                  <li>
                    <span className="hover:text-white transition-colors cursor-pointer block">Warranty Policy</span>
                  </li>
                  <li>
                    <span className="hover:text-white transition-colors cursor-pointer block">Health & Safety Policy</span>
                  </li>
                </ul>
              </div>

              {/* Email Contact block (under COMPANY column) */}
              <div className="text-sm font-medium">
                <span className="text-gray-500 mr-1.5">Email:</span>
                <a href="mailto:support@kanokdamlimited.com" className="text-white hover:text-brand-red transition-colors font-semibold">
                  support@kanokdamlimited.com
                </a>
              </div>

              {/* Phone Contact block (under LEGAL column) */}
              <div className="text-sm font-medium">
                <span className="text-gray-500 mr-1.5">Phone:</span>
                <span className="text-white font-semibold">+234 (0) 915 011 1122</span>
              </div>

            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="w-full border-t border-white/10 my-10"></div>

        {/* Giant Logo Text */}
        <div className="pt-16 pb-4 overflow-hidden select-none pointer-events-none">
          <h1 className="text-[12vw] font-black text-white/5 leading-[0.8] text-center tracking-tighter font-sans uppercase">
            KANOKDAM
          </h1>
        </div>

        {/* Tagline */}
        <div className="pt-8 text-center text-xs text-gray-500 font-medium font-noto">
          Global solutions for power generation, electrical engineering, and machinery maintenance.
        </div>

      </div>
    </footer>
  );
}
