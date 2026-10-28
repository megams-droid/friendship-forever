import React, { useState } from 'react';
import { Gift, Sparkles, Heart, RotateCcw, Award, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';

export default function SurpriseSection({ friendNames = ["Bestest Nanban", "My Forever Bestie"] }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    sound.playChime();
    setIsOpen(true);
    // Multistage celebratory confetti
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 }
    });
    setTimeout(() => {
      confetti({
        particleCount: 70,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 70,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 400);
  };

  const handleReplay = () => {
    sound.playPop();
    setIsOpen(false);
  };

  return (
    <section id="surprise" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center relative">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-100 text-pink-700 dark:bg-purple-900/60 dark:text-purple-300 mb-3">
          <Gift className="w-3.5 h-3.5 text-pink-500" />
          A Secret For You
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-800 dark:text-white tracking-tight font-serif mb-4">
          Open Your Mystery Surprise 🎁
        </h2>
        <p className="text-slate-600 dark:text-purple-200 text-base">
          {isOpen
            ? "Here is what has been in my heart all along!"
            : "A sealed digital keepsake crafted specially for my favorite human."}
        </p>
      </div>

      {!isOpen ? (
        /* Closed Digital Gift Box / Envelope with bounce animation */
        <div className="flex flex-col items-center justify-center py-8">
          <div
            onClick={handleOpenGift}
            className="cursor-pointer group relative p-8 select-none"
          >
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-pink-400/30 rounded-full blur-2xl group-hover:bg-pink-500/40 transition-colors" />

            {/* Gift Box Graphic */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 shadow-2xl p-4 flex flex-col items-center justify-center text-white gift-bounce group-hover:scale-105 transition-transform duration-300">
              {/* Ribbon Cross */}
              <div className="absolute top-0 bottom-0 w-8 bg-yellow-300/80 shadow-md" />
              <div className="absolute left-0 right-0 h-8 bg-yellow-300/80 shadow-md" />

              {/* Bow on Top */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-yellow-400 border-4 border-white shadow-lg flex items-center justify-center text-2xl font-black text-pink-700 animate-spin-slow">
                ✨
              </div>

              <span className="relative z-10 mt-6 text-xs sm:text-sm font-extrabold uppercase tracking-widest bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                Tap To Open! 💖
              </span>
            </div>
          </div>

          <button
            onClick={handleOpenGift}
            className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg shadow-pink-400/30 hover:scale-105 transition-all"
          >
            <Sparkles className="w-5 h-5" />
            <span>Unwrap The Surprise!</span>
          </button>
        </div>
      ) : (
        /* Opened Surprise: Heartfelt Message + BFF Certificate */
        <div className="animate-fadeIn max-w-3xl mx-auto">
          {/* Certificate of Best Friendship */}
          <div className="p-8 sm:p-12 glass-panel rounded-3xl border-4 border-yellow-300 dark:border-yellow-500/60 shadow-2xl relative overflow-hidden bg-gradient-to-br from-amber-50/90 via-pink-50/90 to-purple-50/90 dark:from-purple-950/80 dark:via-purple-900/60 dark:to-pink-950/60 mb-8">
            {/* Watermark / Seal */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-300/20 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center justify-center gap-2 mb-2 text-yellow-600 dark:text-yellow-400 font-extrabold text-xs uppercase tracking-widest">
              <Award className="w-4 h-4" />
              <span>Official Lifetime Degree</span>
              <Award className="w-4 h-4" />
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 dark:text-white font-serif tracking-tight mb-2">
              Certificate of Bestest Nanban 💖
            </h3>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-purple-300 uppercase tracking-widest font-semibold mb-6">
              Recognized Across All Galaxies and Eras
            </p>

            <div className="my-6 py-6 border-y border-pink-200 dark:border-purple-800 text-slate-700 dark:text-purple-100 space-y-3">
              <p className="text-base sm:text-lg font-serif italic">
                This certifies that
              </p>
              <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent font-serif">
                {friendNames.join(' & ')}
              </div>
              <p className="text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-sans">
                have officially earned the title of <strong>Forever Soulmate Friends</strong>. Granted unlimited hugs, lifetime priority listening, zero-judgment therapy sessions, and 100% unconditional loyalty.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
              <div className="text-left">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                  Date of Certification:
                </span>
                <span className="text-sm font-bold text-slate-700 dark:text-purple-200">
                  Always & Forever
                </span>
              </div>

              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 text-white flex items-center justify-center font-bold text-2xl shadow-md border-2 border-white">
                ⭐
              </div>

              <div className="text-right">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                  Sealed By:
                </span>
                <span className="text-lg font-handwriting font-bold text-pink-600 dark:text-pink-400">
                  With Infinite Gratitude 💖
                </span>
              </div>
            </div>
          </div>

          {/* Replay Button */}
          <button
            onClick={handleReplay}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-slate-700 dark:text-purple-200 glass-card hover:bg-pink-100 dark:hover:bg-purple-900/40 border border-pink-200 dark:border-purple-800 transition-all hover:scale-105"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Wrap Up & Replay Surprise</span>
          </button>
        </div>
      )}
    </section>
  );
}

