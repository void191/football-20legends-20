import { useEffect, useState } from 'react';

interface ArenaBackgroundProps {
  arenaType: 'rookie' | 'bronze' | 'silver' | 'gold' | 'platinum' | 'champion';
  animated?: boolean;
  className?: string;
}

export default function ArenaBackground({ 
  arenaType, 
  animated = true, 
  className = "" 
}: ArenaBackgroundProps) {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    if (animated) {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2
      }));
      setParticles(newParticles);
    }
  }, [animated]);

  const getArenaConfig = () => {
    switch (arenaType) {
      case 'rookie':
        return {
          bg: 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600',
          accent: 'from-gray-500/20 to-gray-400/20',
          particles: '⚫',
          stadium: '🏟️',
          glow: 'shadow-gray-500/20'
        };
      case 'bronze':
        return {
          bg: 'bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700',
          accent: 'from-amber-600/20 to-amber-500/20',
          particles: '🥉',
          stadium: '🏟️',
          glow: 'shadow-amber-500/20'
        };
      case 'silver':
        return {
          bg: 'bg-gradient-to-br from-slate-700 via-slate-600 to-slate-500',
          accent: 'from-slate-400/20 to-slate-300/20',
          particles: '🥈',
          stadium: '🏟️',
          glow: 'shadow-slate-400/20'
        };
      case 'gold':
        return {
          bg: 'bg-gradient-to-br from-yellow-700 via-yellow-600 to-yellow-500',
          accent: 'from-yellow-400/20 to-yellow-300/20',
          particles: '🥇',
          stadium: '🏟️',
          glow: 'shadow-yellow-400/20'
        };
      case 'platinum':
        return {
          bg: 'bg-gradient-to-br from-cyan-800 via-cyan-700 to-cyan-600',
          accent: 'from-cyan-400/20 to-cyan-300/20',
          particles: '💎',
          stadium: '🏟️',
          glow: 'shadow-cyan-400/20'
        };
      case 'champion':
        return {
          bg: 'bg-gradient-to-br from-purple-800 via-purple-700 to-purple-600',
          accent: 'from-purple-400/20 to-purple-300/20',
          particles: '👑',
          stadium: '🏟️',
          glow: 'shadow-purple-400/20'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-game-field via-game-grass to-game-field',
          accent: 'from-game-grass/20 to-game-grass/10',
          particles: '⚽',
          stadium: '🏟️',
          glow: 'shadow-game-grass/20'
        };
    }
  };

  const config = getArenaConfig();

  return (
    <div className={`relative overflow-hidden ${config.bg} ${config.glow} ${className}`}>
      {/* Stadium Base */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-8xl opacity-10 transform rotate-12">
          {config.stadium}
        </div>
      </div>

      {/* Field Lines */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 border border-white/10 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/5 rounded-lg"></div>
      </div>

      {/* Animated Particles */}
      {animated && particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-xs opacity-30 animate-bounce"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: '3s'
          }}
        >
          {config.particles}
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${config.accent} pointer-events-none`}></div>

      {/* Corner Spotlights */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-radial from-white/5 to-transparent rounded-full"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-white/5 to-transparent rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-radial from-white/5 to-transparent rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-radial from-white/5 to-transparent rounded-full"></div>
    </div>
  );
}
