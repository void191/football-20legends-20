import { useState, useEffect } from "react";
import ParticleSystem from "./ParticleSystem";

interface FeedbackEvent {
  id: string;
  type:
    | "xp"
    | "level_up"
    | "trophy"
    | "goal"
    | "save"
    | "skill"
    | "achievement";
  value?: number;
  message?: string;
  position?: { x: number; y: number };
  timestamp: number;
}

interface VisualFeedbackProps {
  events: FeedbackEvent[];
  onEventComplete?: (eventId: string) => void;
  className?: string;
}

export default function VisualFeedback({
  events,
  onEventComplete,
  className = "",
}: VisualFeedbackProps) {
  const [activeEvents, setActiveEvents] = useState<FeedbackEvent[]>([]);

  useEffect(() => {
    setActiveEvents(events);

    // Auto-remove events after their duration
    events.forEach((event) => {
      const duration = getFeedbackDuration(event.type);
      setTimeout(() => {
        setActiveEvents((prev) => prev.filter((e) => e.id !== event.id));
        onEventComplete?.(event.id);
      }, duration);
    });
  }, [events, onEventComplete]);

  const getFeedbackDuration = (type: string) => {
    switch (type) {
      case "xp":
        return 2000;
      case "level_up":
        return 4000;
      case "trophy":
        return 3000;
      case "goal":
        return 5000;
      case "save":
        return 2500;
      case "skill":
        return 3000;
      case "achievement":
        return 4000;
      default:
        return 2000;
    }
  };

  const getFeedbackConfig = (type: string) => {
    switch (type) {
      case "xp":
        return {
          color: "#3b82f6",
          icon: "⚡",
          scale: "scale-110",
          particle: "energy",
          animation: "animate-bounce",
        };
      case "level_up":
        return {
          color: "#f59e0b",
          icon: "⬆️",
          scale: "scale-125",
          particle: "celebration",
          animation: "animate-pulse",
        };
      case "trophy":
        return {
          color: "#eab308",
          icon: "🏆",
          scale: "scale-120",
          particle: "stars",
          animation: "animate-bounce",
        };
      case "goal":
        return {
          color: "#ef4444",
          icon: "⚽",
          scale: "scale-150",
          particle: "explosion",
          animation: "animate-ping",
        };
      case "save":
        return {
          color: "#10b981",
          icon: "🥅",
          scale: "scale-115",
          particle: "sparks",
          animation: "animate-pulse",
        };
      case "skill":
        return {
          color: "#8b5cf6",
          icon: "🌟",
          scale: "scale-125",
          particle: "magic",
          animation: "animate-bounce",
        };
      case "achievement":
        return {
          color: "#f59e0b",
          icon: "🎖️",
          scale: "scale-130",
          particle: "celebration",
          animation: "animate-pulse",
        };
      default:
        return {
          color: "#6b7280",
          icon: "✨",
          scale: "scale-100",
          particle: "sparks",
          animation: "animate-fade",
        };
    }
  };

  return (
    <div className={`fixed inset-0 pointer-events-none z-50 ${className}`}>
      {activeEvents.map((event) => {
        const config = getFeedbackConfig(event.type);
        const position = event.position || { x: 50, y: 50 };

        return (
          <div key={event.id} className="absolute inset-0">
            {/* Particle Effect */}
            <ParticleSystem
              type={config.particle as any}
              intensity="high"
              color={config.color}
              duration={getFeedbackDuration(event.type)}
              trigger={true}
              position={position}
            />

            {/* Main Feedback Display */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
              }}
            >
              <div
                className={`
                flex flex-col items-center gap-2 p-4 bg-black/80 rounded-lg border-2 backdrop-blur-sm
                ${config.scale} ${config.animation} transition-all duration-500
              `}
                style={{ borderColor: config.color }}
              >
                {/* Icon */}
                <div
                  className="text-4xl mb-2"
                  style={{
                    filter: `drop-shadow(0 0 10px ${config.color})`,
                    textShadow: `0 0 20px ${config.color}`,
                  }}
                >
                  {config.icon}
                </div>

                {/* Message */}
                {event.message && (
                  <div
                    className="text-lg font-bold text-center"
                    style={{ color: config.color }}
                  >
                    {event.message}
                  </div>
                )}

                {/* Value */}
                {event.value && (
                  <div
                    className="text-2xl font-bold"
                    style={{ color: config.color }}
                  >
                    +{event.value}
                  </div>
                )}

                {/* Type-specific additions */}
                {event.type === "level_up" && (
                  <div className="text-sm text-yellow-300 animate-pulse">
                    🎉 New abilities unlocked! 🎉
                  </div>
                )}

                {event.type === "goal" && (
                  <div className="text-sm text-red-300 animate-bounce">
                    ⚽ GOOOAL! ⚽
                  </div>
                )}

                {event.type === "achievement" && (
                  <div className="text-sm text-yellow-300 animate-pulse">
                    🏆 Achievement Unlocked! 🏆
                  </div>
                )}
              </div>

              {/* Floating Animation */}
              <div className="absolute inset-0 animate-ping opacity-20">
                <div
                  className="w-full h-full rounded-lg border-2"
                  style={{ borderColor: config.color }}
                ></div>
              </div>
            </div>

            {/* Screen Flash Effect for Major Events */}
            {(event.type === "level_up" ||
              event.type === "goal" ||
              event.type === "achievement") && (
              <div
                className="absolute inset-0 animate-pulse opacity-10"
                style={{ backgroundColor: config.color }}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
