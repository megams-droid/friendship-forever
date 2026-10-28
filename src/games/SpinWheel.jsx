import React, { useState, useRef, useEffect } from 'react';
import { Play, Sparkles, Award, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';

export default function SpinWheel({ items = [] }) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedResult, setSelectedResult] = useState(null);
  const canvasRef = useRef(null);

  const numSegments = items.length || 8;
  const segmentAngle = 360 / numSegments;

  // Draw wheel on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    const center = size / 2;
    const radius = center - 10;

    ctx.clearRect(0, 0, size, size);

    items.forEach((item, index) => {
      const startAngle = (index * segmentAngle * Math.PI) / 180;
      const endAngle = ((index + 1) * segmentAngle * Math.PI) / 180;

      // Draw segment slice
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = item.color || `hsl(${(index * 360) / numSegments}, 85%, 65%)`;
      ctx.fill();

      // Border line
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + (segmentAngle * Math.PI) / 360);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.35)';
      ctx.shadowBlur = 4;
      ctx.fillText(item.label.slice(0, 16), radius - 18, 5);
      ctx.restore();
    });

    // Draw central peg
    ctx.beginPath();
    ctx.arc(center, center, 24, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 8;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(center, center, 14, 0, Math.PI * 2);
    ctx.fillStyle = '#ec4899';
    ctx.fill();
  }, [items, numSegments, segmentAngle]);

  const spinWheel = () => {
    if (spinning) return;
    sound.playPop();
    setSpinning(true);
    setSelectedResult(null);

    // Play periodic ticking
    const tickInterval = setInterval(() => {
      sound.playWheelTick();
    }, 180);

    // Random turns: at least 5-8 full spins plus random angle
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalRotation = rotation + 360 * 5 + extraDegrees;
    setRotation(totalRotation);

    setTimeout(() => {
      clearInterval(tickInterval);
      setSpinning(false);

      // Compute winner
      // Top indicator is at 270 deg in canvas coordinate system (or 90 deg relative to 0)
      const normalizedAngle = (totalRotation % 360);
      // The pointer is at top (270 deg)
      const effectiveAngle = (360 - normalizedAngle + 270) % 360;
      const winningIndex = Math.floor(effectiveAngle / segmentAngle) % numSegments;
      const winner = items[winningIndex];

      setSelectedResult(winner);
      sound.playChime();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 4000);
  };

  return (
    <div className="p-6 sm:p-8 glass-panel rounded-3xl border border-pink-200 dark:border-purple-800 shadow-xl max-w-xl mx-auto text-center">
      <div className="relative inline-block mb-6">
        {/* Top Pointer Arrow */}
        <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-pink-600 drop-shadow-md" />

        {/* Canvas Wheel with rotation animation */}
        <div
          className="rounded-full shadow-2xl p-1 bg-gradient-to-tr from-pink-300 via-purple-300 to-pink-200 inline-block overflow-hidden"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? 'transform 4s cubic-bezier(0.15, 0.9, 0.25, 1)' : 'none'
          }}
        >
          <canvas
            ref={canvasRef}
            width={340}
            height={340}
            className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full block"
          />
        </div>
      </div>

      {/* Spin Button */}
      <div className="mb-6">
        <button
          onClick={spinWheel}
          disabled={spinning}
          className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-extrabold text-base text-white transition-all shadow-lg ${
            spinning
              ? 'bg-slate-400 cursor-not-allowed opacity-75'
              : 'bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:scale-105 shadow-pink-400/40'
          }`}
        >
          <Sparkles className="w-5 h-5 animate-spin-slow" />
          {spinning ? 'Spinning Destiny...' : 'Spin The Wheel! 🎡'}
        </button>
      </div>

      {/* Landed Result Card */}
      {selectedResult && (
        <div className="p-5 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 border-2 border-pink-400 rounded-2xl animate-pulse-subtle">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 block mb-1">
            Wheel Outcome 🎁
          </span>
          <h4 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white mb-2">
            {selectedResult.label}
          </h4>
          <p className="text-sm sm:text-base text-slate-700 dark:text-purple-200 leading-relaxed max-w-md mx-auto">
            {selectedResult.text}
          </p>
        </div>
      )}
    </div>
  );
}
