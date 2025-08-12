import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Character3D from "./Character3D";
import { Star, Zap, Shield, Target, Heart, TrendingUp } from "lucide-react";

interface PlayerStats {
  speed: number;
  shooting: number;
  passing: number;
  defending: number;
  goalkeeping: number;
  overall: number;
}

interface PlayerCardProps {
  name: string;
  level: number;
  position: "forward" | "midfielder" | "defender" | "goalkeeper";
  team?: "home" | "away";
  stats: PlayerStats;
  rarity?: "common" | "rare" | "epic" | "legendary";
  isAI?: boolean;
  isOnline?: boolean;
  energy?: number;
  maxEnergy?: number;
  onClick?: () => void;
  className?: string;
}

export default function PlayerCard({
  name,
  level,
  position,
  team = "home",
  stats,
  rarity = "common",
  isAI = false,
  isOnline = false,
  energy = 100,
  maxEnergy = 100,
  onClick,
  className = "",
}: PlayerCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const rarityConfig = {
    common: {
      bg: "from-gray-500/20 to-gray-400/20",
      border: "border-gray-500/30",
      glow: "shadow-gray-500/20",
      text: "text-gray-300",
    },
    rare: {
      bg: "from-blue-500/20 to-blue-400/20",
      border: "border-blue-500/30",
      glow: "shadow-blue-500/20",
      text: "text-blue-300",
    },
    epic: {
      bg: "from-purple-500/20 to-purple-400/20",
      border: "border-purple-500/30",
      glow: "shadow-purple-500/20",
      text: "text-purple-300",
    },
    legendary: {
      bg: "from-game-gold/20 to-yellow-400/20",
      border: "border-game-gold/30",
      glow: "shadow-game-gold/20",
      text: "text-game-gold",
    },
  };

  const positionColors = {
    forward: "bg-red-500",
    midfielder: "bg-green-500",
    defender: "bg-blue-500",
    goalkeeper: "bg-yellow-500",
  };

  const getStatColor = (value: number) => {
    if (value >= 90) return "text-game-gold";
    if (value >= 75) return "text-green-500";
    if (value >= 60) return "text-blue-500";
    if (value >= 40) return "text-yellow-500";
    return "text-red-500";
  };

  const getOverallColor = (overall: number) => {
    if (overall >= 90) return "bg-game-gold text-black";
    if (overall >= 80) return "bg-green-500 text-white";
    if (overall >= 70) return "bg-blue-500 text-white";
    if (overall >= 60) return "bg-yellow-500 text-black";
    return "bg-gray-500 text-white";
  };

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 cursor-pointer ${
        isHovered ? "scale-105 " + rarityConfig[rarity].glow : ""
      } bg-gradient-to-br ${rarityConfig[rarity].bg} border ${rarityConfig[rarity].border} ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Effect */}
      {rarity === "legendary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-game-gold/5 via-transparent to-game-gold/5 animate-pulse"></div>
      )}

      {/* Rarity Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${rarityConfig[rarity].bg} opacity-50 blur-xl`}
      ></div>

      <CardContent className="relative p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-sm truncate">{name}</h3>
              {isAI && (
                <Badge
                  variant="outline"
                  className="text-xs bg-orange-500/20 text-orange-300 border-orange-500/30"
                >
                  AI
                </Badge>
              )}
              {isOnline && !isAI && (
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge
                className={`text-xs ${positionColors[position]} text-white`}
              >
                {position.toUpperCase()}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Level {level}
              </span>
            </div>
          </div>

          {/* Overall Rating */}
          <div
            className={`w-12 h-12 rounded-full ${getOverallColor(stats.overall)} flex items-center justify-center font-bold`}
          >
            {stats.overall}
          </div>
        </div>

        {/* Character Display */}
        <div className="flex justify-center mb-4">
          <Character3D
            size="large"
            animation={isHovered ? "celebrating" : "idle"}
            team={team}
            position={position}
          />
        </div>

        {/* Stats */}
        <div className="space-y-2 mb-3">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>SPD</span>
              </div>
              <span className={`font-bold ${getStatColor(stats.speed)}`}>
                {stats.speed}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Target className="w-3 h-3" />
                <span>SHT</span>
              </div>
              <span className={`font-bold ${getStatColor(stats.shooting)}`}>
                {stats.shooting}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>PAS</span>
              </div>
              <span className={`font-bold ${getStatColor(stats.passing)}`}>
                {stats.passing}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>DEF</span>
              </div>
              <span className={`font-bold ${getStatColor(stats.defending)}`}>
                {stats.defending}
              </span>
            </div>
          </div>
        </div>

        {/* Energy Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-red-500" />
              <span>Energy</span>
            </div>
            <span>
              {energy}/{maxEnergy}
            </span>
          </div>
          <Progress value={(energy / maxEnergy) * 100} className="h-2" />
        </div>

        {/* Rarity Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className={`w-3 h-3 ${rarityConfig[rarity].text}`} />
            <span
              className={`text-xs font-medium ${rarityConfig[rarity].text} capitalize`}
            >
              {rarity}
            </span>
          </div>

          {/* Star Rating */}
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(stats.overall / 20)
                    ? "text-game-gold fill-game-gold"
                    : "text-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Hover Effects */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-2 right-2 w-4 h-4 bg-game-xp/30 rounded-full animate-ping"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 bg-game-gold/30 rounded-full animate-ping animation-delay-75"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
