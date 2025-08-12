import { useState, useEffect, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  type: string;
}

interface ParticleSystemProps {
  type?:
    | "sparks"
    | "stars"
    | "trail"
    | "explosion"
    | "magic"
    | "energy"
    | "celebration";
  intensity?: "low" | "medium" | "high";
  color?: string;
  duration?: number;
  trigger?: boolean;
  continuous?: boolean;
  position?: { x: number; y: number };
  className?: string;
}

export default function ParticleSystem({
  type = "sparks",
  intensity = "medium",
  color = "#3b82f6",
  duration = 2000,
  trigger = false,
  continuous = false,
  position = { x: 50, y: 50 },
  className = "",
}: ParticleSystemProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const intensityConfig = {
    low: { count: 10, rate: 5 },
    medium: { count: 25, rate: 10 },
    high: { count: 50, rate: 20 },
  };

  const typeConfig = {
    sparks: {
      particles: ["✨", "⭐", "💫"],
      velocity: { min: 2, max: 8 },
      life: { min: 1000, max: 2000 },
      size: { min: 8, max: 16 },
    },
    stars: {
      particles: ["🌟", "⭐", "✨"],
      velocity: { min: 1, max: 4 },
      life: { min: 1500, max: 3000 },
      size: { min: 12, max: 20 },
    },
    trail: {
      particles: ["⚡", "💨", "💫"],
      velocity: { min: 3, max: 6 },
      life: { min: 800, max: 1500 },
      size: { min: 10, max: 18 },
    },
    explosion: {
      particles: ["💥", "🔥", "⚡", "✨"],
      velocity: { min: 5, max: 12 },
      life: { min: 500, max: 1200 },
      size: { min: 16, max: 24 },
    },
    magic: {
      particles: ["🔮", "✨", "🌟", "💫", "⭐"],
      velocity: { min: 1, max: 5 },
      life: { min: 2000, max: 4000 },
      size: { min: 14, max: 22 },
    },
    energy: {
      particles: ["⚡", "🔋", "💡", "🌟"],
      velocity: { min: 2, max: 7 },
      life: { min: 1200, max: 2500 },
      size: { min: 12, max: 18 },
    },
    celebration: {
      particles: ["🎉", "🎊", "🥳", "🏆", "⚡", "✨"],
      velocity: { min: 3, max: 9 },
      life: { min: 1500, max: 3000 },
      size: { min: 16, max: 24 },
    },
  };

  const createParticle = (id: number): Particle => {
    const config = typeConfig[type];
    const angle = Math.random() * Math.PI * 2;
    const speed =
      config.velocity.min +
      Math.random() * (config.velocity.max - config.velocity.min);
    const life =
      config.life.min + Math.random() * (config.life.max - config.life.min);

    return {
      id,
      x: position.x + (Math.random() - 0.5) * 20,
      y: position.y + (Math.random() - 0.5) * 20,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life,
      maxLife: life,
      size:
        config.size.min + Math.random() * (config.size.max - config.size.min),
      color,
      type: config.particles[
        Math.floor(Math.random() * config.particles.length)
      ],
    };
  };

  const updateParticles = () => {
    setParticles((prevParticles) => {
      return prevParticles
        .map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.2, // gravity
          life: particle.life - 16,
        }))
        .filter((particle) => particle.life > 0);
    });
  };

  const generateParticles = () => {
    if (!isActive) return;

    const config = intensityConfig[intensity];
    const newParticles: Particle[] = [];

    for (let i = 0; i < config.rate; i++) {
      newParticles.push(createParticle(Date.now() + i));
    }

    setParticles((prev) => [...prev, ...newParticles].slice(-config.count));
  };

  useEffect(() => {
    if (trigger || continuous) {
      setIsActive(true);
      if (!continuous) {
        const timer = setTimeout(() => setIsActive(false), duration);
        return () => clearTimeout(timer);
      }
    } else {
      setIsActive(false);
    }
  }, [trigger, continuous, duration]);

  useEffect(() => {
    if (!isActive && !continuous) return;

    const animationFrame = setInterval(updateParticles, 16);
    const generationFrame = setInterval(
      generateParticles,
      continuous ? 100 : 50,
    );

    return () => {
      clearInterval(animationFrame);
      clearInterval(generationFrame);
    };
  }, [isActive, continuous, type, intensity, position]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {particles.map((particle) => {
        const opacity = particle.life / particle.maxLife;
        const scale = 0.5 + (particle.life / particle.maxLife) * 0.5;

        return (
          <div
            key={particle.id}
            className="absolute transition-all duration-75 ease-out"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              fontSize: `${particle.size}px`,
              opacity: opacity,
              transform: `translate(-50%, -50%) scale(${scale})`,
              filter: `blur(${(1 - opacity) * 2}px)`,
              textShadow: `0 0 ${opacity * 10}px ${particle.color}`,
            }}
          >
            {particle.type}
          </div>
        );
      })}
    </div>
  );
}
