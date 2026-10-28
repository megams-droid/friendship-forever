import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Timer, Trophy, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';

const EMOJI_CARDS = ['💖', '⭐', '🌸', '🍕', '📸', '🦋', '💌', '✨'];

function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function MemoryMatch() {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const timerRef = useRef(null);

  const initGame = () => {
    sound.playPop();
    const duplicated = [...EMOJI_CARDS, ...EMOJI_CARDS];
    const shuffled = shuffleArray(duplicated).map((emoji, index) => ({
      id: index,
      emoji,
      matched: false
    }));
    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setTimer(0);
    setIsRunning(false);
    setIsCompleted(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    initGame();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Timer loop
  useEffect(() => {
    if (isRunning && !isCompleted) {
      timerRef.current = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, isCompleted]);

  const handleCardClick = (index) => {
    // If already flipped, already matched, or 2 cards are currently flipped
    if (
      flippedIndices.includes(index) ||
      matchedPairs.includes(cards[index].emoji) ||
      flippedIndices.length === 2
    ) {
      return;
    }

    if (!isRunning && !isCompleted) {
      setIsRunning(true);
    }

    sound.playCardFlip();
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx].emoji === cards[secondIdx].emoji) {
        // Matched!
        setTimeout(() => {
          sound.playChime();
          const newMatched = [...matchedPairs, cards[firstIdx].emoji];
          setMatchedPairs(newMatched);
          setFlippedIndices([]);

          // Check if win
          if (newMatched.length === EMOJI_CARDS.length) {
            setIsCompleted(true);
            setIsRunning(false);
            confetti({
              particleCount: 100,
              spread: 80,
              origin: { y: 0.55 }
            });
          }
        }, 400);
      } else {
        // Not matched
        setTimeout(() => {
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <div className="p-6 sm:p-8 glass-panel rounded-3xl border border-pink-200 dark:border-purple-800 shadow-xl max-w-xl mx-auto">
      {/* Game Stats Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white/70 dark:bg-purple-950/40 p-4 rounded-2xl border border-pink-100 dark:border-purple-900/50">
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-purple-500" />
          <span className="text-xs uppercase font-bold text-slate-500 dark:text-purple-300">Time:</span>
          <span className="font-extrabold text-slate-800 dark:text-white font-mono text-base">{formatTime(timer)}</span>
        </div>

        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-pink-500" />
          <span className="text-xs uppercase font-bold text-slate-500 dark:text-purple-300">Moves:</span>
          <span className="font-extrabold text-pink-600 dark:text-pink-400 font-mono text-base">{moves}</span>
        </div>

        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          <span className="text-xs uppercase font-bold text-slate-500 dark:text-purple-300">Pairs:</span>
          <span className="font-extrabold text-rose-600 dark:text-rose-400 font-mono text-base">{matchedPairs.length}/{EMOJI_CARDS.length}</span>
        </div>

        <button
          onClick={initGame}
          className="p-2 rounded-xl text-slate-600 dark:text-purple-200 hover:bg-pink-100 dark:hover:bg-purple-900/40 transition-colors"
          title="Restart Game"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-4 gap-3 sm:gap-4 mb-6">
        {cards.map((card, idx) => {
          const isFlipped = flippedIndices.includes(idx) || matchedPairs.includes(card.emoji);
          const isMatched = matchedPairs.includes(card.emoji);

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(idx)}
              className="h-20 sm:h-24 perspective-1000 cursor-pointer select-none"
            >
              <div
                className={`relative w-full h-full duration-500 transform-style-preserve-3d rounded-2xl transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Card Back (Hidden Emoji) */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-gradient-to-tr from-pink-400 via-rose-300 to-purple-400 p-0.5 shadow-md flex items-center justify-center hover:scale-[1.03] transition-transform">
                  <div className="w-full h-full bg-white/40 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <span className="text-xl">🌸</span>
                  </div>
                </div>

                {/* Card Front (Revealed Emoji) */}
                <div
                  className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl shadow-md flex items-center justify-center text-3xl sm:text-4xl transition-all ${
                    isMatched
                      ? 'bg-gradient-to-tr from-pink-100 to-purple-100 dark:from-purple-900/80 dark:to-pink-900/80 border-2 border-pink-400 scale-[0.98]'
                      : 'bg-white dark:bg-purple-950 border border-pink-200 dark:border-purple-800'
                  }`}
                >
                  <span className={isMatched ? 'animate-bounce' : ''}>{card.emoji}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Victory Celebration Modal */}
      {isCompleted && (
        <div className="mt-4 p-6 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 border-2 border-pink-400 rounded-2xl text-center animate-pulse-subtle">
          <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-2 animate-bounce" />
          <h4 className="text-xl font-black text-slate-800 dark:text-white mb-1">
            Super Memory Duo! 🎉
          </h4>
          <p className="text-sm text-slate-600 dark:text-purple-200 mb-4">
            You matched all friendship cards in <span className="font-bold text-pink-600">{formatTime(timer)}</span> with <span className="font-bold text-purple-600">{moves} moves</span>!
          </p>
          <button
            onClick={initGame}
            className="px-6 py-2.5 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-md transition-transform hover:scale-105"
          >
            Play Again 🔄
          </button>
        </div>
      )}
    </div>
  );
}
