import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import Character3D from './Character3D';
import Stadium3D from './Stadium3D';
import ParticleSystem from './ParticleSystem';

interface TeamPlayer {
  id: string;
  name: string;
  position: 'forward' | 'midfielder' | 'defender' | 'goalkeeper';
  overall: number;
  isAI: boolean;
}

interface MatchLoadingScreenProps {
  homeTeam: TeamPlayer[];
  awayTeam: TeamPlayer[];
  arena: 'rookie' | 'bronze' | 'silver' | 'gold' | 'platinum' | 'champion';
  matchType: 'ranked' | 'friendly' | 'tournament';
  onLoadComplete?: () => void;
  loadingDuration?: number;
}

export default function MatchLoadingScreen({
  homeTeam,
  awayTeam,
  arena,
  matchType,
  onLoadComplete,
  loadingDuration = 8000
}: MatchLoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showVS, setShowVS] = useState(false);
  const [teamAnimations, setTeamAnimations] = useState<'idle' | 'running' | 'celebrating'>('idle');

  const loadingPhases = [
    { text: 'Preparing the pitch...', emoji: '🏟️', duration: 1500 },
    { text: 'Loading player data...', emoji: '👥', duration: 1500 },
    { text: 'Setting up match conditions...', emoji: '⚙️', duration: 1500 },
    { text: 'Calibrating AI opponents...', emoji: '🤖', duration: 1500 },
    { text: 'Final preparations...', emoji: '⚽', duration: 2000 }
  ];

  const matchTypeConfig = {
    ranked: {
      title: 'RANKED MATCH',
      subtitle: 'Climb the ladder',
      color: 'from-red-500 to-red-600',
      effect: 'competition'
    },
    friendly: {
      title: 'FRIENDLY MATCH',
      subtitle: 'Practice makes perfect',
      color: 'from-green-500 to-green-600',
      effect: 'casual'
    },
    tournament: {
      title: 'TOURNAMENT',
      subtitle: 'Championship glory awaits',
      color: 'from-yellow-500 to-yellow-600',
      effect: 'championship'
    }
  };

  const config = matchTypeConfig[matchType];

  useEffect(() => {
    let totalElapsed = 0;
    let phaseIndex = 0;

    const progressInterval = setInterval(() => {
      totalElapsed += 100;
      const newProgress = (totalElapsed / loadingDuration) * 100;
      setProgress(Math.min(newProgress, 100));

      // Update phase based on progress
      let cumulativeDuration = 0;
      for (let i = 0; i < loadingPhases.length; i++) {
        cumulativeDuration += loadingPhases[i].duration;
        if (totalElapsed <= cumulativeDuration) {
          setCurrentPhase(i);
          break;
        }
      }

      if (totalElapsed >= loadingDuration) {
        clearInterval(progressInterval);
        onLoadComplete?.();
      }
    }, 100);

    return () => clearInterval(progressInterval);
  }, [loadingDuration, onLoadComplete]);

  useEffect(() => {
    // Show VS animation
    const vsTimer = setTimeout(() => setShowVS(true), 2000);
    
    // Team animation cycles
    const animationTimer = setInterval(() => {
      setTeamAnimations(prev => {
        const animations: ('idle' | 'running' | 'celebrating')[] = ['idle', 'running', 'celebrating'];
        const currentIndex = animations.indexOf(prev);
        return animations[(currentIndex + 1) % animations.length];
      });
    }, 2000);

    return () => {
      clearTimeout(vsTimer);
      clearInterval(animationTimer);
    };
  }, []);

  const renderTeam = (team: TeamPlayer[], side: 'home' | 'away') => (
    <div className={`flex flex-col items-center gap-4 ${side === 'home' ? 'items-start' : 'items-end'}`}>
      <div className={`text-2xl font-bold ${side === 'home' ? 'text-blue-400' : 'text-red-400'}`}>
        {side === 'home' ? 'HOME' : 'AWAY'}
      </div>
      
      {/* Formation Display */}
      <div className="relative">
        <div className="grid grid-cols-1 gap-2">
          {team.slice(0, 5).map((player, index) => (
            <div key={player.id} className="flex items-center gap-3">
              <Character3D
                size="small"
                animation={teamAnimations}
                team={side}
                position={player.position}
              />
              <div className={`text-sm ${side === 'away' ? 'text-right' : ''}`}>
                <div className="font-semibold flex items-center gap-1">
                  {player.name}
                  {player.isAI && (
                    <span className="text-xs bg-orange-500/20 text-orange-300 px-1 rounded">AI</span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {player.position.toUpperCase()} • {player.overall} OVR
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-game-field/10 to-game-grass/10 flex items-center justify-center z-50">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <Stadium3D
          arena={arena}
          timeOfDay="evening"
          weather="clear"
          crowd="full"
          animated={true}
          size="large"
          className="w-full h-full opacity-30"
        />
      </div>

      {/* Particle Effects */}
      <ParticleSystem
        type="stars"
        intensity="medium"
        color="#fbbf24"
        continuous={true}
        position={{ x: 20, y: 30 }}
        className="absolute inset-0"
      />
      <ParticleSystem
        type="energy"
        intensity="medium"
        color="#3b82f6"
        continuous={true}
        position={{ x: 80, y: 30 }}
        className="absolute inset-0"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`text-4xl font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent mb-2`}>
            {config.title}
          </div>
          <div className="text-lg text-muted-foreground">{config.subtitle}</div>
          <div className="text-sm text-muted-foreground mt-2">
            Arena: {arena.charAt(0).toUpperCase() + arena.slice(1)} Stadium
          </div>
        </div>

        {/* Team Display */}
        <div className="grid grid-cols-3 gap-8 items-center mb-12">
          {/* Home Team */}
          <div className="text-center">
            {renderTeam(homeTeam, 'home')}
          </div>

          {/* VS Display */}
          <div className="text-center relative">
            <div className={`text-6xl font-bold transition-all duration-1000 ${
              showVS ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-180'
            }`}>
              <span className="bg-gradient-to-r from-blue-400 via-white to-red-400 bg-clip-text text-transparent">
                VS
              </span>
            </div>
            
            {/* Animated Soccer Ball */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl animate-spin">
              ⚽
            </div>
            
            {/* Energy Beams */}
            {showVS && (
              <>
                <div className="absolute top-1/2 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-transparent animate-pulse"></div>
                <div className="absolute top-1/2 right-0 w-16 h-1 bg-gradient-to-l from-red-500 to-transparent animate-pulse"></div>
              </>
            )}
          </div>

          {/* Away Team */}
          <div className="text-center">
            {renderTeam(awayTeam, 'away')}
          </div>
        </div>

        {/* Loading Progress */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-4xl animate-bounce">
              {loadingPhases[currentPhase]?.emoji}
            </div>
            <div className="text-lg font-medium">
              {loadingPhases[currentPhase]?.text}
            </div>
          </div>

          <Progress value={progress} className="h-4 mb-4" />
          
          <div className="text-center text-sm text-muted-foreground">
            {Math.round(progress)}% Complete
          </div>
        </div>

        {/* Match Tips */}
        <div className="mt-8 grid grid-cols-3 gap-6 text-center text-sm">
          <div className="bg-card/50 backdrop-blur rounded-lg p-4 border border-border/50">
            <div className="text-2xl mb-2">⚡</div>
            <div className="font-semibold mb-1">Use Skills Wisely</div>
            <div className="text-muted-foreground">Activate special abilities at the right moment</div>
          </div>
          
          <div className="bg-card/50 backdrop-blur rounded-lg p-4 border border-border/50">
            <div className="text-2xl mb-2">🎯</div>
            <div className="font-semibold mb-1">Team Coordination</div>
            <div className="text-muted-foreground">Work with AI teammates for better plays</div>
          </div>
          
          <div className="bg-card/50 backdrop-blur rounded-lg p-4 border border-border/50">
            <div className="text-2xl mb-2">🏆</div>
            <div className="font-semibold mb-1">Earn Rewards</div>
            <div className="text-muted-foreground">Win to gain XP, trophies, and climb arenas</div>
          </div>
        </div>

        {/* Championship Effects */}
        {matchType === 'tournament' && (
          <div className="absolute inset-0 pointer-events-none">
            <ParticleSystem
              type="celebration"
              intensity="high"
              color="#fbbf24"
              continuous={true}
              position={{ x: 50, y: 20 }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
