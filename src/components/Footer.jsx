import React from 'react';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export default function Footer() {
  const scrollToTop = () => {
    sound.playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-pink-200/80 dark:border-purple-800/80 glass-panel py-12 px-4 sm:px-6 lg:px-8 relative z-10 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand Signoff */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 to-purple-500 flex items-center justify-center text-white shadow-md">
            <Heart className="w-5 h-5 fill-white animate-heartbeat" />
          </div>
          <div>
            <h4 className="font-serif font-black text-lg text-slate-800 dark:text-white">
              Our Friendship Forever
            </h4>
            <p className="text-xs text-slate-500 dark:text-purple-300">
              Crafted with endless love, laughter, and grateful hearts 💖
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600 dark:text-purple-200">
          <a href="#home" onClick={() => sound.playPop()} className="hover:text-pink-600">Home</a>
          <span>•</span>
          <a href="#memories" onClick={() => sound.playPop()} className="hover:text-pink-600">Memories</a>
          <span>•</span>
          <a href="#gratitude" onClick={() => sound.playPop()} className="hover:text-pink-600">Gratitude</a>
          <span>•</span>
          <a href="#games" onClick={() => sound.playPop()} className="hover:text-pink-600">Games</a>
          <span>•</span>
          <a href="#surprise" onClick={() => sound.playPop()} className="hover:text-pink-600">Surprise</a>
        </div>

        {/* Back To Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-purple-900/60 hover:bg-pink-200 dark:hover:bg-purple-900 transition-all hover:scale-105 shadow-sm"
        >
          <span>Back To Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="text-center mt-8 pt-6 border-t border-pink-100 dark:border-purple-900/40 text-[11px] text-slate-400 dark:text-purple-400">
        Bestest besttttttt Nanbanneyyyyyyyy 💗 • Always In My Heart
      </div>
    </footer>
  );
}

