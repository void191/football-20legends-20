import { useState, useEffect } from "react";
import ParticleSystem from "./ParticleSystem";

interface Stadium3DProps {
  arena: "rookie" | "bronze" | "silver" | "gold" | "platinum" | "champion";
  timeOfDay?: "day" | "evening" | "night";
  weather?: "clear" | "rain" | "snow" | "fog";
  crowd?: "empty" | "low" | "medium" | "full";
  animated?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
}

export default function Stadium3D({
  arena,
  timeOfDay = "day",
  weather = "clear",
  crowd = "medium",
  animated = true,
  size = "medium",
  className = "",
}: Stadium3DProps) {
  const [cloudPositions, setCloudPositions] = useState<
    Array<{ x: number; y: number; speed: number }>
  >([]);
  const [crowdCheer, setCrowdCheer] = useState(false);

  const sizeClasses = {
    small: "h-32",
    medium: "h-48",
    large: "h-64",
  };

  const arenaConfig = {
    rookie: {
      grassColor: "from-green-600 to-green-700",
      stadiumColor: "from-gray-600 to-gray-700",
      lightsColor: "text-yellow-200",
      skyColor: "from-blue-400 to-blue-500",
      capacity: "5,000",
      atmosphere: "local",
      specialEffect: null,
    },
    bronze: {
      grassColor: "from-green-500 to-green-600",
      stadiumColor: "from-amber-700 to-amber-800",
      lightsColor: "text-yellow-300",
      skyColor: "from-orange-300 to-orange-400",
      capacity: "15,000",
      atmosphere: "energetic",
      specialEffect: "bronze-glow",
    },
    silver: {
      grassColor: "from-green-400 to-green-500",
      stadiumColor: "from-slate-600 to-slate-700",
      lightsColor: "text-blue-200",
      skyColor: "from-slate-300 to-slate-400",
      capacity: "35,000",
      atmosphere: "electric",
      specialEffect: "silver-shimmer",
    },
    gold: {
      grassColor: "from-green-300 to-green-400",
      stadiumColor: "from-yellow-600 to-yellow-700",
      lightsColor: "text-yellow-100",
      skyColor: "from-yellow-200 to-yellow-300",
      capacity: "65,000",
      atmosphere: "legendary",
      specialEffect: "gold-sparkle",
    },
    platinum: {
      grassColor: "from-green-200 to-green-300",
      stadiumColor: "from-cyan-600 to-cyan-700",
      lightsColor: "text-cyan-100",
      skyColor: "from-cyan-200 to-cyan-300",
      capacity: "90,000",
      atmosphere: "phenomenal",
      specialEffect: "platinum-beam",
    },
    champion: {
      grassColor: "from-green-100 to-green-200",
      stadiumColor: "from-purple-700 to-purple-800",
      lightsColor: "text-purple-100",
      skyColor: "from-purple-300 to-purple-400",
      capacity: "120,000",
      atmosphere: "mythical",
      specialEffect: "champion-aura",
    },
  };

  const timeConfig = {
    day: {
      skyGradient: "from-blue-300 to-blue-500",
      lightIntensity: "opacity-30",
      shadows: "opacity-20",
    },
    evening: {
      skyGradient: "from-orange-300 to-purple-400",
      lightIntensity: "opacity-60",
      shadows: "opacity-40",
    },
    night: {
      skyGradient: "from-purple-900 to-black",
      lightIntensity: "opacity-100",
      shadows: "opacity-60",
    },
  };

  const crowdConfig = {
    empty: { density: 0, cheer: false, volume: "silent" },
    low: { density: 25, cheer: false, volume: "quiet" },
    medium: { density: 60, cheer: true, volume: "moderate" },
    full: { density: 95, cheer: true, volume: "loud" },
  };

  const config = arenaConfig[arena];
  const time = timeConfig[timeOfDay];
  const crowdInfo = crowdConfig[crowd];

  useEffect(() => {
    // Initialize cloud positions
    const clouds = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * 100,
      y: 10 + Math.random() * 20,
      speed: 0.1 + Math.random() * 0.3,
    }));
    setCloudPositions(clouds);

    // Crowd cheering animation
    if (animated && crowdInfo.cheer) {
      const cheerInterval = setInterval(
        () => {
          setCrowdCheer(true);
          setTimeout(() => setCrowdCheer(false), 2000);
        },
        8000 + Math.random() * 10000,
      );

      return () => clearInterval(cheerInterval);
    }
  }, [animated, crowdInfo.cheer]);

  useEffect(() => {
    if (!animated) return;

    const moveCloud = () => {
      setCloudPositions((prev) =>
        prev.map((cloud) => ({
          ...cloud,
          x: cloud.x + cloud.speed > 100 ? -10 : cloud.x + cloud.speed,
        })),
      );
    };

    const interval = setInterval(moveCloud, 100);
    return () => clearInterval(interval);
  }, [animated]);

  return (
    <div
      className={`relative overflow-hidden rounded-xl ${sizeClasses[size]} ${className}`}
    >
      {/* Sky Background */}
      <div className={`absolute inset-0 bg-gradient-to-b ${time.skyGradient}`}>
        {/* Clouds */}
        {cloudPositions.map((cloud, index) => (
          <div
            key={index}
            className="absolute text-white/60 text-2xl"
            style={{
              left: `${cloud.x}%`,
              top: `${cloud.y}%`,
              transform: "translateX(-50%)",
            }}
          >
            ☁️
          </div>
        ))}

        {/* Weather Effects */}
        {weather === "rain" && (
          <div className="absolute inset-0">
            {Array.from({ length: 50 }, (_, i) => (
              <div
                key={i}
                className="absolute w-px h-4 bg-blue-200/60 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}

        {weather === "snow" && (
          <div className="absolute inset-0">
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className="absolute text-white/80 animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: "3s",
                }}
              >
                ❄️
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stadium Structure */}
      <div className="absolute bottom-0 inset-x-0 h-3/4">
        {/* Stadium Bowl */}
        <div
          className={`absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t ${config.stadiumColor} rounded-t-3xl`}
        >
          {/* Stadium Lights */}
          <div className="absolute top-0 inset-x-0 flex justify-around">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 ${config.lightsColor} ${time.lightIntensity} rounded-full`}
              >
                💡
              </div>
            ))}
          </div>

          {/* Crowd */}
          <div className="absolute top-4 inset-x-2 h-8 overflow-hidden">
            {Array.from(
              { length: Math.floor(crowdInfo.density / 5) },
              (_, i) => (
                <div
                  key={i}
                  className={`absolute w-1 h-1 bg-gradient-to-r from-red-400 to-blue-400 rounded-full ${
                    crowdCheer ? "animate-bounce" : ""
                  }`}
                  style={{
                    left: `${i * 5 + Math.random() * 3}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 0.5}s`,
                  }}
                />
              ),
            )}
          </div>
        </div>

        {/* Football Pitch */}
        <div
          className={`absolute bottom-0 inset-x-4 h-2/3 bg-gradient-to-br ${config.grassColor} rounded-lg`}
        >
          {/* Field Lines */}
          <div className="absolute inset-2 border-2 border-white/30 rounded">
            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 w-8 h-8 border border-white/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            {/* Center Line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/30 transform -translate-x-1/2"></div>
            {/* Goal Areas */}
            <div className="absolute top-1/2 left-0 w-3 h-6 border-r border-white/30 transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 right-0 w-3 h-6 border-l border-white/30 transform -translate-y-1/2"></div>
            {/* Goals */}
            <div className="absolute top-1/2 -left-1 w-2 h-4 bg-white/60 transform -translate-y-1/2">
              🥅
            </div>
            <div className="absolute top-1/2 -right-1 w-2 h-4 bg-white/60 transform -translate-y-1/2">
              🥅
            </div>
          </div>

          {/* Field Shadows */}
          <div
            className={`absolute inset-0 bg-black/10 ${time.shadows} rounded-lg`}
          ></div>
        </div>
      </div>

      {/* Special Arena Effects */}
      {config.specialEffect && (
        <div className="absolute inset-0">
          {config.specialEffect === "bronze-glow" && (
            <div className="absolute inset-0 bg-amber-500/10 animate-pulse rounded-xl"></div>
          )}

          {config.specialEffect === "silver-shimmer" && (
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-300/60 rounded-full animate-ping"></div>
              <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-300/60 rounded-full animate-ping animation-delay-75"></div>
            </div>
          )}

          {config.specialEffect === "gold-sparkle" && (
            <ParticleSystem
              type="stars"
              intensity="low"
              color="#fbbf24"
              continuous={true}
              position={{ x: 50, y: 30 }}
            />
          )}

          {config.specialEffect === "platinum-beam" && (
            <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-cyan-300/60 to-transparent transform -translate-x-1/2 animate-pulse"></div>
          )}

          {config.specialEffect === "champion-aura" && (
            <ParticleSystem
              type="magic"
              intensity="medium"
              color="#a855f7"
              continuous={true}
              position={{ x: 50, y: 50 }}
            />
          )}
        </div>
      )}

      {/* Stadium Info Overlay */}
      <div className="absolute bottom-2 left-2 text-xs text-white/80 bg-black/50 rounded px-2 py-1">
        <div className="font-semibold">
          {config.atmosphere.toUpperCase()} ATMOSPHERE
        </div>
        <div>Capacity: {config.capacity}</div>
        <div>Crowd: {crowdInfo.volume}</div>
      </div>

      {/* Weather Indicator */}
      {weather !== "clear" && (
        <div className="absolute top-2 right-2 text-white/80 bg-black/50 rounded px-2 py-1 text-xs">
          {weather === "rain" ? "🌧️" : weather === "snow" ? "❄️" : "🌫️"}{" "}
          {weather}
        </div>
      )}
    </div>
  );
}
