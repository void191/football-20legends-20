import { useState, useEffect } from "react";
import Character3D from "./Character3D";
import ParticleSystem from "./ParticleSystem";
import SkillEffects from "./SkillEffects";

interface CharacterCustomization {
  hair: string;
  face: string;
  jersey: string;
  shorts: string;
  boots: string;
  number: number;
  position: "forward" | "midfielder" | "defender" | "goalkeeper";
  team: "home" | "away";
}

interface Character3DPreviewProps {
  customization: CharacterCustomization;
  animation?: "idle" | "running" | "kicking" | "celebrating" | "defending";
  showSkills?: boolean;
  skillLevel?: number;
  interactive?: boolean;
  size?: "small" | "medium" | "large" | "xl";
  className?: string;
}

export default function Character3DPreview({
  customization,
  animation = "idle",
  showSkills = false,
  skillLevel = 1,
  interactive = true,
  size = "large",
  className = "",
}: Character3DPreviewProps) {
  const [currentAnimation, setCurrentAnimation] = useState(animation);
  const [isHovered, setIsHovered] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  const sizeClasses = {
    small: "w-32 h-40",
    medium: "w-48 h-56",
    large: "w-64 h-80",
    xl: "w-80 h-96",
  };

  const customizationStyles = {
    hair: {
      classic: { color: "#8B4513", style: "rounded-t-full" },
      mohawk: { color: "#FF4500", style: "rounded-t-lg" },
      long: { color: "#4B0082", style: "rounded-t-3xl" },
      bald: { color: "#D2B48C", style: "rounded-full" },
    },
    face: {
      friendly: { expression: "😊", mood: "happy" },
      determined: { expression: "😤", mood: "focused" },
      fierce: { expression: "😠", mood: "intense" },
      cool: { expression: "😎", mood: "confident" },
    },
    jersey: {
      home: { color: "from-blue-600 to-blue-700", pattern: "solid" },
      away: { color: "from-red-600 to-red-700", pattern: "solid" },
      third: { color: "from-green-600 to-green-700", pattern: "solid" },
      retro: { color: "from-yellow-600 to-yellow-700", pattern: "striped" },
    },
  };

  useEffect(() => {
    if (interactive) {
      // Auto-cycle through animations when hovered
      if (isHovered) {
        const animations = ["running", "kicking", "celebrating"];
        let index = 0;
        const interval = setInterval(() => {
          setCurrentAnimation(animations[index]);
          index = (index + 1) % animations.length;
        }, 2000);
        return () => clearInterval(interval);
      } else {
        setCurrentAnimation("idle");
      }
    }
  }, [isHovered, interactive]);

  useEffect(() => {
    if (interactive && isHovered) {
      const rotateInterval = setInterval(() => {
        setRotationAngle((prev) => (prev + 5) % 360);
      }, 100);
      return () => clearInterval(rotateInterval);
    } else {
      setRotationAngle(0);
    }
  }, [isHovered, interactive]);

  const handleClick = () => {
    if (interactive) {
      setShowStats(!showStats);
    }
  };

  return (
    <div
      className={`relative ${sizeClasses[size]} ${className} cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* 3D Stage Environment */}
      <div className="absolute inset-0 bg-gradient-to-b from-game-field/20 to-game-grass/30 rounded-xl overflow-hidden">
        {/* Stadium Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent">
          {/* Grass Field */}
          <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-green-700/50 to-green-600/30">
            {/* Field Lines */}
            <div className="absolute bottom-0 inset-x-0 h-px bg-white/20"></div>
            <div className="absolute bottom-4 left-1/2 w-8 h-8 border border-white/20 rounded-full transform -translate-x-1/2"></div>
          </div>

          {/* Stadium Lights */}
          <div className="absolute top-4 inset-x-0 flex justify-center gap-4">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-yellow-300/60 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            ))}
          </div>
        </div>

        {/* Character Display */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-300"
          style={{
            transform: `translateX(-50%) rotate(${rotationAngle}deg) scale(${isHovered ? 1.1 : 1})`,
          }}
        >
          <Character3D
            size={size}
            animation={currentAnimation}
            team={customization.team}
            position={customization.position}
          />

          {/* Character Shadow */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-black/30 rounded-full blur-sm"></div>
        </div>

        {/* Skill Effects */}
        {showSkills && isHovered && (
          <SkillEffects
            skillType="speed"
            level={skillLevel}
            active={true}
            position={{ x: 50, y: 70 }}
            size="medium"
          />
        )}

        {/* Particle Effects */}
        {isHovered && (
          <ParticleSystem
            type="stars"
            intensity="low"
            color="#fbbf24"
            trigger={true}
            position={{ x: 50, y: 60 }}
            continuous={true}
            className="absolute inset-0"
          />
        )}

        {/* Jersey Number Display */}
        <div className="absolute top-4 right-4 bg-black/60 rounded-full w-8 h-8 flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            {customization.number}
          </span>
        </div>

        {/* Position Badge */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-game-xp to-game-grass text-white px-2 py-1 rounded text-xs font-bold">
          {customization.position.toUpperCase()}
        </div>

        {/* Stats Overlay */}
        {showStats && (
          <div className="absolute inset-x-2 bottom-2 bg-black/80 backdrop-blur rounded-lg p-3 text-white text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>Hair: {customization.hair}</div>
              <div>Jersey: {customization.jersey}</div>
              <div>Boots: {customization.boots}</div>
              <div>Team: {customization.team}</div>
            </div>
          </div>
        )}

        {/* Customization Highlights */}
        {isHovered && (
          <div className="absolute inset-0">
            {/* Hair Highlight */}
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-2 bg-yellow-400/60 rounded-full animate-ping"></div>
            </div>

            {/* Jersey Highlight */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-2 bg-blue-400/60 rounded-full animate-ping animation-delay-75"></div>
            </div>

            {/* Boots Highlight */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="w-2 h-2 bg-green-400/60 rounded-full animate-ping animation-delay-150"></div>
            </div>
          </div>
        )}

        {/* Interactive Hints */}
        {interactive && !isHovered && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center">
            <div className="text-xs text-white/60 animate-pulse">
              Hover to preview • Click for details
            </div>
          </div>
        )}

        {/* Animation Preview Controls */}
        {interactive && isHovered && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex gap-1">
            {["idle", "running", "kicking", "celebrating"].map((anim) => (
              <button
                key={anim}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentAnimation(anim as any);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentAnimation === anim ? "bg-yellow-400" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}

        {/* Rarity Glow Effect */}
        {skillLevel >= 4 && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-purple-500/10 animate-pulse rounded-xl"></div>
        )}
      </div>
    </div>
  );
}
