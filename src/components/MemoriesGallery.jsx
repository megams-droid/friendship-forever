import React, { useState } from 'react';
import {
  Camera,
  Calendar,
  Sparkles,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
  Heart,
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';

export default function MemoriesGallery({
  memories,
  onAddMemory,
  onEditMemory,
  onDeleteMemory
}) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMemory, setNewMemory] = useState({
    title: '',
    date: '',
    tag: 'Besties',
    image: '',
    description: ''
  });

  const tags = ['All', 'Besties', 'Funny', 'Together', 'Peaceful'];

  const filteredMemories = activeFilter === 'All'
    ? memories
    : memories.filter(m => m.tag?.toLowerCase() === activeFilter.toLowerCase());

  const openLightbox = (index) => {
    sound.playPop();
    setSelectedPhotoIdx(index);
  };

  const closeLightbox = () => {
    sound.playPop();
    setSelectedPhotoIdx(null);
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    sound.playPop();
    setSelectedPhotoIdx((prev) => (prev + 1) % filteredMemories.length);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    sound.playPop();
    setSelectedPhotoIdx((prev) => (prev - 1 + filteredMemories.length) % filteredMemories.length);
  };

  const handleImageFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMemory(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveNewMemory = (e) => {
    e.preventDefault();
    if (!newMemory.title || !newMemory.image) {
      alert("Please provide a title and an image!");
      return;
    }
    sound.playChime();
    confetti({ particleCount: 60, spread: 60 });
    onAddMemory({
      ...newMemory,
      id: `mem-${Date.now()}`
    });
    setNewMemory({ title: '', date: '', tag: 'Besties', image: '', description: '' });
    setIsAddModalOpen(false);
  };

  return (
    <section id="memories" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-100 text-pink-700 dark:bg-purple-900/60 dark:text-purple-300 mb-3">
          <Camera className="w-3.5 h-3.5 text-pink-500" />
          Treasured Snapshots
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-800 dark:text-white tracking-tight font-serif mb-4">
          Our Memories Gallery 📸
        </h2>
        <p className="text-slate-600 dark:text-purple-200 text-base sm:text-lg">
          Captured smiles, playful teasing, and the timeless adventures we will talk about when we are 80.
        </p>
      </div>

      {/* Filter and Add Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                sound.playPop();
                setActiveFilter(tag);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeFilter === tag
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-300/40 scale-105'
                  : 'bg-white/80 dark:bg-purple-950/40 text-slate-700 dark:text-purple-200 hover:bg-pink-100 dark:hover:bg-purple-900/40 border border-pink-100 dark:border-purple-900/40'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            sound.playPop();
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-md shadow-pink-400/30 transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4" /> Add New Memory
        </button>
      </div>

      {/* Gallery Cards Grid (Polaroid Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {filteredMemories.map((mem, idx) => (
          <div
            key={mem.id}
            onClick={() => openLightbox(idx)}
            className="group glass-card p-4 rounded-3xl cursor-pointer hover:-translate-y-2 hover:rotate-1 transition-all duration-300 shadow-lg flex flex-col justify-between"
          >
            {/* Image Container with Polaroid Feel */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-slate-100 dark:bg-purple-950">
              <img
                src={mem.image}
                alt={mem.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/90 dark:bg-purple-950/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold text-pink-600 dark:text-pink-300 shadow-sm flex items-center gap-1">
                <Tag className="w-2.5 h-2.5" />
                <span>{mem.tag || 'Memory'}</span>
              </div>

              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <span className="p-3 bg-white/30 backdrop-blur-md rounded-full shadow-lg">
                  <Maximize2 className="w-5 h-5 text-white" />
                </span>
              </div>
            </div>

            {/* Caption & Metadata */}
            <div>
              <div className="flex items-center justify-between text-[11px] text-purple-600 dark:text-purple-300 font-semibold mb-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {mem.date || 'Timeless'}
                </span>
                <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
              </div>
              <h4 className="text-base font-bold text-slate-800 dark:text-white line-clamp-1 mb-1 font-serif">
                {mem.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-purple-200 line-clamp-2 leading-relaxed">
                {mem.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIdx !== null && filteredMemories[selectedPhotoIdx] && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row bg-white dark:bg-purple-950 rounded-3xl overflow-hidden shadow-2xl border border-pink-300 dark:border-purple-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 p-2.5 bg-black/50 text-white hover:bg-black/80 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left/Prev Arrow */}
            <button
              onClick={handlePrevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-white/80 dark:bg-purple-900/80 hover:bg-white text-slate-800 dark:text-white rounded-full shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right/Next Arrow */}
            <button
              onClick={handleNextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-white/80 dark:bg-purple-900/80 hover:bg-white text-slate-800 dark:text-white rounded-full shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image section */}
            <div className="w-full md:w-3/5 bg-slate-900 flex items-center justify-center p-2 min-h-[300px]">
              <img
                src={filteredMemories[selectedPhotoIdx].image}
                alt={filteredMemories[selectedPhotoIdx].title}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl"
              />
            </div>

            {/* Details section */}
            <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-700 dark:bg-purple-900 dark:text-purple-300 mb-3">
                  {filteredMemories[selectedPhotoIdx].tag}
                </span>
                <h3 className="text-2xl font-black text-slate-800 dark:text-white font-serif mb-2">
                  {filteredMemories[selectedPhotoIdx].title}
                </h3>
                <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mb-4 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {filteredMemories[selectedPhotoIdx].date}
                </p>
                <p className="text-sm sm:text-base text-slate-600 dark:text-purple-200 leading-relaxed">
                  {filteredMemories[selectedPhotoIdx].description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-pink-100 dark:border-purple-900/40 text-xs text-slate-400">
                Photo {selectedPhotoIdx + 1} of {filteredMemories.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Memory Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-md w-full border border-pink-300 dark:border-purple-800 shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-pink-100 dark:hover:bg-purple-900/40"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black text-slate-800 dark:text-white font-serif mb-4">
              Add A Precious Memory 📸
            </h3>

            <form onSubmit={handleSaveNewMemory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 dark:text-purple-300 mb-1">
                  Memory Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Unstoppable Day Out!"
                  value={newMemory.title}
                  onChange={(e) => setNewMemory({ ...newMemory, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-pink-200 dark:border-purple-800 bg-white/80 dark:bg-purple-950/60 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 dark:text-purple-300 mb-1">
                  Date / Occasion
                </label>
                <input
                  type="text"
                  placeholder="e.g. Summer Vacation, 2024"
                  value={newMemory.date}
                  onChange={(e) => setNewMemory({ ...newMemory, date: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-pink-200 dark:border-purple-800 bg-white/80 dark:bg-purple-950/60 text-slate-800 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 dark:text-purple-300 mb-1">
                  Photo (Choose File or Paste URL)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileUpload}
                  className="w-full text-xs text-slate-600 dark:text-purple-200 mb-2 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200"
                />
                <input
                  type="url"
                  placeholder="Or paste an image URL here..."
                  value={newMemory.image}
                  onChange={(e) => setNewMemory({ ...newMemory, image: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-pink-200 dark:border-purple-800 bg-white/80 dark:bg-purple-950/60 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 dark:text-purple-300 mb-1">
                  Tag
                </label>
                <select
                  value={newMemory.tag}
                  onChange={(e) => setNewMemory({ ...newMemory, tag: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-pink-200 dark:border-purple-800 bg-white/80 dark:bg-purple-950/60 text-slate-800 dark:text-white text-sm"
                >
                  <option value="Besties">Besties</option>
                  <option value="Funny">Funny</option>
                  <option value="Together">Together</option>
                  <option value="Peaceful">Peaceful</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 dark:text-purple-300 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  placeholder="What made this moment special?"
                  value={newMemory.description}
                  onChange={(e) => setNewMemory({ ...newMemory, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-pink-200 dark:border-purple-800 bg-white/80 dark:bg-purple-950/60 text-slate-800 dark:text-white text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-md text-sm mt-2"
              >
                Save To Memory Vault ✨
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
