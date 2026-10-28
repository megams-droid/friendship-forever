import React, { useState, useEffect } from 'react';
import { RotateCcw, Heart, Star, Bot, Users, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';

const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // X is Heart 💖, O is Star ⭐
  const [vsAI, setVsAI] = useState(false);
  const [scores, setScores] = useState({ p1: 0, p2: 0, ties: 0 });

  const calculateWinner = (squares) => {
    for (let combo of WINNING_COMBOS) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: combo };
      }
    }
    if (squares.every(s => s !== null)) {
      return { winner: 'Tie', line: [] };
    }
    return null;
  };

  const gameResult = calculateWinner(board);

  // AI Move if vsAI is enabled and it's O's turn
  useEffect(() => {
    if (vsAI && !isXNext && !gameResult) {
      const timer = setTimeout(() => {
        makeAIMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [vsAI, isXNext, gameResult]);

  const makeAIMove = () => {
    // 1. Can AI win?
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        const copy = [...board];
        copy[i] = '⭐';
        if (calculateWinner(copy)?.winner === '⭐') {
          handleMove(i, '⭐');
          return;
        }
      }
    }
    // 2. Can player win? Block it
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        const copy = [...board];
        copy[i] = '💖';
        if (calculateWinner(copy)?.winner === '💖') {
          handleMove(i, '⭐');
          return;
        }
      }
    }
    // 3. Take center if free
    if (!board[4]) {
      handleMove(4, '⭐');
      return;
    }
    // 4. Random available
    const available = board.map((v, idx) => v === null ? idx : null).filter(v => v !== null);
    if (available.length > 0) {
      const chosen = available[Math.floor(Math.random() * available.length)];
      handleMove(chosen, '⭐');
    }
  };

  const handleCellClick = (idx) => {
    if (board[idx] || gameResult) return;
    if (vsAI && !isXNext) return; // Wait for AI
    handleMove(idx, isXNext ? '💖' : '⭐');
  };

  const handleMove = (idx, symbol) => {
    sound.playPop();
    const newBoard = [...board];
    newBoard[idx] = symbol;
    setBoard(newBoard);

    const result = calculateWinner(newBoard);
    if (result) {
      if (result.winner === '💖') {
        sound.playChime();
        setScores(s => ({ ...s, p1: s.p1 + 1 }));
        confetti({ particleCount: 70, spread: 60 });
      } else if (result.winner === '⭐') {
        sound.playChime();
        setScores(s => ({ ...s, p2: s.p2 + 1 }));
        confetti({ particleCount: 70, spread: 60 });
      } else {
        setScores(s => ({ ...s, ties: s.ties + 1 }));
      }
    } else {
      setIsXNext(symbol === '⭐');
    }
  };

  const handleResetBoard = () => {
    sound.playPop();
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const handleResetAll = () => {
    sound.playPop();
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setScores({ p1: 0, p2: 0, ties: 0 });
  };

  return (
    <div className="p-6 sm:p-8 glass-panel rounded-3xl border border-pink-200 dark:border-purple-800 shadow-xl max-w-lg mx-auto">
      {/* Mode Selector */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <button
          onClick={() => { setVsAI(false); handleResetBoard(); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
            !vsAI
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
              : 'bg-white/80 dark:bg-purple-950/40 text-slate-600 dark:text-purple-300'
          }`}
        >
          <Users className="w-4 h-4" /> 2 Players (Pass & Play)
        </button>
        <button
          onClick={() => { setVsAI(true); handleResetBoard(); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
            vsAI
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
              : 'bg-white/80 dark:bg-purple-950/40 text-slate-600 dark:text-purple-300'
          }`}
        >
          <Bot className="w-4 h-4" /> Play vs Nanban AI
        </button>
      </div>

      {/* Scoreboard */}
      <div className="grid grid-cols-3 gap-2 mb-6 bg-white/70 dark:bg-purple-950/40 p-3 rounded-2xl border border-pink-100 dark:border-purple-900/40 text-center">
        <div>
          <span className="text-[11px] font-bold text-pink-600 dark:text-pink-400 block">
            Player 💖
          </span>
          <span className="text-2xl font-black text-slate-800 dark:text-white">{scores.p1}</span>
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-500 dark:text-purple-300 block">
            Ties 🤝
          </span>
          <span className="text-2xl font-black text-slate-800 dark:text-white">{scores.ties}</span>
        </div>
        <div>
          <span className="text-[11px] font-bold text-amber-500 dark:text-amber-400 block">
            {vsAI ? 'AI ⭐' : 'Player ⭐'}
          </span>
          <span className="text-2xl font-black text-slate-800 dark:text-white">{scores.p2}</span>
        </div>
      </div>

      {/* Status Banner */}
      <div className="text-center mb-6 h-8 flex items-center justify-center">
        {gameResult ? (
          gameResult.winner === 'Tie' ? (
            <span className="font-bold text-base text-slate-700 dark:text-purple-200">
              It&apos;s a Sweet Tie! Friendship Wins! 🤝
            </span>
          ) : (
            <span className="font-extrabold text-lg text-pink-600 dark:text-pink-400 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500 animate-bounce" />
              {gameResult.winner} Takes The Win! 🎉
            </span>
          )
        ) : (
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-purple-200">
            <span>Turn:</span>
            <span className="inline-flex items-center gap-1 font-bold text-pink-600 dark:text-pink-400">
              {isXNext ? '💖 Player 1' : vsAI ? '⭐ Nanban AI is thinking...' : '⭐ Player 2'}
            </span>
          </div>
        )}
      </div>

      {/* 3x3 Board */}
      <div className="grid grid-cols-3 gap-3 w-64 sm:w-72 mx-auto mb-6">
        {board.map((cell, idx) => {
          const isWinningCell = gameResult?.line?.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => handleCellClick(idx)}
              className={`h-20 sm:h-24 rounded-2xl text-3xl sm:text-4xl flex items-center justify-center transition-all duration-200 shadow-sm ${
                isWinningCell
                  ? 'bg-gradient-to-tr from-pink-300 to-purple-300 dark:from-pink-800 dark:to-purple-800 scale-105 border-2 border-pink-500'
                  : 'bg-white/90 dark:bg-purple-950/60 hover:bg-pink-50 dark:hover:bg-purple-900/30 border border-pink-100 dark:border-purple-800/60'
              }`}
            >
              {cell}
            </button>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={handleResetBoard}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-md transition-all hover:scale-105"
        >
          <RotateCcw className="w-4 h-4" /> Reset Board
        </button>
        <button
          onClick={handleResetAll}
          className="px-4 py-2.5 rounded-full text-xs font-semibold text-slate-500 dark:text-purple-300 hover:bg-pink-100 dark:hover:bg-purple-900/30 transition-all"
        >
          Clear Scores
        </button>
      </div>
    </div>
  );
}
