import React, { useState } from 'react';
import { Award, CheckCircle2, RotateCcw, Sparkles, Heart, HelpCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';

export default function FriendshipQuiz({ questions = [] }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIdx] || questions[0];

  const handleSelect = (optionIdx) => {
    sound.playPop();
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIdx]: optionIdx
    }));
  };

  const handleNext = () => {
    sound.playPop();
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsCompleted(true);
      sound.playChime();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handlePrev = () => {
    sound.playPop();
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleRestart = () => {
    sound.playPop();
    setSelectedAnswers({});
    setCurrentIdx(0);
    setIsCompleted(false);
  };

  // Calculate score
  const score = questions.reduce((acc, q, idx) => {
    return acc + (selectedAnswers[idx] === q.correctIndex ? 1 : 0);
  }, 0);
  const percentage = Math.round((score / questions.length) * 100);

  const getResultFeedback = () => {
    if (percentage === 100) {
      return {
        badge: "Celestial Soulmates 🌟💖",
        title: "Perfection! 100% Bond of Pure Gold!",
        desc: "You and your Nanban are in total cosmic sync. You read each other's minds, feel each other's emotions, and share a friendship meant to last a hundred lifetimes!"
      };
    } else if (percentage >= 80) {
      return {
        badge: "Inseparable Besties 🌸✨",
        title: "Incredible Score! True Partners in Crime!",
        desc: "You know each other inside out. The laughs, the memories, the unconditional support — you're basically family!"
      };
    } else {
      return {
        badge: "Heartwarmingly Chaotic Duo 🤪💕",
        title: "Unstoppable Friendship Energy!",
        desc: "Even with goofy disagreements or chaos, your heart is in the right place and your bond shines bright!"
      };
    }
  };

  if (isCompleted) {
    const feedback = getResultFeedback();
    return (
      <div className="p-8 text-center glass-panel rounded-3xl border border-pink-200 dark:border-purple-800 shadow-xl max-w-xl mx-auto animate-pulse-subtle">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-tr from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-pink-300/50">
          <Award className="w-10 h-10 animate-bounce" />
        </div>
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-pink-100 text-pink-700 dark:bg-purple-900/60 dark:text-purple-300 mb-3">
          {feedback.badge}
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white mb-2">
          {feedback.title}
        </h3>
        <p className="text-slate-600 dark:text-purple-200 text-base mb-6 leading-relaxed">
          {feedback.desc}
        </p>

        <div className="grid grid-cols-2 gap-4 bg-white/70 dark:bg-purple-950/40 p-4 rounded-2xl border border-pink-100 dark:border-purple-900/50 mb-6">
          <div className="p-2">
            <span className="text-xs text-slate-500 dark:text-purple-300 uppercase font-semibold">Your Score</span>
            <div className="text-3xl font-black text-pink-500 dark:text-pink-400 mt-1">
              {score} / {questions.length}
            </div>
          </div>
          <div className="p-2">
            <span className="text-xs text-slate-500 dark:text-purple-300 uppercase font-semibold">Match Rate</span>
            <div className="text-3xl font-black text-purple-600 dark:text-purple-300 mt-1">
              {percentage}%
            </div>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg shadow-pink-400/30 transition-all hover:scale-105"
        >
          <RotateCcw className="w-5 h-5" /> Retake Friendship Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 glass-panel rounded-3xl border border-pink-200 dark:border-purple-800 shadow-xl max-w-2xl mx-auto">
      {/* Progress header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-pink-500" />
          <span className="text-sm font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
            Question {currentIdx + 1} of {questions.length}
          </span>
        </div>
        <div className="w-32 bg-pink-100 dark:bg-purple-900/60 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-pink-500 to-purple-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-6 leading-snug">
        {currentQ.question}
      </h3>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {currentQ.options.map((opt, oIdx) => {
          const isSelected = selectedAnswers[currentIdx] === oIdx;
          return (
            <button
              key={oIdx}
              onClick={() => handleSelect(oIdx)}
              className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                isSelected
                  ? 'bg-gradient-to-r from-pink-100 to-purple-100 dark:from-purple-900/70 dark:to-pink-900/50 border-pink-500 dark:border-pink-400 shadow-md transform scale-[1.01]'
                  : 'bg-white/80 dark:bg-purple-950/30 border-pink-100 dark:border-purple-900/40 hover:bg-pink-50/70 dark:hover:bg-purple-900/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  isSelected ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-600 dark:bg-purple-800 dark:text-purple-200'
                }`}>
                  {String.fromCharCode(65 + oIdx)}
                </span>
                <span className={`text-base font-medium ${
                  isSelected ? 'text-pink-900 dark:text-white font-semibold' : 'text-slate-700 dark:text-purple-100'
                }`}>
                  {opt}
                </span>
              </div>
              {isSelected && <CheckCircle2 className="w-5 h-5 text-pink-500 shrink-0 ml-2" />}
            </button>
          );
        })}
      </div>

      {/* Footer navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-pink-100 dark:border-purple-900/40">
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            currentIdx === 0
              ? 'text-slate-400 cursor-not-allowed opacity-50'
              : 'text-slate-600 dark:text-purple-200 hover:bg-pink-100 dark:hover:bg-purple-900/40'
          }`}
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={selectedAnswers[currentIdx] === undefined}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all shadow-md ${
            selectedAnswers[currentIdx] === undefined
              ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed'
              : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:scale-105 shadow-pink-300/50'
          }`}
        >
          {currentIdx === questions.length - 1 ? "Finish & View Results 🎉" : "Next Question"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
