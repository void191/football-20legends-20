import { useState, useEffect, useRef } from "react";

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  life: number;
  maxLife: number;
}

interface TrailEffectProps {
  color?: string;
  width?: number;
  length?: number;
  intensity?: "low" | "medium" | "high";
  type?: "basic" | "energy" | "magic" | "speed" | "fire" | "lightning";
  follow?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function TrailEffect({
  color = "#3b82f6",
  width = 4,
  length = 20,
  intensity = "medium",
  type = "basic",
  follow = true,
  className = "",
  children,
}: TrailEffectProps) {
  const [trails, setTrails] = useState<TrailPoint[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const trailIdRef = useRef(0);

  const intensityConfig = {
    low: { frequency: 100, particles: 1 },
    medium: { frequency: 50, particles: 2 },
    high: { frequency: 25, particles: 3 },
  };

  const typeEffects = {
    basic: {
      colors: [color],
      blur: 0,
      glow: false,
      particles: ["●"],
    },
    energy: {
      colors: ["#3b82f6", "#06b6d4", "#8b5cf6"],
      blur: 2,
      glow: true,
      particles: ["⚡", "🔋", "💫"],
    },
    magic: {
      colors: ["#8b5cf6", "#ec4899", "#f59e0b"],
      blur: 3,
      glow: true,
      particles: ["✨", "🌟", "💫", "⭐"],
    },
    speed: {
      colors: ["#ef4444", "#f97316", "#eab308"],
      blur: 1,
      glow: true,
      particles: ["💨", "⚡", "🔥"],
    },
    fire: {
      colors: ["#ef4444", "#f97316", "#facc15"],
      blur: 2,
      glow: true,
      particles: ["🔥", "💥", "⚡"],
    },
    lightning: {
      colors: ["#06b6d4", "#3b82f6", "#8b5cf6"],
      blur: 1,
      glow: true,
      particles: ["⚡", "🌟", "💫"],
    },
  };

  const config = typeEffects[type];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !follow) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePos({ x, y });
  };

  const createTrailPoint = () => {
    const trailId = trailIdRef.current++;
    const maxLife = 1000 + Math.random() * 500;

    return {
      id: trailId,
      x: mousePos.x + (Math.random() - 0.5) * 5,
      y: mousePos.y + (Math.random() - 0.5) * 5,
      life: maxLife,
      maxLife,
    };
  };

  useEffect(() => {
    const updateTrails = () => {
      setTrails((prevTrails) =>
        prevTrails
          .map((trail) => ({ ...trail, life: trail.life - 16 }))
          .filter((trail) => trail.life > 0),
      );
    };

    const interval = setInterval(updateTrails, 16);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!follow) return;

    const { frequency, particles } = intensityConfig[intensity];

    const addTrails = () => {
      const newTrails: TrailPoint[] = [];
      for (let i = 0; i < particles; i++) {
        newTrails.push(createTrailPoint());
      }
      setTrails((prev) => [...prev, ...newTrails].slice(-length));
    };

    const interval = setInterval(addTrails, frequency);
    return () => clearInterval(interval);
  }, [mousePos, intensity, length, follow]);

  const getTrailColor = (index: number) => {
    return config.colors[index % config.colors.length];
  };

  const getTrailParticle = (index: number) => {
    return config.particles[index % config.particles.length];
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
    >
      {children}

      {/* Trail Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {trails.map((trail, index) => {
          const opacity = trail.life / trail.maxLife;
          const scale = 0.3 + opacity * 0.7;
          const trailColor = getTrailColor(index);

          return (
            <div
              key={trail.id}
              className="absolute transition-all duration-75 ease-out"
              style={{
                left: `${trail.x}%`,
                top: `${trail.y}%`,
                opacity: opacity * 0.8,
                transform: `translate(-50%, -50%) scale(${scale})`,
                color: trailColor,
                filter: config.glow
                  ? `blur(${config.blur}px) drop-shadow(0 0 ${opacity * 8}px ${trailColor})`
                  : `blur(${config.blur}px)`,
                fontSize: `${width * 2}px`,
                textShadow: config.glow
                  ? `0 0 ${opacity * 10}px ${trailColor}`
                  : "none",
              }}
            >
              {type === "basic" ? "●" : getTrailParticle(index)}
            </div>
          );
        })}
      </div>

      {/* SVG Trail for basic type */}
      {type === "basic" && trails.length > 1 && (
        <svg
          className="absolute inset-0 pointer-events-none"
          width="100%"
          height="100%"
        >
          <defs>
            <linearGradient
              id="trailGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={color} stopOpacity="0" />
              <stop offset="100%" stopColor={color} stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path
            d={`M ${trails.map((trail) => `${trail.x},${trail.y}`).join(" L ")}`}
            stroke="url(#trailGradient)"
            strokeWidth={width}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}
