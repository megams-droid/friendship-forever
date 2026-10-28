import React, { useState } from 'react';
import {
  Heart,
  Sparkles,
  Award,
  Shield,
  Smile,
  HeartHandshake,
  Compass,
  Coffee,
  CheckCircle,
  Gift,
  X,
  PhoneCall,
  Trophy,
  Pizza,
  Infinity as InfinityIcon,
  MessageCircleHeart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';

const iconMap = {
  Sparkles: <Sparkles className="w-6 h-6 text-pink-500" />,
  ShieldCheck: <Shield className="w-6 h-6 text-purple-500" />,
  Smile: <Smile className="w-6 h-6 text-amber-500" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6 text-rose-500" />,
  Compass: <Compass className="w-6 h-6 text-indigo-500" />,
  Coffee: <Coffee className="w-6 h-6 text-orange-500" />,
  PhoneCall: <PhoneCall className="w-5 h-5 text-pink-500" />,
  Trophy: <Trophy className="w-5 h-5 text-yellow-500" />,
  Shield: <Shield className="w-5 h-5 text-purple-500" />,
  Pizza: <Pizza className="w-5 h-5 text-red-500" />,
  Heart: <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />,
  Infinity: <InfinityIcon className="w-5 h-5 text-purple-500" />
};

export default function GratitudeSection({
  letter,
  reasons,
  appreciationCards,
  promises,
  friends,
  onOpenCustomize
}) {
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);
  const [activeReason, setActiveReason] = useState(null);

  const handleRevealSurprise = () => {
    sound.playChime();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 }
    });
    setShowSurpriseModal(true);
  };

  return (
    <section id="gratitude" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-100 text-pink-700 dark:bg-purple-900/60 dark:text-purple-300 mb-3">
          <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
          Gratitude & Pure Appreciation
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-800 dark:text-white tracking-tight font-serif mb-4">
          Words From My Heart 💌
        </h2>
        <p className="text-slate-600 dark:text-purple-200 text-base sm:text-lg">
          For every smile you brought, every tear you wiped, and every quiet moment you stood by me.
        </p>
      </div>

      {/* 1. The Personal Thank-You Letter */}
      <div className="max-w-4xl mx-auto mb-20 relative">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border-2 border-pink-200/90 dark:border-purple-800/80 shadow-2xl relative overflow-hidden bg-gradient-to-br from-pink-50/80 via-white/90 to-purple-50/70 dark:from-purple-950/70 dark:via-purple-900/40 dark:to-pink-950/50">
          {/* Subtle Decorative Wax Seal */}
          <div className="absolute top-6 right-6 w-14 h-14 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 shadow-lg shadow-rose-400/50 flex items-center justify-center text-white font-serif text-xl font-bold select-none rotate-12">
            💖
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-pink-500 dark:text-pink-400 block mb-2">
            {letter.title}
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white font-serif mb-6">
            {letter.salutation}
          </h3>

          <div className="space-y-4 text-slate-700 dark:text-purple-100 text-base sm:text-lg leading-relaxed font-sans font-normal">
            {letter.bodyParagraphs.map((para, idx) => (
              <p key={idx} className="indent-4">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-pink-200 dark:border-purple-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase font-semibold text-slate-500 dark:text-purple-300">
                {letter.closing}
              </p>
              <p className="text-2xl sm:text-3xl font-handwriting text-pink-600 dark:text-pink-400 font-bold mt-1">
                {letter.signature}
              </p>
            </div>

            <button
              onClick={handleRevealSurprise}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-md shadow-pink-400/40 hover:scale-105 transition-all"
            >
              <Gift className="w-4 h-4 animate-bounce" />
              <span>Reveal Surprise Message 💌</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Reasons Why You Are Special */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 block mb-1">
            Unforgettable Qualities
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-800 dark:text-white font-serif">
            Why You Are So Irreplaceable ✨
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.id}
              onClick={() => {
                sound.playPop();
                setActiveReason(activeReason === reason.id ? null : reason.id);
              }}
              className={`glass-card p-6 rounded-3xl cursor-pointer select-none transition-all duration-300 ${
                activeReason === reason.id
                  ? 'ring-2 ring-pink-500 bg-pink-50/90 dark:bg-purple-900/50 scale-[1.02]'
                  : ''
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-purple-900/60 flex items-center justify-center mb-4 shadow-sm">
                {iconMap[reason.icon] || <Sparkles className="w-6 h-6 text-pink-500" />}
              </div>
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                {reason.title}
              </h4>
              <p className="text-sm text-slate-600 dark:text-purple-200 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Appreciation Cards */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400 block mb-1">
            Heartfelt Notes
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-800 dark:text-white font-serif">
            Appreciation For Every Little Moment 🌸
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appreciationCards.map((card) => (
            <div
              key={card.id}
              className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${card.color} border border-pink-200/80 dark:border-purple-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-white/80 dark:bg-purple-900/80 text-pink-600 dark:text-pink-300 mb-3 shadow-sm">
                {card.badge}
              </div>
              <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                {card.title}
              </h4>
              <p className="text-sm sm:text-base text-slate-700 dark:text-purple-200 leading-relaxed">
                {card.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Friendship Promises */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 block mb-1">
            Written In Stars
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-800 dark:text-white font-serif">
            My Sacred Promises To You 🤞✨
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {promises.map((promise) => (
            <div
              key={promise.id}
              className="glass-card p-5 rounded-2xl flex items-center gap-4 hover:border-pink-400 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-purple-900/60 flex items-center justify-center shrink-0">
                {iconMap[promise.icon] || <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />}
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-purple-100 leading-snug">
                {promise.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Customizable Friends Messages Spotlight */}
      <div className="mb-20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400 block mb-1">
              The Squad
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white font-serif">
              Our Circle of Forever Friends 💖
            </h3>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              onOpenCustomize();
            }}
            className="text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline flex items-center gap-1.5"
          >
            <span>Edit Friends & Messages</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className="glass-card p-6 sm:p-7 rounded-3xl flex flex-col sm:flex-row items-center sm:items-start gap-5 hover:scale-[1.01] transition-transform"
            >
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-24 h-24 rounded-2xl object-cover shadow-md border-2 border-pink-200 dark:border-purple-800 shrink-0"
              />
              <div className="text-center sm:text-left">
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-pink-100 text-pink-700 dark:bg-purple-900/70 dark:text-purple-300 mb-2">
                  {friend.tag}
                </span>
                <h4 className="text-xl font-bold text-slate-800 dark:text-white">
                  {friend.name}
                </h4>
                <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mb-3">
                  {friend.role}
                </p>
                <p className="text-sm text-slate-600 dark:text-purple-200 italic leading-relaxed">
                  &ldquo;{friend.message}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Grand Final Message Quote Banner */}
      <div className="text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-pink-500/15 border-2 border-pink-300 dark:border-purple-700 shadow-xl max-w-4xl mx-auto">
        <Heart className="w-10 h-10 text-pink-500 fill-pink-500 mx-auto mb-4 animate-heartbeat" />
        <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-slate-800 dark:text-white leading-snug mb-4">
          &ldquo;No matter where life takes us, you will always have a special place in my heart.&rdquo;
        </blockquote>
        <p className="text-sm sm:text-base font-semibold text-pink-600 dark:text-pink-400 uppercase tracking-widest">
          — Today, Tomorrow & Every Lifetime 💖
        </p>
      </div>

      {/* Surprise Message Modal */}
      {showSurpriseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-lg w-full border-2 border-pink-400 shadow-2xl relative text-center">
            <button
              onClick={() => {
                sound.playPop();
                setShowSurpriseModal(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-pink-100 dark:hover:bg-purple-900/50 text-slate-600 dark:text-purple-300"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-400 to-purple-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-400/40">
              <MessageCircleHeart className="w-8 h-8 animate-bounce" />
            </div>

            <span className="text-xs uppercase font-extrabold tracking-wider text-pink-600 dark:text-pink-400 block mb-1">
              A Secret Whisper For You 💌
            </span>
            <h4 className="text-2xl font-black text-slate-800 dark:text-white mb-3">
              You Mean The World To Me!
            </h4>
            <p className="text-slate-600 dark:text-purple-200 text-sm sm:text-base leading-relaxed mb-6">
              Even if days pass where we are busy with work or study, never forget that you are my safest place, my favorite laughs, and my truest friend. Thank you for simply existing as you are!
            </p>

            <button
              onClick={() => {
                sound.playPop();
                setShowSurpriseModal(false);
              }}
              className="px-8 py-3 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-md transition-all hover:scale-105"
            >
              Love You Bestie! 💖
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
