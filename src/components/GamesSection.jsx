import React, { useState } from 'react';
import {
  Gamepad2,
  HelpCircle,
  Sparkles,
  Grid,
  CircleDot,
  Dices,
  HeartHandshake
} from 'lucide-react';
import FriendshipQuiz from '../games/FriendshipQuiz';
import MemoryMatch from '../games/MemoryMatch';
import TicTacToe from '../games/TicTacToe';
import SpinWheel from '../games/SpinWheel';
import GuessFriendship from '../games/GuessFriendship';
import { sound } from '../utils/soundEffects';

export default function GamesSection({
  quizQuestions,
  wheelItems,
  guessQuestions
}) {
  const [activeGame, setActiveGame] = useState('quiz');

  const games = [
    {
      id: 'quiz',
      name: 'Friendship Quiz',
      icon: <HelpCircle className="w-4 h-4" />,
      desc: 'Test your bestie compatibility score!'
    },
    {
      id: 'memory',
      name: 'Memory Match',
      icon: <Grid className="w-4 h-4" />,
      desc: 'Find all matching friendship symbols.'
    },
    {
      id: 'tictactoe',
      name: 'Tic-Tac-Toe',
      icon: <CircleDot className="w-4 h-4" />,
      desc: 'Play Heart 💖 vs Star ⭐ in 2-player or AI mode.'
    },
    {
      id: 'wheel',
      name: 'Spin The Wheel',
      icon: <Dices className="w-4 h-4" />,
      desc: 'Spin for hilarious dares, treats, and secrets.'
    },
    {
      id: 'guess',
      name: 'Guess Our Vibe',
      icon: <HeartHandshake className="w-4 h-4" />,
      desc: 'Fun scenarios and inside jokes showdown.'
    }
  ];

  const handleSelectGame = (id) => {
    sound.playPop();
    setActiveGame(id);
  };

  return (
    <section id="games" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-100 text-pink-700 dark:bg-purple-900/60 dark:text-purple-300 mb-3">
          <Gamepad2 className="w-3.5 h-3.5 text-pink-500" />
          Interactive Play Zone
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-800 dark:text-white tracking-tight font-serif mb-4">
          Friendship Games Arcade 🎮💖
        </h2>
        <p className="text-slate-600 dark:text-purple-200 text-base sm:text-lg">
          Challenge each other, spin for funny dares, test your memory, and make today even more memorable!
        </p>
      </div>

      {/* Game Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 max-w-4xl mx-auto">
        {games.map((g) => {
          const isSelected = activeGame === g.id;
          return (
            <button
              key={g.id}
              onClick={() => handleSelectGame(g.id)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                isSelected
                  ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white shadow-lg shadow-pink-400/40 scale-105'
                  : 'glass-card text-slate-700 dark:text-purple-200 hover:bg-pink-50 dark:hover:bg-purple-900/40 border border-pink-100 dark:border-purple-900/40'
              }`}
            >
              {g.icon}
              <span>{g.name}</span>
            </button>
          );
        })}
      </div>

      {/* Render Active Game */}
      <div className="transition-all duration-300">
        {activeGame === 'quiz' && <FriendshipQuiz questions={quizQuestions} />}
        {activeGame === 'memory' && <MemoryMatch />}
        {activeGame === 'tictactoe' && <TicTacToe />}
        {activeGame === 'wheel' && <SpinWheel items={wheelItems} />}
        {activeGame === 'guess' && <GuessFriendship questions={guessQuestions} />}
      </div>
    </section>
  );
}

