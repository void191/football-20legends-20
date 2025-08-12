import { useState, useEffect } from "react";
import ParticleSystem from "./ParticleSystem";
import TrailEffect from "./TrailEffect";

interface SkillEffectsProps {
  skillType:
    | "speed"
    | "shooting"
    | "defending"
    | "passing"
    | "dribbling"
    | "goalkeeping";
  level: number;
  active?: boolean;
  intensity?: "low" | "medium" | "high";
  duration?: number;
  position?: { x: number; y: number };
  size?: "small" | "medium" | "large";
  className?: string;
}

export default function SkillEffects({
  skillType,
  level,
  active = false,
  intensity = "medium",
  duration = 3000,
  position = { x: 50, y: 50 },
  size = "medium",
  className = "",
}: SkillEffectsProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [pulsePhase, setPulsePhase] = useState(0);

  const sizeConfig = {
    small: { scale: 0.7, iconSize: "text-2xl" },
    medium: { scale: 1, iconSize: "text-4xl" },
    large: { scale: 1.3, iconSize: "text-6xl" },
  };

  const skillConfig = {
    speed: {
      color: "#3b82f6",
      icon: "⚡",
      particle: "energy",
      trail: "lightning",
      effect: "Speed Boost",
      description: "Lightning fast movement",
      aura: "from-blue-500/20 to-cyan-500/20",
    },
    shooting: {
      color: "#ef4444",
      icon: "🎯",
      particle: "explosion",
      trail: "fire",
      effect: "Power Shot",
      description: "Devastating accuracy",
      aura: "from-red-500/20 to-orange-500/20",
    },
    defending: {
      color: "#10b981",
      icon: "🛡️",
      particle: "sparks",
      trail: "energy",
      effect: "Iron Defense",
      description: "Impenetrable barrier",
      aura: "from-green-500/20 to-emerald-500/20",
    },
    passing: {
      color: "#8b5cf6",
      icon: "🎪",
      particle: "magic",
      trail: "magic",
      effect: "Perfect Pass",
      description: "Pinpoint precision",
      aura: "from-purple-500/20 to-violet-500/20",
    },
    dribbling: {
      color: "#f59e0b",
      icon: "💫",
      particle: "stars",
      trail: "speed",
      effect: "Skill Move",
      description: "Mesmerizing control",
      aura: "from-yellow-500/20 to-amber-500/20",
    },
    goalkeeping: {
      color: "#06b6d4",
      icon: "🥅",
      particle: "energy",
      trail: "basic",
      effect: "Super Save",
      description: "Superhuman reflexes",
      aura: "from-cyan-500/20 to-blue-500/20",
    },
  };

  const config = skillConfig[skillType];
  const sizeSettings = sizeConfig[size];

  useEffect(() => {
    if (active) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), duration);
      return () => clearTimeout(timer);
    }
  }, [active, duration]);

  useEffect(() => {
    if (!isAnimating) return;

    const pulseInterval = setInterval(() => {
      setPulsePhase((prev) => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(pulseInterval);
  }, [isAnimating]);

  const getLevelMultiplier = () => {
    return Math.min(level / 5, 2); // Max 2x effect at level 5
  };

  const getIntensityMultiplier = () => {
    switch (intensity) {
      case "low":
        return 0.5;
      case "medium":
        return 1;
      case "high":
        return 1.5;
      default:
        return 1;
    }
  };

  const effectScale =
    getLevelMultiplier() * getIntensityMultiplier() * sizeSettings.scale;

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Main Skill Visual */}
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
        }}
      >
        {/* Skill Aura */}
        {isAnimating && (
          <div
            className={`absolute inset-0 rounded-full bg-gradient-radial ${config.aura} animate-pulse blur-lg`}
            style={{
              width: `${100 * effectScale}px`,
              height: `${100 * effectScale}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}

        {/* Skill Icon */}
        <div
          className={`relative ${sizeSettings.iconSize} transition-all duration-300 ${
            isAnimating ? "animate-bounce scale-125" : ""
          }`}
          style={{
            color: config.color,
            filter: isAnimating
              ? `drop-shadow(0 0 20px ${config.color})`
              : "none",
            textShadow: isAnimating ? `0 0 30px ${config.color}` : "none",
            transform: `scale(${effectScale})`,
          }}
        >
          {config.icon}
        </div>

        {/* Level Indicators */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i < level
                  ? isAnimating
                    ? "animate-pulse scale-125"
                    : "scale-100"
                  : "opacity-30"
              }`}
              style={{
                backgroundColor: i < level ? config.color : "#6b7280",
                boxShadow:
                  i < level && isAnimating
                    ? `0 0 10px ${config.color}`
                    : "none",
              }}
            />
          ))}
        </div>

        {/* Skill Name */}
        {isAnimating && (
          <div
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-center"
            style={{ color: config.color }}
          >
            <div className="text-sm font-bold animate-pulse">
              {config.effect}
            </div>
            <div className="text-xs opacity-80">{config.description}</div>
          </div>
        )}

        {/* Rotating Elements */}
        {isAnimating && level >= 3 && (
          <div className="absolute inset-0">
            {Array.from({ length: level }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full animate-spin"
                style={{
                  backgroundColor: config.color,
                  left: "50%",
                  top: "50%",
                  transformOrigin: `0 ${30 + i * 10}px`,
                  animationDuration: `${2 + i * 0.5}s`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Pulse Waves */}
        {isAnimating && (
          <>
            <div
              className="absolute inset-0 rounded-full border-2 animate-ping"
              style={{
                borderColor: config.color,
                width: `${60 * effectScale}px`,
                height: `${60 * effectScale}px`,
                transform: "translate(-50%, -50%)",
              }}
            />
            <div
              className="absolute inset-0 rounded-full border animate-ping animation-delay-75"
              style={{
                borderColor: config.color,
                width: `${80 * effectScale}px`,
                height: `${80 * effectScale}px`,
                transform: "translate(-50%, -50%)",
              }}
            />
          </>
        )}
      </div>

      {/* Particle Effects */}
      {isAnimating && (
        <ParticleSystem
          type={config.particle as any}
          intensity={intensity}
          color={config.color}
          duration={duration}
          trigger={true}
          position={position}
        />
      )}

      {/* Trail Effects for Movement Skills */}
      {isAnimating && (skillType === "speed" || skillType === "dribbling") && (
        <TrailEffect
          type={config.trail as any}
          color={config.color}
          intensity={intensity}
          follow={false}
          className="absolute inset-0"
        />
      )}

      {/* Special Level 5 Effects */}
      {isAnimating && level === 5 && (
        <div className="absolute inset-0">
          {/* Master Level Aura */}
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-spin"
            style={{
              width: `${120 * effectScale}px`,
              height: `${120 * effectScale}px`,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              animationDuration: "3s",
            }}
          />

          {/* Master Particles */}
          <ParticleSystem
            type="celebration"
            intensity="high"
            color="#fbbf24"
            duration={duration}
            trigger={true}
            position={position}
          />
        </div>
      )}
    </div>
  );
}
