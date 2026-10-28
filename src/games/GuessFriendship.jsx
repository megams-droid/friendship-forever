import React, { useState } from 'react';
import { Sparkles, CheckCircle2, RotateCcw, Heart, SmilePlus, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';

export default function GuessFriendship({ questions = [] }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIdx] || questions[0];

  const handlePick = (optIdx) => {
    sound.playPop();
    setAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
    setRevealed(prev => ({ ...prev, [currentIdx]: true }));
  };

  const handleNext = () => {
    sound.playPop();
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsFinished(true);
      sound.playChime();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleReset = () => {
    sound.playPop();
    setAnswers({});
    setRevealed({});
    setCurrentIdx(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="p-8 text-center glass-panel rounded-3xl border border-pink-200 dark:border-purple-800 shadow-xl max-w-xl mx-auto">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-tr from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-pink-300/40">
          <Heart className="w-8 h-8 fill-white animate-heartbeat" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 block mb-2">
          Friendship Verdict 💖
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white mb-3">
          100% Certified Iconic Duo! 👯‍♀️
        </h3>
        <p className="text-slate-600 dark:text-purple-200 text-sm sm:text-base leading-relaxed mb-6">
          Whether laughing at silly mishaps, answering without speaking, or sharing endless food and chats, your bond is as genuine and heartwarming as it gets!
        </p>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-md transition-all hover:scale-105"
        >
          <RotateCcw className="w-4 h-4" /> Play Guessing Again
        </button>
      </div>
    );
  }

  const isCurrentRevealed = revealed[currentIdx];

  return (
    <div className="p-6 sm:p-8 glass-panel rounded-3xl border border-pink-200 dark:border-purple-800 shadow-xl max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
          Friendship Scenario {currentIdx + 1} of {questions.length}
        </span>
        <span className="text-xs font-semibold text-slate-500 dark:text-purple-300">
          Choose what fits us best!
        </span>
      </div>

      {/* Scenario */}
      <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mb-5 leading-snug">
        {currentQ.scenario}
      </h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {currentQ.options.map((opt, oIdx) => {
          const isSelected = answers[currentIdx] === oIdx;
          const isFav = currentQ.favoriteAnswer === oIdx;

          return (
            <button
              key={oIdx}
              onClick={() => handlePick(oIdx)}
              className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                isSelected
                  ? 'bg-gradient-to-r from-pink-100 to-purple-100 dark:from-purple-900/70 dark:to-pink-900/60 border-pink-500 shadow-sm'
                  : 'bg-white/80 dark:bg-purple-950/40 border-pink-100 dark:border-purple-900/40 hover:bg-pink-50/70 dark:hover:bg-purple-900/20'
              }`}
            >
              <span className={`text-sm sm:text-base font-medium ${
                isSelected ? 'text-pink-900 dark:text-white font-semibold' : 'text-slate-700 dark:text-purple-100'
              }`}>
                {opt}
              </span>
              {isSelected && <CheckCircle2 className="w-5 h-5 text-pink-500 shrink-0 ml-2" />}
            </button>
          );
        })}
      </div>

      {/* Fun Takeaway Note when an answer is selected */}
      {isCurrentRevealed && (
        <div className="p-4 mb-6 bg-pink-50 dark:bg-purple-950/60 rounded-2xl border border-pink-200 dark:border-purple-800 text-xs sm:text-sm text-pink-800 dark:text-purple-200 flex items-center gap-2 animate-pulse-subtle">
          <SmilePlus className="w-5 h-5 text-pink-500 shrink-0" />
          <span><strong>Friendship Note:</strong> {currentQ.takeaway}</span>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleNext}
          disabled={answers[currentIdx] === undefined}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all shadow-md ${
            answers[currentIdx] === undefined
              ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed'
              : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:scale-105 shadow-pink-300/40'
          }`}
        >
          {currentIdx === questions.length - 1 ? "See Our Friendship Verdict 💖" : "Next Scenario"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

