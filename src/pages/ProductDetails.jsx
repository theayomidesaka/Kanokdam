import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { generators as generatorsApi } from '../lib/api';

const staticImgMap = {
  'sp-50':       '/SP50.png',
  'sp-60':       '/SP60.png',
  'accessories': '/accessories_bg.png',
};
const getImg = (gen) =>
  gen?.images?.[0] || staticImgMap[gen?.id] || '/SPGeneric.png';

export default function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [generators, setGenerators] = useState([]);
  const [expandedSpecs, setExpandedSpecs] = useState(false);

  useEffect(() => {
    generatorsApi.list().then(data => setGenerators(Array.isArray(data) ? data : [])).catch(() => {});
  }, []);

  useEffect(() => {
    setExpandedSpecs(false);
  }, [id]);

  const generator = generators.find(g => g.id === id) || generators[0];
  const recommendations = generators.filter(g => g.id !== generator?.id).slice(0, 3);

  if (!generator) return null;

  const mainImg = getImg(generator);

  const primarySpecs = [
    { label: 'Model',                  value: generator.specifications.model || generator.name.split(' ').pop() },
    { label: 'Power Rating (Prime)',   value: generator.specifications.powerPrime  || `${generator.capacityKVA}kVA` },
    { label: 'Power Rating (Standby)', value: generator.specifications.powerStandby || 'N/A' },
    { label: 'Frequency',              value: generator.specifications.frequency },
    { label: 'Voltage',                value: generator.specifications.voltage },
    { label: 'Speed',                  value: generator.specifications.speed },
  ];

  const extraSpecs = [
    { label: 'Engine Model',     value: generator.engineModel     || 'N/A' },
    { label: 'Alternator Brand', value: generator.alternatorBrand || 'N/A' },
    generator.specifications.fuelCapacity    && { label: 'Fuel Tank Capacity', value: generator.specifications.fuelCapacity },
    generator.specifications.fuelConsumption && { label: 'Fuel Consumption',   value: generator.specifications.fuelConsumption },
    generator.specifications.dimensions      && { label: 'Dimensions',         value: generator.specifications.dimensions },
    generator.specifications.weight          && { label: 'Weight',             value: generator.specifications.weight },
  ].filter(Boolean);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": generator.name,
    "description": generator.description,
    "image": generator.images?.[0] || mainImg,
    "brand": { "@type": "Brand", "name": generator.brand || "YORC" },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": generator.price,
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "Kanokdam Limited" }
    }
  };

  return (
    <>
      <Helmet>
        <title>{generator.name} | Kanokdam Limited</title>
        <meta name="description" content={generator.description} />
        <link rel="canonical" href={`https://kanokdam.com/generators/${generator.id}`} />
        <meta property="og:title" content={`${generator.name} | Kanokdam Limited`} />
        <meta property="og:description" content={generator.description} />
        <meta property="og:url" content={`https://kanokdam.com/generators/${generator.id}`} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={generator.images?.[0] || mainImg} />
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      </Helmet>

      <div className="w-full bg-white py-12 font-sans text-left">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          <div className="mb-10">
            <button
              onClick={() => navigate('/generators')}
              className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-brand-red transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Products</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start mb-24">

            {/* LEFT */}
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden bg-gray-100 h-[380px] sm:h-[440px]">
                <img src={mainImg} alt={generator.name} className="w-full h-full object-cover" onError={e => { e.currentTarget.src = '/SPGeneric.png'; }} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[mainImg, getImg('sp-60'), getImg('sp-50')].map((src, i) => (
                  <div key={i} className="rounded-xl overflow-hidden bg-gray-100 h-24">
                    <img src={src} alt={`${generator.name} view ${i + 1}`} className="w-full h-full object-cover" onError={e => { e.currentTarget.src = '/SPGeneric.png'; }} />
                  </div>
                ))}
              </div>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="text-center py-2 border-b border-gray-200">
                  <span className="font-noto text-[10px] font-bold uppercase tracking-widest text-gray-400">Warranty</span>
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-200">
                  <div className="p-4 text-center space-y-1">
                    <p className="font-noto text-sm font-bold text-gray-900">YORC OEM warranty</p>
                    <p className="font-noto text-xs text-gray-500">(typically 5 year or 3500 running hours)</p>
                  </div>
                  <div className="p-4 text-center space-y-1">
                    <p className="font-noto text-sm font-bold text-gray-900">PERKINS OEM warranty</p>
                    <p className="font-noto text-xs text-gray-500">(typically 1 year or 2000 running hours)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              <h1 className="font-noto text-3xl sm:text-4xl font-black text-[#0B0F19] leading-tight">
                {generator.name.replace('KANOKDAM ', 'Kanokdam ')}
                {generator.capacityKVA > 0 && <span> ({generator.capacityKVA}kVA)</span>}
              </h1>
              <p className="font-noto text-sm text-gray-600 leading-relaxed text-justify">{generator.description}</p>

              <div className="pt-2">
                <h2 className="font-noto text-xl font-black text-[#0B0F19] mb-5">Technical Specifications</h2>
                <div className="grid grid-cols-2 pb-3 border-b border-gray-300">
                  <span className="font-noto text-sm font-bold text-gray-900">Parameter</span>
                  <span className="font-noto text-sm font-bold text-gray-900">Specification</span>
                </div>
                {primarySpecs.map((row, i) => (
                  <div key={i} className="grid grid-cols-2 py-4 border-b border-gray-200">
                    <span className="font-noto text-sm font-bold text-gray-800">{row.label}</span>
                    <span className="font-noto text-sm text-gray-600">{row.value}</span>
                  </div>
                ))}
                {expandedSpecs && extraSpecs.map((row, i) => (
                  <div key={i} className="grid grid-cols-2 py-4 border-b border-gray-200">
                    <span className="font-noto text-sm font-bold text-gray-800">{row.label}</span>
                    <span className="font-noto text-sm text-gray-600">{row.value}</span>
                  </div>
                ))}
                {extraSpecs.length > 0 && (
                  <button onClick={() => setExpandedSpecs(!expandedSpecs)} className="flex items-center gap-1.5 font-noto text-sm font-semibold text-gray-700 hover:text-brand-red transition-colors mt-5">
                    <span>{expandedSpecs ? 'View Less' : 'View More'}</span>
                    {expandedSpecs ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                )}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigate('/quote')}
                  className="w-full rounded-xl bg-brand-red hover:bg-red-600 py-4 font-noto text-sm font-bold text-white transition-all text-center uppercase tracking-wider"
                >
                  Inquire For This Unit
                </button>
              </div>
            </div>
          </div>

          {/* You May Also Like */}
          <div className="border-t border-gray-200 pt-16">
            <h2 className="font-noto text-2xl font-black text-[#0B0F19] uppercase tracking-tight mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendations.map((gen, idx) => {
                const recImgMap = { 'sp-50': '/SP50.png', 'sp-60': '/SP60.png', 'accessories': '/accessories_bg.png' };
                const shuffled = idx % 2 === 0 ? '/SP50.png' : '/SP60.png';
                const cardImg = recImgMap[gen.id] ?? shuffled;

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
                      <h3 className="font-noto text-xl sm:text-2xl font-black text-[#0B0F19] uppercase leading-tight mb-3">{gen.name}</h3>
                      <p className="font-noto text-sm text-gray-500 leading-relaxed line-clamp-3 mb-6">{gen.description}</p>
                      <hr className="border-gray-200 mb-6" />
                      <div className="grid grid-cols-3 divide-x divide-gray-200 mb-6">
                        {features.map((feat, fi) => (
                          <div key={fi} className="flex flex-col items-center text-center px-2 gap-2">
                            {feat.icon}
                            <span className="font-noto text-[10px] sm:text-xs font-semibold text-gray-600 leading-snug whitespace-pre-line">{feat.label}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => navigate(`/generators/${gen.id}`)}
                        className="w-full rounded-xl border border-gray-200 bg-[#F9FAFB] hover:bg-[#0A0E17] hover:text-white hover:border-[#0A0E17] py-3 text-xs font-extrabold text-gray-800 transition-all duration-200 font-noto uppercase tracking-wider"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
