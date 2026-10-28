import React, { useState } from 'react';
import {
  Heart,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sliders,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

export default function Navbar({
  theme,
  toggleTheme,
  onOpenCustomize,
  activeSection
}) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const handleMusicToggle = () => {
    sound.playPop();
    const playing = sound.toggleMusic();
    setIsPlayingMusic(playing);
  };

  const handleMuteToggle = () => {
    sound.playPop();
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    sound.setVolume(val);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Our Memories', href: '#memories' },
    { name: 'Gratitude', href: '#gratitude' },
    { name: 'Friendship Games', href: '#games' },
    { name: 'Surprise', href: '#surprise' },
  ];

  const handleNavClick = () => {
    sound.playPop();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-pink-200/60 dark:border-purple-800/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={() => sound.playPop()}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 via-rose-400 to-purple-500 flex items-center justify-center text-white shadow-md shadow-pink-300/40 group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-white animate-heartbeat" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
              Our Friendship Forever
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-pink-400 dark:text-purple-300">
              Nanban Love 💖
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => sound.playPop()}
              className="px-3.5 py-2 rounded-full text-sm font-semibold text-slate-700 dark:text-purple-200 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-100/60 dark:hover:bg-purple-900/40 transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Quick Utility Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Background Music Control */}
          <div className="relative flex items-center">
            <button
              onClick={handleMusicToggle}
              title={isPlayingMusic ? "Pause Friendship Lo-Fi" : "Play Friendship Lo-Fi"}
              className={`p-2 sm:px-3 sm:py-2 rounded-full flex items-center gap-1.5 text-xs font-bold transition-all shadow-sm ${
                isPlayingMusic
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-pink-300/50 scale-105'
                  : 'bg-white/80 dark:bg-purple-950/60 text-slate-700 dark:text-purple-200 border border-pink-200 dark:border-purple-800'
              }`}
            >
              {isPlayingMusic ? (
                <>
                  <Pause className="w-4 h-4 animate-pulse" />
                  <span className="hidden sm:inline">Melody On</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-pink-500" />
                  <span className="hidden sm:inline">Music</span>
                </>
              )}
            </button>

            {/* Volume toggle trigger */}
            {isPlayingMusic && (
              <div className="relative">
                <button
                  onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                  className="ml-1 p-2 rounded-full hover:bg-pink-100 dark:hover:bg-purple-900/40 text-slate-600 dark:text-purple-300"
                  title="Adjust Volume"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
                </button>

                {showVolumeSlider && (
                  <div className="absolute top-12 right-0 bg-white dark:bg-purple-950 p-3 rounded-2xl shadow-xl border border-pink-200 dark:border-purple-800 z-50 flex items-center gap-2 w-40">
                    <button onClick={handleMuteToggle}>
                      {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-full accent-pink-500"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Theme Light / Dark Toggle */}
          <button
            onClick={() => {
              sound.playPop();
              toggleTheme();
            }}
            className="p-2 sm:p-2.5 rounded-full bg-white/80 dark:bg-purple-950/60 text-slate-700 dark:text-purple-200 border border-pink-200 dark:border-purple-800 hover:scale-105 transition-transform shadow-sm"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-purple-600" />
            )}
          </button>

          {/* Edit / Customize Button */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenCustomize();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-purple-900/50 hover:bg-pink-200 dark:hover:bg-purple-900/70 border border-pink-200 dark:border-purple-700 transition-all shadow-sm"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              sound.playPop();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="p-2 md:hidden rounded-xl bg-white/80 dark:bg-purple-950/60 text-slate-700 dark:text-purple-200 border border-pink-200 dark:border-purple-800"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-pink-200 dark:border-purple-800 px-6 py-4 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleNavClick}
              className="block px-4 py-2.5 rounded-xl text-base font-semibold text-slate-800 dark:text-white hover:bg-pink-100 dark:hover:bg-purple-900/40"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              sound.playPop();
              setIsMobileMenuOpen(false);
              onOpenCustomize();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 mt-2 rounded-xl text-sm font-bold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-purple-900/50"
          >
            <Sliders className="w-4 h-4" /> Customize Website
          </button>
        </div>
      )}
    </header>
  );
}
