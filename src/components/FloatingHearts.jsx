import React, { useEffect, useState } from 'react';

const ICONS = ['💖', '✨', '🌸', '⭐', '🤍', '💫', '💕'];

export default function FloatingHearts() {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Generate static initial particles to float up
    const items = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      icon: ICONS[i % ICONS.length],
      left: Math.random() * 95,
      delay: Math.random() * 12,
      duration: 12 + Math.random() * 10,
      size: 14 + Math.random() * 18,
      opacity: 0.2 + Math.random() * 0.4
    }));
    setElements(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el) => (
        <div
          key={el.id}
          className="floating-particle select-none"
          style={{
            left: `${el.left}%`,
            animationDelay: `${el.delay}s`,
            animationDuration: `${el.duration}s`,
            fontSize: `${el.size}px`,
            opacity: el.opacity
          }}
        >
          {el.icon}
        </div>
      ))}
    </div>
  );
}

