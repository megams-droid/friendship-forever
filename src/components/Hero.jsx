import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Clock, Calendar, ArrowDown, Award, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';

export default function Hero({
  heading,
  subtitle,
  startDate,
  onOpenHeart,
  onCustomizeDate
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const difference = now - start;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  const handleOpenHeartClick = () => {
    sound.playChime();
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 }
    });
    onOpenHeart();
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Pastel Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-pink-300/30 via-purple-300/30 to-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Cute Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 dark:bg-purple-900/50 border border-pink-200 dark:border-purple-700 shadow-sm text-pink-700 dark:text-pink-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-6 animate-pulse-subtle">
          <Sparkles className="w-4 h-4 text-pink-500 animate-spin-slow" />
          <span>To My Inseparable Best Friend</span>
          <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
        </div>

        {/* Master Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.15] mb-6 font-serif">
          <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
            {heading || "Bestest besttttttt Nanbanneyyyyyyyy 💗"}
          </span>
        </h1>

        {/* Emotional Subtitle */}
        <p className="text-lg sm:text-2xl text-slate-700 dark:text-purple-100 font-medium max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
          {subtitle || "Thank you for making my life brighter, happier, and more meaningful."}
        </p>

        {/* Call-to-action button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={handleOpenHeartClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-extrabold text-lg text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-xl shadow-pink-400/40 hover:scale-105 transition-all duration-300"
          >
            <span className="text-2xl group-hover:rotate-12 transition-transform">💌</span>
            <span>Open My Heart 💌</span>
            <Sparkles className="w-5 h-5 text-yellow-200 animate-spin-slow" />
          </button>

          <a
            href="#memories"
            onClick={() => sound.playPop()}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-bold text-base text-slate-700 dark:text-purple-200 glass-card hover:bg-pink-50/80 dark:hover:bg-purple-900/40 border border-pink-200 dark:border-purple-800 transition-all hover:scale-105"
          >
            <span>Our Memories 📸</span>
          </a>
        </div>

        {/* Live Friendship Counter Card */}
        <div className="glass-panel max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl border border-pink-200/80 dark:border-purple-800/80 shadow-2xl relative">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-pink-100 dark:border-purple-900/40">
            <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>We Have Been Inseparable For:</span>
            </div>
            <button
              onClick={() => {
                sound.playPop();
                onCustomizeDate();
              }}
              className="text-xs font-semibold text-purple-600 dark:text-purple-300 hover:underline flex items-center gap-1"
              title="Change friendship start date"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Edit Date</span>
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            <div className="bg-gradient-to-b from-pink-50 to-white dark:from-purple-950/60 dark:to-purple-900/30 p-3 sm:p-4 rounded-2xl border border-pink-100 dark:border-purple-800/50 shadow-sm">
              <div className="text-2xl sm:text-4xl md:text-5xl font-black text-pink-600 dark:text-pink-400 font-mono">
                {timeLeft.days}
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-purple-300 uppercase mt-1">
                Days
              </div>
            </div>

            <div className="bg-gradient-to-b from-pink-50 to-white dark:from-purple-950/60 dark:to-purple-900/30 p-3 sm:p-4 rounded-2xl border border-pink-100 dark:border-purple-800/50 shadow-sm">
              <div className="text-2xl sm:text-4xl md:text-5xl font-black text-purple-600 dark:text-purple-300 font-mono">
                {timeLeft.hours}
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-purple-300 uppercase mt-1">
                Hours
              </div>
            </div>

            <div className="bg-gradient-to-b from-pink-50 to-white dark:from-purple-950/60 dark:to-purple-900/30 p-3 sm:p-4 rounded-2xl border border-pink-100 dark:border-purple-800/50 shadow-sm">
              <div className="text-2xl sm:text-4xl md:text-5xl font-black text-rose-500 dark:text-rose-400 font-mono">
                {timeLeft.minutes}
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-purple-300 uppercase mt-1">
                Mins
              </div>
            </div>

            <div className="bg-gradient-to-b from-pink-50 to-white dark:from-purple-950/60 dark:to-purple-900/30 p-3 sm:p-4 rounded-2xl border border-pink-100 dark:border-purple-800/50 shadow-sm">
              <div className="text-2xl sm:text-4xl md:text-5xl font-black text-amber-500 dark:text-amber-400 font-mono">
                {timeLeft.seconds}
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-purple-300 uppercase mt-1">
                Secs
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-slate-500 dark:text-purple-300 italic">
            ...and counting every single heartbeat of this timeless friendship! 💖
          </p>
        </div>

        {/* Little scroll-down teaser */}
        <div className="mt-10 flex justify-center">
          <a
            href="#memories"
            onClick={() => sound.playPop()}
            className="p-3 rounded-full bg-white/70 dark:bg-purple-950/40 border border-pink-200 dark:border-purple-800 text-pink-500 hover:text-pink-600 animate-bounce shadow-sm"
          >
            <ArrowDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
