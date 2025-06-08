'use client';

import { useState } from 'react';

interface FlippableCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
}

export default function FlippableCard({ 
  frontContent, 
  backContent, 
  className = '' 
}: FlippableCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => setIsFlipped(!isFlipped);
  
  const baseCardStyles = "absolute inset-0 rounded-2xl bg-white [backface-visibility:hidden] flex items-center justify-center p-4";
  const containerStyles = `relative w-64 h-80 rounded-2xl shadow-lg cursor-pointer transition-all duration-700 ease-in-out [transform-style:preserve-3d] ${
    isFlipped ? '[transform:rotateY(180deg)]' : ''
  } ${className}`;
  const backCardStyles = `${baseCardStyles} [transform:rotateY(180deg)]`;
  
  return (
    <div
      className={containerStyles}
      onClick={handleCardClick}
    >
      <div className={baseCardStyles}>
        {frontContent}
      </div>

      <div className={backCardStyles}>
        {backContent}
      </div>
    </div>
  );
}