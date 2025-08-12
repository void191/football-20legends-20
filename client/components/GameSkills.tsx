import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Target, 
  Shield, 
  Wind, 
  Flame, 
  Star,
  Lock
} from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  icon: React.ReactNode;
  level: number;
  maxLevel: number;
  description: string;
  effect: string;
  unlocked: boolean;
  requiredLevel?: number;
}

interface GameSkillsProps {
  playerLevel: number;
  onSkillUpgrade?: (skillId: string) => void;
}

export default function GameSkills({ playerLevel, onSkillUpgrade }: GameSkillsProps) {
  const skills: Skill[] = [
    {
      id: 'speed',
      name: 'Lightning Speed',
      icon: <Zap className="w-5 h-5" />,
      level: 3,
      maxLevel: 5,
      description: 'Increases movement speed on the field',
      effect: '+15% Movement Speed',
      unlocked: true
    },
    {
      id: 'accuracy',
      name: 'Precise Shot',
      icon: <Target className="w-5 h-5" />,
      level: 2,
      maxLevel: 5,
      description: 'Improves shooting accuracy',
      effect: '+20% Shot Accuracy',
      unlocked: true
    },
    {
      id: 'defense',
      name: 'Steel Defense',
      icon: <Shield className="w-5 h-5" />,
      level: 4,
      maxLevel: 5,
      description: 'Better defensive capabilities',
      effect: '+25% Tackle Success',
      unlocked: true
    },
    {
      id: 'agility',
      name: 'Wind Walker',
      icon: <Wind className="w-5 h-5" />,
      level: 1,
      maxLevel: 5,
      description: 'Enhanced dribbling and maneuverability',
      effect: '+30% Dribble Success',
      unlocked: true
    },
    {
      id: 'power',
      name: 'Thunder Strike',
      icon: <Flame className="w-5 h-5" />,
      level: 0,
      maxLevel: 5,
      description: 'Devastating power shots',
      effect: '+40% Shot Power',
      unlocked: playerLevel >= 20,
      requiredLevel: 20
    },
    {
      id: 'legendary',
      name: 'Legend Aura',
      icon: <Star className="w-5 h-5" />,
      level: 0,
      maxLevel: 3,
      description: 'Legendary presence that inspires teammates',
      effect: '+10% Team Performance',
      unlocked: playerLevel >= 30,
      requiredLevel: 30
    }
  ];

  const getSkillColor = (skillId: string) => {
    switch (skillId) {
      case 'speed': return 'text-game-xp';
      case 'accuracy': return 'text-game-gold';
      case 'defense': return 'text-game-silver';
      case 'agility': return 'text-game-grass';
      case 'power': return 'text-red-500';
      case 'legendary': return 'text-purple-500';
      default: return 'text-muted-foreground';
    }
  };

  const getSkillBg = (skillId: string) => {
    switch (skillId) {
      case 'speed': return 'bg-game-xp/10 border-game-xp/30';
      case 'accuracy': return 'bg-game-gold/10 border-game-gold/30';
      case 'defense': return 'bg-game-silver/10 border-game-silver/30';
      case 'agility': return 'bg-game-grass/10 border-game-grass/30';
      case 'power': return 'bg-red-500/10 border-red-500/30';
      case 'legendary': return 'bg-purple-500/10 border-purple-500/30';
      default: return 'bg-muted/10 border-muted/30';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {skills.map((skill) => (
        <Card 
          key={skill.id}
          className={`transition-all hover:scale-105 cursor-pointer ${
            skill.unlocked ? getSkillBg(skill.id) : 'bg-muted/20 border-muted/50 opacity-60'
          }`}
          onClick={() => skill.unlocked && onSkillUpgrade?.(skill.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${skill.unlocked ? getSkillColor(skill.id) : 'text-muted-foreground'}`}>
                {skill.unlocked ? skill.icon : <Lock className="w-5 h-5" />}
              </div>
              <div className="text-right">
                {skill.unlocked ? (
                  <>
                    <div className="text-sm font-medium">
                      Level {skill.level}/{skill.maxLevel}
                    </div>
                    <Progress 
                      value={(skill.level / skill.maxLevel) * 100} 
                      className="h-2 w-16"
                    />
                  </>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    Level {skill.requiredLevel} Required
                  </Badge>
                )}
              </div>
            </div>
            
            <h3 className={`font-semibold mb-2 ${skill.unlocked ? '' : 'text-muted-foreground'}`}>
              {skill.name}
            </h3>
            
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {skill.description}
            </p>
            
            {skill.unlocked && (
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={`text-xs ${getSkillColor(skill.id)} border-current`}>
                  {skill.effect}
                </Badge>
                {skill.level < skill.maxLevel && (
                  <div className="text-xs text-game-gold">
                    Upgrade Available
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
