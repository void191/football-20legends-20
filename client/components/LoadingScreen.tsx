import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export default function LoadingScreen({ onComplete, duration = 3000 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);

  const loadingTips = [
    "⚽ Practice your dribbling to improve ball control",
    "🏆 Win matches to earn trophies and climb arenas",
    "⚡ Level up to unlock new skills and abilities", 
    "👥 Add friends to compare stats and challenge them",
    "🎨 Customize your character in the appearance section",
    "🏟️ Higher arenas have better rewards and tougher opponents"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (duration / 100));
        if (newProgress >= 100) {
          clearInterval(interval);
          onComplete?.();
          return 100;
        }
        return newProgress;
      });
    }, 100);

    const tipInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % loadingTips.length);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(tipInterval);
    };
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-game-field/10 to-game-grass/10 flex items-center justify-center z-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-game-grass/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-game-xp/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-game-gold/5 rounded-full blur-2xl animate-ping"></div>
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-8">
        {/* Logo and Title */}
        <div className="mb-8">
          <div className="text-8xl mb-4 animate-bounce">⚽</div>
          <h1 className="text-4xl font-bold text-primary mb-2">FutbolLegends</h1>
          <p className="text-game-xp">Loading your football experience...</p>
        </div>

        {/* Loading Bar */}
        <div className="mb-8">
          <div className="w-full bg-muted/30 rounded-full h-3 mb-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-game-grass to-game-xp rounded-full transition-all duration-100 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">{Math.round(progress)}%</div>
        </div>

        {/* Loading Tips */}
        <div className="bg-card/50 backdrop-blur rounded-lg p-4 border border-border/50">
          <h3 className="font-semibold text-game-gold mb-2 flex items-center justify-center">
            💡 Pro Tip
          </h3>
          <p className="text-sm text-foreground transition-opacity duration-300">
            {loadingTips[currentTip]}
          </p>
        </div>

        {/* Animated Trail Effect */}
        <div className="absolute -top-4 -right-4 w-8 h-8">
          <div className="absolute inset-0 bg-game-xp/20 rounded-full animate-ping"></div>
          <div className="absolute inset-2 bg-game-xp/40 rounded-full animate-ping animation-delay-75"></div>
          <div className="absolute inset-4 bg-game-xp rounded-full animate-ping animation-delay-150"></div>
        </div>
      </div>
    </div>
  );
}
