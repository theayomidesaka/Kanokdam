import React, { useState } from 'react';
import { ShieldCheck, Wrench, Cpu, CheckCircle, ArrowRight, HelpCircle, ChevronDown } from 'lucide-react';
import { services } from '../data/mockData';

export default function Services({ setRoute }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "What is covered under the Annual Maintenance Contract (AMC)?",
      a: "Our AMC covers quarterly preventive servicing (oil/filter change, belt checks, electrical inspection), fuel system diagnostics, battery checks, load bank tests, and gives you 24/7 priority emergency breakdown support with zero call-out charges."
    },
    {
      q: "Which generator brands do you specialize in?",
      a: "We specialize in Perkins and YORC generating sets. We maintain a large inventory of genuine spare parts for both brands to ensure that repairs are completed without delay."
    },
    {
      q: "Can you install a generator at a high-rise office or factory site?",
      a: "Yes, our engineering team manages complex installations including concrete foundations, sound treatment for indoor engine rooms, exhaust chimney piping, synchronizing panels for multiple units, and bulk fuel storage setups."
    },
    {
      q: "How fast do you respond to emergency breakdowns?",
      a: "For AMC clients, we guarantee an emergency engineering team response within 2 hours in Lagos and key industrial zones nationwide."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-left py-12 bg-grid-pattern relative">
      {/* Background Glow */}
      <div className="absolute top-[15%] left-[5%] h-[300px] w-[300px] bg-brand-orange/5 rounded-full blur-[110px]"></div>
      <div className="absolute bottom-[15%] right-[5%] h-[350px] w-[350px] bg-brand-blue/5 rounded-full blur-[120px]"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-white/5 pb-8 mb-12">
          <span className="font-noto text-xs font-bold uppercase tracking-widest text-brand-orange">Kanokdam Services</span>
          <h1 className="font-noto text-3xl font-extrabold text-white sm:text-4xl mt-2">Mechanical & Electrical Engineering Works</h1>
          <p className="font-noto text-slate-400 text-sm mt-2 max-w-3xl">
            We provide full-lifecycle power solutions. From calculating your site's exact load requirements and installing robust soundproof generators to providing round-the-clock maintenance contracts, we keep your power flowing.
          </p>
        </div>

        {/* Detailed Services list */}
        <div className="space-y-12 mb-16">
          {services.map((svc, index) => (
            <div 
              key={svc.id} 
              className={`rounded-2xl border border-white/5 bg-slate-900/60 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative overflow-hidden`}
            >
              {/* Top gradient indicator */}
              <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${
                index % 2 === 0 ? 'from-brand-orange to-brand-amber' : 'from-brand-blue to-cyan-500'
              }`}></div>

              {/* Service Intro (Left) */}
              <div className="lg:col-span-5 space-y-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border mb-2 ${
                  index % 2 === 0 
                    ? 'bg-brand-orange/10 text-brand-orange border-brand-orange/20' 
                    : 'bg-brand-blue/10 text-brand-blue border-brand-blue/20'
                }`}>
                  {svc.id === 'svc-amc' && <ShieldCheck className="h-6 w-6" />}
                  {svc.id === 'svc-install' && <Wrench className="h-6 w-6" />}
                  {svc.id === 'svc-eng' && <Cpu className="h-6 w-6" />}
                </div>
                
                <h3 className="text-xl font-bold text-white">{svc.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{svc.description}</p>
                
                {/* Benefits box */}
                <div className="rounded-xl bg-slate-950/60 border border-white/5 p-4 mt-4 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Key Service Benefits</span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {svc.benefits.map((b, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <CheckCircle className="h-3.5 w-3.5 text-brand-green shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Service Bullet Points Checklist (Right) */}
              <div className="lg:col-span-7 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Service Scope & Checklist</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {svc.points.map((pt, i) => (
                    <div key={i} className="rounded-lg bg-slate-950 p-4 border border-white/5 flex items-start space-x-3 hover:border-slate-800 transition-colors">
                      <div className="flex h-5 w-5 items-center justify-center rounded bg-brand-orange/15 text-brand-orange shrink-0 mt-0.5 text-[10px] font-bold">
                        {i + 1}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium">{pt}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => {
                      setRoute('home');
                      setTimeout(() => {
                        const el = document.getElementById('quote-form');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 200);
                    }}
                    className="flex items-center space-x-2 rounded-lg bg-brand-orange px-5 py-2.5 text-xs font-bold text-white hover:bg-orange-500 shadow-md shadow-brand-orange/10"
                  >
                    <span>Inquire for {svc.title}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange flex items-center justify-center space-x-1.5">
              <HelpCircle className="h-4 w-4" />
              <span>Common Questions</span>
            </span>
            <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="rounded-xl border border-white/5 bg-slate-900/40 divide-y divide-white/5 overflow-hidden">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-900/20">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-slate-200 hover:text-white transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-brand-orange transition-transform duration-300 ${
                    openFaq === i ? 'rotate-180' : ''
                  }`} />
                </button>
                
                <div className={`transition-all duration-300 overflow-hidden ${
                  openFaq === i ? 'max-h-[200px] border-t border-white/5' : 'max-h-0'
                }`}>
                  <p className="p-5 text-xs text-slate-400 leading-relaxed bg-slate-950/20">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
