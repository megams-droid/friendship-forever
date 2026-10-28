import React, { useState } from 'react';
import { Music, Disc, X, ExternalLink, Sparkles, Volume2 } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export default function SpotifyPlayer() {
  const [isOpen, setIsOpen] = useState(true); // Default open as a welcome banner, easy to minimize
  const [isMinimized, setIsMinimized] = useState(false);

  const trackId = "4DUnlYjsW1anjSiyfUTo5j";
  const spotifyUrl = "https://open.spotify.com/track/4DUnlYjsW1anjSiyfUTo5j?si=311c9b2e23224895";

  const togglePlayer = () => {
    sound.playPop();
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 max-w-sm w-full px-4 sm:px-0">
      {!isMinimized ? (
        <div className="glass-panel p-4 rounded-3xl border-2 border-pink-300 dark:border-purple-700 shadow-2xl bg-white/95 dark:bg-purple-950/95 backdrop-blur-xl animate-fadeIn transition-all">
          {/* Header */}
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-pink-100 dark:border-purple-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1DB954] to-emerald-400 flex items-center justify-center text-white shadow-md">
                <Music className="w-4 h-4 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-slate-800 dark:text-white">
                    Our Song: Magale 🎵
                  </span>
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#1DB954]/20 text-[#1DB954]">
                    Spotify
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-purple-300 block">
                  Friendship Anthem
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open in Spotify"
                className="p-1.5 rounded-full hover:bg-pink-100 dark:hover:bg-purple-900/40 text-slate-500 dark:text-purple-300 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={togglePlayer}
                title="Minimize player"
                className="p-1.5 rounded-full hover:bg-pink-100 dark:hover:bg-purple-900/40 text-slate-500 dark:text-purple-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Official Spotify Iframe Player */}
          <div className="rounded-2xl overflow-hidden shadow-inner bg-slate-900/10">
            <iframe
              style={{ borderRadius: '16px' }}
              src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Embed: Magale"
              className="w-full"
            />
          </div>

          <div className="mt-2 text-center text-[11px] text-pink-600 dark:text-pink-400 font-semibold flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-pink-500 animate-spin-slow" />
            <span>Press Play on Spotify to enjoy with memories! 💖</span>
          </div>
        </div>
      ) : (
        /* Floating Minimized Pill with rotating disc */
        <button
          onClick={togglePlayer}
          className="ml-auto flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-xl shadow-pink-400/40 hover:scale-105 transition-all group"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center animate-spin-slow">
            <Disc className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <span className="text-xs font-bold block leading-none">
              Magale 🎵
            </span>
            <span className="text-[10px] text-pink-100 opacity-90">
              Open Spotify Player
            </span>
          </div>
        </button>
      )}
    </div>
  );
}
