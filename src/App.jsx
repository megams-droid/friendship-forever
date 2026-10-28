import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GratitudeSection from './components/GratitudeSection';
import MemoriesGallery from './components/MemoriesGallery';
import GamesSection from './components/GamesSection';
import SurpriseSection from './components/SurpriseSection';
import Footer from './components/Footer';
import FloatingHearts from './components/FloatingHearts';
import CustomizeModal from './components/CustomizeModal';
import { defaultFriendshipData } from './data/friendshipData';

export default function App() {
  // Theme state: explicitly defaulting to light mode as requested!
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('friendship_theme') || 'light';
  });

  // Friendship site data state with persistence
  const [siteData, setSiteData] = useState(() => {
    try {
      const saved = localStorage.getItem('friendship_site_data');
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaultFriendshipData;
  });

  // Memories state with persistence
  const [memories, setMemories] = useState(() => {
    try {
      const saved = localStorage.getItem('friendship_memories');
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaultFriendshipData.memories;
  });

  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  // Sync theme with DOM and localStorage
  useEffect(() => {
    localStorage.setItem('friendship_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.remove('bg-gradient-to-br', 'from-[#FFF5F8]', 'via-[#FAF5FF]', 'to-[#F5F3FF]');
      document.body.classList.add('bg-gradient-to-br', 'from-[#120D1A]', 'via-[#181124]', 'to-[#20152F]', 'text-purple-100');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('from-[#120D1A]', 'via-[#181124]', 'to-[#20152F]', 'text-purple-100');
      document.body.classList.add('bg-gradient-to-br', 'from-[#FFF5F8]', 'via-[#FAF5FF]', 'to-[#F5F3FF]', 'text-slate-800');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSaveData = (newData) => {
    setSiteData(newData);
    localStorage.setItem('friendship_site_data', JSON.stringify(newData));
  };

  const handleResetData = () => {
    setSiteData(defaultFriendshipData);
    setMemories(defaultFriendshipData.memories);
    localStorage.removeItem('friendship_site_data');
    localStorage.removeItem('friendship_memories');
  };

  const handleAddMemory = (newMem) => {
    const updated = [newMem, ...memories];
    setMemories(updated);
    localStorage.setItem('friendship_memories', JSON.stringify(updated));
  };

  const handleScrollToGratitude = () => {
    const el = document.getElementById('gratitude');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const friendNames = siteData.friends.map(f => f.name);

  return (
    <div className="relative min-h-screen transition-colors duration-500 overflow-x-hidden">
      {/* Background Floating Hearts and Ambient Sparkles */}
      <FloatingHearts />

      {/* Navigation Header */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
      />

      {/* Main Content */}
      <main className="relative z-10">
        {/* 1. Hero Section */}
        <Hero
          heading={siteData.heading}
          subtitle={siteData.subtitle}
          startDate={siteData.startDate}
          onOpenHeart={handleScrollToGratitude}
          onCustomizeDate={() => setIsCustomizeOpen(true)}
        />

        {/* 2. Memories Gallery */}
        <MemoriesGallery
          memories={memories}
          onAddMemory={handleAddMemory}
        />

        {/* 3. Gratitude & Personal Letter Section */}
        <GratitudeSection
          letter={siteData.letter}
          reasons={siteData.reasonsWhySpecial}
          appreciationCards={siteData.appreciationCards}
          promises={siteData.promises}
          friends={siteData.friends}
          onOpenCustomize={() => setIsCustomizeOpen(true)}
        />

        {/* 4. Friendship Games (5 working games) */}
        <GamesSection
          quizQuestions={siteData.quizQuestions}
          wheelItems={siteData.wheelItems}
          guessQuestions={siteData.guessFriendshipQuestions}
        />

        {/* 5. Surprise Mystery Box */}
        <SurpriseSection friendNames={friendNames} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Customization Modal */}
      <CustomizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        data={siteData}
        onSave={handleSaveData}
        onReset={handleResetData}
      />
    </div>
  );
}
