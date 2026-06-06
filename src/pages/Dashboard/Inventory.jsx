import React, { useState, useRef, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Search, Package, CheckCircle, RotateCcw, Upload, ImageOff } from 'lucide-react';
import { generators as generatorsApi } from '../../lib/api';

const MAX_IMAGES = 4;
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function Inventory() {
  const [generators, setGenerators] = useState([]);

  useEffect(() => {
    generatorsApi.list().then(setGenerators).catch(() => {});
  }, []);

  const [search, setSearch]       = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeId, setActiveId]   = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  const fileInputRef = useRef(null);

  // Default empty form — includes images array
  const emptyForm = {
    name: '',
    brand: 'Perkins',
    capacityKVA: 50,
    phase: 'Three Phase',
    fuelType: 'Diesel',
    soundproof: true,
    engineModel: '',
    alternatorBrand: 'Leroy Somer',
    status: 'Available',
    price: 15000,
    description: '',
    images: [],           // array of base64 data URLs (max 4)
    specifications: {
      voltage: '230V / 400V',
      frequency: '50 Hz',
      fuelCapacity: '150 Liters',
      fuelConsumption: '12 L/hr (100% Load)',
      dimensions: '2200 x 950 x 1350 mm',
      weight: '950 kg',
    },
  };

  const [form, setForm] = useState(emptyForm);

  // Search filter
  const filteredGenerators = generators.filter(gen =>
    gen.name.toLowerCase().includes(search.toLowerCase()) ||
    gen.brand.toLowerCase().includes(search.toLowerCase()) ||
    (gen.engineModel || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this generator? This cannot be undone.')) {
      try {
        await generatorsApi.delete(id);
        setGenerators(prev => prev.filter(gen => gen.id !== id));
        showNotification('Generator model deleted successfully.');
      } catch (err) {
        showNotification(`Error: ${err.message}`);
      }
    }
  };

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleEditOpen = (gen) => {
    setIsEditing(true);
    setActiveId(gen.id);
    setForm({ ...emptyForm, ...gen, images: gen.images || [] });
    setModalOpen(true);
  };

  const handleAddOpen = () => {
    setIsEditing(false);
    setActiveId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setForm(prev => ({ ...prev, [name]: val }));
  };

  const handleSpecChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      specifications: { ...prev.specifications, [name]: value },
    }));
  };

  /* ── Image handling ─────────────────────────────────────────────── */
  const [pendingImageFiles, setPendingImageFiles] = useState([]);

  const handleImageFiles = (files) => {
    const slots = MAX_IMAGES - (form.images || []).length - pendingImageFiles.length;
    if (slots <= 0) return;
    const toAdd = Array.from(files).slice(0, slots);
    setPendingImageFiles(prev => [...prev, ...toAdd]);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files?.length) handleImageFiles(e.target.files);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) handleImageFiles(e.dataTransfer.files);
  };

  const handleRemoveImage = async (index) => {
    const imgPath = form.images[index];
    if (activeId && imgPath.startsWith('/uploads/')) {
      try {
        const updated = await generatorsApi.deleteImage(activeId, imgPath);
        setForm(prev => ({ ...prev, images: updated.images }));
        setGenerators(prev => prev.map(g => g.id === activeId ? updated : g));
      } catch {}
    } else {
      setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    }
  };

  const handleRemovePending = (index) => {
    setPendingImageFiles(prev => prev.filter((_, i) => i !== index));
  };
  /* ──────────────────────────────────────────────────────────────── */

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.engineModel) {
      alert('Please enter Name and Engine Model.');
      return;
    }

    const payload = {
      name: form.name, brand: form.brand, capacityKVA: form.capacityKVA,
      phase: form.phase, fuelType: form.fuelType, soundproof: form.soundproof,
      engineModel: form.engineModel, alternatorBrand: form.alternatorBrand,
      status: form.status, price: form.price, description: form.description,
      specModel: form.specifications?.model, specPowerPrime: form.specifications?.powerPrime,
      specPowerStandby: form.specifications?.powerStandby, specFrequency: form.specifications?.frequency,
      specVoltage: form.specifications?.voltage, specSpeed: form.specifications?.speed,
    };

    try {
      let saved;
      if (isEditing) {
        saved = await generatorsApi.update(activeId, payload);
        showNotification('Generator model updated successfully.');
      } else {
        saved = await generatorsApi.create(payload);
        showNotification('New generator model added successfully.');
      }

      // Upload any pending image files
      if (pendingImageFiles.length > 0) {
        saved = await generatorsApi.uploadImages(saved.id, pendingImageFiles);
        setPendingImageFiles([]);
      }

      setGenerators(prev =>
        isEditing ? prev.map(g => g.id === saved.id ? saved : g) : [saved, ...prev]
      );
      setModalOpen(false);
    } catch (err) {
      showNotification(`Error: ${err.message}`);
    }
  };

  const resetToFactory = () => {
    showNotification('Use the seed script to reset to factory defaults.');
  };

  return (
    <div className="space-y-6 text-left relative">

      {/* Success Toast */}
      {successMsg && (
        <div className="fixed top-24 right-6 z-50 rounded-xl bg-slate-900 border border-green-500/30 p-4 shadow-xl flex items-center space-x-3 animate-slide-down">
          <CheckCircle className="h-5 w-5 text-green-400 shrink-0" />
          <span className="text-xs font-semibold text-white">{successMsg}</span>
        </div>
      )}

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center space-x-2">
            <Package className="h-5 w-5 text-brand-red" />
            <span>Products Management</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Add, edit, or delete generator models and their product images.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={resetToFactory}
            className="flex items-center space-x-1.5 rounded-lg border border-white/5 bg-slate-900 hover:bg-slate-950 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleAddOpen}
            className="flex items-center space-x-1.5 rounded-lg bg-brand-red hover:bg-red-600 px-4 py-2 text-xs font-bold text-white transition-colors shadow-lg shadow-brand-red/10"
          >
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, engine, brand…"
          className="w-full rounded-xl bg-slate-900 border border-white/5 text-xs text-white pl-10 pr-4 py-3.5 focus:outline-none focus:border-brand-red transition-colors placeholder-slate-600"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/5 bg-slate-900/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 bg-slate-900/60 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="p-4 w-16">Image</th>
                <th className="p-4">Product Model</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Engine</th>
                <th className="p-4">Capacity</th>
                <th className="p-4">Type</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredGenerators.map(gen => {
                const rawThumb = gen.images?.[0];
                const thumb = rawThumb?.startsWith('/uploads/') ? `${BASE_URL}${rawThumb}` : rawThumb;
                return (
                  <tr key={gen.id} className="hover:bg-slate-950/20 transition-colors">
                    {/* Thumbnail */}
                    <td className="p-4">
                      <div className="h-10 w-14 rounded-lg overflow-hidden bg-slate-800 border border-white/5 flex items-center justify-center shrink-0">
                        {thumb ? (
                          <img src={thumb} alt={gen.name} className="h-full w-full object-cover" />
                        ) : (
                          <ImageOff className="h-4 w-4 text-slate-600" />
                        )}
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="font-bold text-white block">{gen.name}</span>
                      <span className="text-[10px] text-slate-500">ID: {gen.id}</span>
                      {gen.images?.length > 0 && (
                        <span className="text-[10px] text-slate-500 ml-2">
                          · {gen.images.length} image{gen.images.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${
                        gen.brand === 'Perkins'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : 'bg-brand-red/10 text-brand-red border-brand-red/20'
                      }`}>
                        {gen.brand}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-slate-300">{gen.engineModel}</td>
                    <td className="p-4 font-bold text-brand-red font-mono">{gen.capacityKVA} kVA</td>
                    <td className="p-4 text-slate-400">{gen.soundproof ? 'Silent' : 'Open'}</td>
                    <td className="p-4">
                      <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                        gen.status === 'Available' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {gen.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEditOpen(gen)}
                          className="p-1.5 rounded-lg border border-white/5 bg-slate-900 text-slate-400 hover:text-white hover:border-blue-500/40 transition-colors"
                          title="Edit product"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(gen.id)}
                          className="p-1.5 rounded-lg border border-white/5 bg-slate-900 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredGenerators.length === 0 && (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-slate-500">
                    No generator models matching search parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Add / Edit Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/80 backdrop-blur-sm p-4 pt-8 animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6 mb-8">

            {/* Close */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Title */}
            <div className="border-b border-white/5 pb-4">
              <h3 className="text-lg font-bold text-white">
                {isEditing ? 'Edit Product' : 'Add New Product'}
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Product images will appear on the public product cards and detail pages.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">

              {/* ── PRODUCT IMAGES SECTION ── */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Product Images
                    <span className="ml-2 text-slate-600 font-normal normal-case tracking-normal">
                      (up to {MAX_IMAGES} photos)
                    </span>
                  </span>
                  {(form.images || []).length + pendingImageFiles.length < MAX_IMAGES && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1.5 text-[10px] font-bold text-brand-red hover:text-red-400 transition-colors"
                    >
                      <Upload className="h-3 w-3" />
                      Upload Image
                    </button>
                  )}
                </div>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileInputChange}
                />

                {/* Image slots grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* Saved image previews */}
                  {(form.images || []).map((src, i) => {
                    const displaySrc = src.startsWith('/uploads/') ? `${BASE_URL}${src}` : src;
                    return (
                      <div key={i} className="relative group aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-slate-950">
                        <img src={displaySrc} alt={`Product image ${i + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button type="button" onClick={() => handleRemoveImage(i)} className="h-7 w-7 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                            <X className="h-4 w-4 text-white" />
                          </button>
                        </div>
                        <span className="absolute bottom-1.5 left-2 text-[9px] font-bold text-white/60 bg-slate-950/40 rounded px-1">Photo {i + 1}</span>
                      </div>
                    );
                  })}

                  {/* Pending (not yet uploaded) file previews */}
                  {pendingImageFiles.map((file, i) => (
                    <div key={`pending-${i}`} className="relative group aspect-[4/3] rounded-xl overflow-hidden border border-brand-red/30 bg-slate-950">
                      <img src={URL.createObjectURL(file)} alt="pending" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button type="button" onClick={() => handleRemovePending(i)} className="h-7 w-7 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                          <X className="h-4 w-4 text-white" />
                        </button>
                      </div>
                      <span className="absolute bottom-1.5 left-2 text-[9px] font-bold text-brand-red/80 bg-slate-950/40 rounded px-1">Pending</span>
                    </div>
                  ))}

                  {/* Empty drop-zone slots */}
                  {Array.from({ length: MAX_IMAGES - (form.images || []).length - pendingImageFiles.length }).map((_, i) => (
                    <div
                      key={`empty-${i}`}
                      onDragOver={e => e.preventDefault()}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-[4/3] rounded-xl border-2 border-dashed border-white/10 hover:border-brand-red/40 bg-slate-950 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors group"
                    >
                      <Upload className="h-5 w-5 text-slate-600 group-hover:text-brand-red transition-colors" />
                      <span className="text-[9px] font-semibold text-slate-600 group-hover:text-slate-400 transition-colors">
                        {i === 0 && (form.images || []).length === 0 && pendingImageFiles.length === 0 ? 'Add Photo' : 'Add More'}
                      </span>
                    </div>
                  ))}
                </div>

                {((form.images || []).length > 0 || pendingImageFiles.length > 0) && (
                  <p className="text-[10px] text-slate-600 mt-2">
                    First image is used as the card thumbnail. Hover any image to remove it.
                  </p>
                )}
              </div>

              {/* ── BASIC INFO ── */}
              <div className="border-t border-white/5 pt-5 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Product Information
                </span>

                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Model Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Kanokdam YORC SP 50"
                      className="w-full rounded-lg bg-slate-950 border border-white/5 text-xs text-white p-3 focus:outline-none focus:border-brand-red transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Engine Model *</label>
                    <input
                      type="text"
                      name="engineModel"
                      required
                      value={form.engineModel}
                      onChange={handleInputChange}
                      placeholder="e.g. 1104C-44TAG2"
                      className="w-full rounded-lg bg-slate-950 border border-white/5 text-xs text-white p-3 focus:outline-none focus:border-brand-red transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Brand</label>
                    <select
                      name="brand"
                      value={form.brand}
                      onChange={handleInputChange}
                      className="w-full rounded-lg bg-slate-950 border border-white/5 text-xs text-white p-3 focus:outline-none focus:border-brand-red transition-colors"
                    >
                      <option value="Perkins">Perkins</option>
                      <option value="YORC">YORC</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Capacity (kVA) *</label>
                    <input
                      type="number"
                      name="capacityKVA"
                      required
                      value={form.capacityKVA}
                      onChange={handleInputChange}
                      className="w-full rounded-lg bg-slate-950 border border-white/5 text-xs text-white p-3 focus:outline-none focus:border-brand-red transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Price ($) *</label>
                    <input
                      type="number"
                      name="price"
                      required
                      value={form.price}
                      onChange={handleInputChange}
                      className="w-full rounded-lg bg-slate-950 border border-white/5 text-xs text-white p-3 focus:outline-none focus:border-brand-red transition-colors"
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Phase</label>
                    <select
                      name="phase"
                      value={form.phase}
                      onChange={handleInputChange}
                      className="w-full rounded-lg bg-slate-950 border border-white/5 text-xs text-white p-3 focus:outline-none focus:border-brand-red transition-colors"
                    >
                      <option value="Three Phase">Three Phase</option>
                      <option value="Single Phase">Single Phase</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Fuel Type</label>
                    <select
                      name="fuelType"
                      value={form.fuelType}
                      onChange={handleInputChange}
                      className="w-full rounded-lg bg-slate-950 border border-white/5 text-xs text-white p-3 focus:outline-none focus:border-brand-red transition-colors"
                    >
                      <option value="Diesel">Diesel</option>
                      <option value="Gas">Gas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Status</label>
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleInputChange}
                      className="w-full rounded-lg bg-slate-950 border border-white/5 text-xs text-white p-3 focus:outline-none focus:border-brand-red transition-colors"
                    >
                      <option value="Available">Available</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>
                </div>

                {/* Soundproof checkbox */}
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="soundproof"
                    id="soundproof"
                    checked={form.soundproof}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-brand-red focus:ring-brand-red"
                  />
                  <span className="text-xs font-semibold text-slate-400">
                    Soundproof Enclosure / Acoustic Canopy Included
                  </span>
                </label>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Description</label>
                  <textarea
                    name="description"
                    rows="3"
                    value={form.description}
                    onChange={handleInputChange}
                    placeholder="Summarize features, target application (e.g. clinic, factory, home)…"
                    className="w-full rounded-lg bg-slate-950 border border-white/5 text-xs text-white p-3 focus:outline-none focus:border-brand-red resize-none transition-colors"
                  />
                </div>
              </div>

              {/* ── TECHNICAL SPECS ── */}
              <div className="border-t border-white/5 pt-5 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Technical Specifications
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">Voltage Rating</label>
                    <input type="text" name="voltage" value={form.specifications.voltage} onChange={handleSpecChange}
                      placeholder="e.g. 230V / 400V"
                      className="w-full rounded-lg bg-slate-950 border border-white/5 text-xs text-white p-2.5 focus:outline-none focus:border-brand-red transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">Fuel Capacity</label>
                    <input type="text" name="fuelCapacity" value={form.specifications.fuelCapacity} onChange={handleSpecChange}
                      placeholder="e.g. 200 Liters"
                      className="w-full rounded-lg bg-slate-950 border border-white/5 text-xs text-white p-2.5 focus:outline-none focus:border-brand-red transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">Fuel Cons. (100% Load)</label>
                    <input type="text" name="fuelConsumption" value={form.specifications.fuelConsumption} onChange={handleSpecChange}
                      placeholder="e.g. 15.5 L/hr"
                      className="w-full rounded-lg bg-slate-950 border border-white/5 text-xs text-white p-2.5 focus:outline-none focus:border-brand-red transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">Dimensions (L × W × H)</label>
                    <input type="text" name="dimensions" value={form.specifications.dimensions} onChange={handleSpecChange}
                      placeholder="e.g. 2500 x 1050 x 1500 mm"
                      className="w-full rounded-lg bg-slate-950 border border-white/5 text-xs text-white p-2.5 focus:outline-none focus:border-brand-red transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">Weight (kg)</label>
                    <input type="text" name="weight" value={form.specifications.weight} onChange={handleSpecChange}
                      placeholder="e.g. 1250 kg"
                      className="w-full rounded-lg bg-slate-950 border border-white/5 text-xs text-white p-2.5 focus:outline-none focus:border-brand-red transition-colors" />
                  </div>
                </div>
              </div>

              {/* ── ACTION BUTTONS ── */}
              <div className="flex space-x-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 rounded-lg border border-white/5 bg-slate-950 hover:bg-slate-800 py-3 text-xs font-semibold text-slate-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-brand-red hover:bg-red-600 py-3 text-xs font-bold text-white transition-colors shadow-lg shadow-brand-red/10"
                >
                  {isEditing ? 'Save Changes' : 'Create Product'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
