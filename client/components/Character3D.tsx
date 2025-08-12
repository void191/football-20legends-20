import { useState, useEffect } from 'react';

interface Character3DProps {
  size?: 'small' | 'medium' | 'large' | 'xl';
  animation?: 'idle' | 'running' | 'kicking' | 'celebrating' | 'defending';
  team?: 'home' | 'away';
  position?: 'forward' | 'midfielder' | 'defender' | 'goalkeeper';
  customization?: {
    hair: string;
    skin: string;
    jersey: string;
    shorts: string;
    boots: string;
  };
  className?: string;
}

export default function Character3D({
  size = 'medium',
  animation = 'idle',
  team = 'home',
  position = 'forward',
  customization,
  className = ''
}: Character3DProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const sizeClasses = {
    small: 'w-16 h-20',
    medium: 'w-24 h-32',
    large: 'w-32 h-40',
    xl: 'w-48 h-64'
  };

  const teamColors = {
    home: {
      jersey: 'from-blue-600 to-blue-700',
      shorts: 'from-blue-700 to-blue-800',
      socks: 'from-blue-800 to-blue-900'
    },
    away: {
      jersey: 'from-red-600 to-red-700',
      shorts: 'from-red-700 to-red-800', 
      socks: 'from-red-800 to-red-900'
    }
  };

  const positionBadge = {
    forward: { color: 'bg-red-500', label: 'FWD', icon: '⚡' },
    midfielder: { color: 'bg-green-500', label: 'MID', icon: '🎯' },
    defender: { color: 'bg-blue-500', label: 'DEF', icon: '🛡️' },
    goalkeeper: { color: 'bg-yellow-500', label: 'GK', icon: '🥅' }
  };

  useEffect(() => {
    if (!isAnimating) return;
    
    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % 4);
    }, animation === 'running' ? 200 : 800);

    return () => clearInterval(interval);
  }, [animation, isAnimating]);

  const getAnimationTransform = () => {
    if (animation === 'idle') {
      return `translateY(${Math.sin(currentFrame * 0.5) * 2}px)`;
    }
    if (animation === 'running') {
      return `translateX(${Math.sin(currentFrame * 1.5) * 3}px) rotate(${Math.sin(currentFrame) * 2}deg)`;
    }
    if (animation === 'kicking') {
      return currentFrame % 2 === 0 ? 'rotate(-10deg) scale(1.1)' : 'rotate(5deg) scale(0.95)';
    }
    if (animation === 'celebrating') {
      return `translateY(${Math.sin(currentFrame * 2) * 5}px) rotate(${Math.sin(currentFrame) * 5}deg) scale(${1 + Math.sin(currentFrame) * 0.1})`;
    }
    return 'none';
  };

  return (
    <div 
      className={`relative ${sizeClasses[size]} ${className}`}
      onMouseEnter={() => setIsAnimating(true)}
      onMouseLeave={() => setIsAnimating(false)}
    >
      {/* Character Container */}
      <div 
        className="relative w-full h-full transition-all duration-200 ease-in-out"
        style={{ transform: getAnimationTransform() }}
      >
        {/* Shadow */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-black/20 rounded-full blur-sm"></div>
        
        {/* Character Body */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-full">
          {/* Head */}
          <div className="relative mx-auto w-6 h-6 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mb-1 border border-amber-400">
            {/* Hair */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-7 h-4 bg-gradient-to-br from-amber-800 to-amber-900 rounded-t-full"></div>
            {/* Eyes */}
            <div className="absolute top-2 left-1 w-1 h-1 bg-black rounded-full"></div>
            <div className="absolute top-2 right-1 w-1 h-1 bg-black rounded-full"></div>
            {/* Smile */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-2 h-1 border-b border-black rounded-full"></div>
          </div>

          {/* Jersey */}
          <div className={`mx-auto w-8 h-6 bg-gradient-to-br ${teamColors[team].jersey} rounded-md border border-white/20 mb-1 relative`}>
            {/* Jersey Number */}
            <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
              {Math.floor(Math.random() * 99) + 1}
            </div>
            {/* Arms */}
            <div className={`absolute -left-2 top-1 w-3 h-4 bg-gradient-to-br ${teamColors[team].jersey} rounded-full transform -rotate-12`}></div>
            <div className={`absolute -right-2 top-1 w-3 h-4 bg-gradient-to-br ${teamColors[team].jersey} rounded-full transform rotate-12`}></div>
          </div>

          {/* Shorts */}
          <div className={`mx-auto w-6 h-4 bg-gradient-to-br ${teamColors[team].shorts} rounded-md border border-white/20 mb-1`}></div>

          {/* Legs */}
          <div className="flex justify-center gap-1 mb-1">
            <div className="w-2 h-6 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full"></div>
            <div className="w-2 h-6 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full"></div>
          </div>

          {/* Socks */}
          <div className="flex justify-center gap-1 mb-1">
            <div className={`w-2 h-3 bg-gradient-to-br ${teamColors[team].socks} rounded-full`}></div>
            <div className={`w-2 h-3 bg-gradient-to-br ${teamColors[team].socks} rounded-full`}></div>
          </div>

          {/* Boots */}
          <div className="flex justify-center gap-1">
            <div className="w-3 h-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-md"></div>
            <div className="w-3 h-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-md"></div>
          </div>
        </div>

        {/* Position Badge */}
        <div className={`absolute -top-2 -right-2 w-6 h-6 ${positionBadge[position].color} rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-lg`}>
          <span className="text-[10px]">{positionBadge[position].icon}</span>
        </div>

        {/* Animation Effects */}
        {animation === 'kicking' && (
          <div className="absolute -bottom-2 -right-4 w-4 h-4 bg-orange-500 rounded-full animate-ping">
            ⚽
          </div>
        )}

        {animation === 'celebrating' && (
          <>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-yellow-400 animate-bounce">🌟</div>
            <div className="absolute -top-3 -left-2 text-yellow-400 animate-ping">✨</div>
            <div className="absolute -top-3 -right-2 text-yellow-400 animate-ping animation-delay-150">✨</div>
          </>
        )}

        {animation === 'running' && (
          <div className="absolute -bottom-1 -left-2 w-2 h-1 bg-white/30 rounded-full animate-pulse"></div>
        )}
      </div>

      {/* Skill Aura Effect */}
      {size === 'large' || size === 'xl' ? (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-game-xp/20 to-game-grass/20 blur-md animate-pulse pointer-events-none"></div>
      ) : null}
    </div>
  );
}
