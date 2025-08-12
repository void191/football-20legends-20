import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Character3D from "@/components/Character3D";
import PlayerCard from "@/components/PlayerCard";
import Stadium3D from "@/components/Stadium3D";
import ParticleSystem from "@/components/ParticleSystem";
import TrailEffect from "@/components/TrailEffect";
import VisualFeedback from "@/components/VisualFeedback";
import SkillEffects from "@/components/SkillEffects";
import MatchLoadingScreen from "@/components/MatchLoadingScreen";
import LoadingScreen from "@/components/LoadingScreen";
import { ArrowLeft, Play, Pause, RotateCcw, Sparkles, Zap } from "lucide-react";

export default function GameplayDemo() {
  const [showMatchLoading, setShowMatchLoading] = useState(false);
  const [showGameLoading, setShowGameLoading] = useState(false);
  const [feedbackEvents, setFeedbackEvents] = useState<any[]>([]);
  const [skillActive, setSkillActive] = useState(false);
  const [particleType, setParticleType] = useState<
    "sparks" | "stars" | "explosion" | "magic"
  >("sparks");

  const demoPlayers = [
    {
      name: "Lightning",
      level: 15,
      position: "forward" as const,
      team: "home" as const,
      stats: {
        speed: 95,
        shooting: 88,
        passing: 75,
        defending: 45,
        goalkeeping: 20,
        overall: 85,
      },
      rarity: "epic" as const,
      isAI: false,
      energy: 80,
      maxEnergy: 100,
    },
    {
      name: "AI_Defender",
      level: 12,
      position: "defender" as const,
      team: "away" as const,
      stats: {
        speed: 65,
        shooting: 35,
        passing: 80,
        defending: 92,
        goalkeeping: 15,
        overall: 75,
      },
      rarity: "rare" as const,
      isAI: true,
      energy: 100,
      maxEnergy: 100,
    },
    {
      name: "MidMaster",
      level: 18,
      position: "midfielder" as const,
      team: "home" as const,
      stats: {
        speed: 78,
        shooting: 82,
        passing: 95,
        defending: 70,
        goalkeeping: 25,
        overall: 88,
      },
      rarity: "legendary" as const,
      isAI: false,
      energy: 90,
      maxEnergy: 100,
    },
  ];

  const teamPlayers = [
    {
      id: "1",
      name: "Player1",
      position: "forward" as const,
      overall: 85,
      isAI: false,
    },
    {
      id: "2",
      name: "AI_Mid1",
      position: "midfielder" as const,
      overall: 78,
      isAI: true,
    },
    {
      id: "3",
      name: "AI_Def1",
      position: "defender" as const,
      overall: 82,
      isAI: true,
    },
    {
      id: "4",
      name: "AI_Def2",
      position: "defender" as const,
      overall: 79,
      isAI: true,
    },
    {
      id: "5",
      name: "AI_GK",
      position: "goalkeeper" as const,
      overall: 84,
      isAI: true,
    },
  ];

  const triggerFeedback = (
    type: "xp" | "goal" | "level_up" | "achievement",
  ) => {
    const event = {
      id: Date.now().toString(),
      type,
      value:
        type === "xp"
          ? 50
          : type === "goal"
            ? undefined
            : type === "level_up"
              ? undefined
              : undefined,
      message:
        type === "goal"
          ? "GOAL!"
          : type === "level_up"
            ? "LEVEL UP!"
            : type === "achievement"
              ? "Achievement Unlocked!"
              : undefined,
      position: {
        x: 50 + (Math.random() - 0.5) * 20,
        y: 50 + (Math.random() - 0.5) * 20,
      },
      timestamp: Date.now(),
    };

    setFeedbackEvents((prev) => [...prev, event]);
  };

  const handleEventComplete = (eventId: string) => {
    setFeedbackEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Loading Screens */}
      {showGameLoading && (
        <LoadingScreen
          onComplete={() => setShowGameLoading(false)}
          duration={3000}
        />
      )}

      {showMatchLoading && (
        <MatchLoadingScreen
          homeTeam={teamPlayers}
          awayTeam={teamPlayers.map((p) => ({ ...p, id: p.id + "_away" }))}
          arena="gold"
          matchType="ranked"
          onLoadComplete={() => setShowMatchLoading(false)}
          loadingDuration={6000}
        />
      )}

      {/* Visual Feedback System */}
      <VisualFeedback
        events={feedbackEvents}
        onEventComplete={handleEventComplete}
      />

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Stadium
              </Button>
            </Link>
            <div className="text-2xl font-bold text-primary">
              🎮 Visual Components Demo
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Demo Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-game-xp" />
              Interactive Demo Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                onClick={() => setShowGameLoading(true)}
                className="bg-game-xp hover:bg-game-xp/90"
              >
                Show Loading Screen
              </Button>
              <Button
                onClick={() => setShowMatchLoading(true)}
                className="bg-game-grass hover:bg-game-grass/90"
              >
                Match Loading
              </Button>
              <Button
                onClick={() => setSkillActive(!skillActive)}
                variant="outline"
              >
                <Zap className="w-4 h-4 mr-2" />
                Toggle Skill Effect
              </Button>
              <Button
                onClick={() => triggerFeedback("goal")}
                className="bg-red-500 hover:bg-red-600"
              >
                Trigger Goal Effect
              </Button>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                onClick={() => triggerFeedback("xp")}
                variant="outline"
                className="border-game-xp text-game-xp"
              >
                +XP Effect
              </Button>
              <Button
                onClick={() => triggerFeedback("level_up")}
                variant="outline"
                className="border-game-gold text-game-gold"
              >
                Level Up Effect
              </Button>
              <Button
                onClick={() => triggerFeedback("achievement")}
                variant="outline"
                className="border-purple-500 text-purple-500"
              >
                Achievement Effect
              </Button>
              <select
                className="px-3 py-2 rounded border bg-background"
                value={particleType}
                onChange={(e) => setParticleType(e.target.value as any)}
              >
                <option value="sparks">Sparks</option>
                <option value="stars">Stars</option>
                <option value="explosion">Explosion</option>
                <option value="magic">Magic</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* 3D Stadium Showcase */}
        <Card>
          <CardHeader>
            <CardTitle>🏟️ 3D Stadium Environments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(
                [
                  "rookie",
                  "bronze",
                  "silver",
                  "gold",
                  "platinum",
                  "champion",
                ] as const
              ).map((arena) => (
                <div key={arena} className="space-y-2">
                  <Stadium3D
                    arena={arena}
                    timeOfDay="evening"
                    weather="clear"
                    crowd="full"
                    animated={true}
                    size="medium"
                  />
                  <div className="text-center text-sm font-medium capitalize">
                    {arena} Arena
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Character Showcase */}
        <Card>
          <CardHeader>
            <CardTitle>⚽ 3D Character System</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {(["idle", "running", "kicking", "celebrating"] as const).map(
                (animation) => (
                  <div key={animation} className="text-center space-y-2">
                    <Character3D
                      size="large"
                      animation={animation}
                      team="home"
                      position="forward"
                    />
                    <div className="text-sm font-medium capitalize">
                      {animation}
                    </div>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>

        {/* Player Cards */}
        <Card>
          <CardHeader>
            <CardTitle>🎴 Player Card System</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {demoPlayers.map((player, index) => (
                <PlayerCard
                  key={index}
                  {...player}
                  onClick={() => triggerFeedback("xp")}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Particle Effects Demo */}
        <Card>
          <CardHeader>
            <CardTitle>✨ Particle Effects System</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 bg-gradient-to-br from-game-field/20 to-game-grass/20 rounded-lg overflow-hidden">
              <ParticleSystem
                type={particleType}
                intensity="high"
                color="#fbbf24"
                trigger={true}
                continuous={true}
                position={{ x: 25, y: 50 }}
              />

              <ParticleSystem
                type="energy"
                intensity="medium"
                color="#3b82f6"
                trigger={true}
                continuous={true}
                position={{ x: 75, y: 50 }}
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white/80">
                  <div className="text-2xl mb-2">🎆</div>
                  <div className="text-sm">Interactive Particle Effects</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trail Effects Demo */}
        <Card>
          <CardHeader>
            <CardTitle>🌟 Trail Effects System</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-48 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg overflow-hidden">
              <TrailEffect
                type="energy"
                color="#8b5cf6"
                intensity="high"
                follow={true}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white/80">
                    <div className="text-2xl mb-2">✨</div>
                    <div className="text-sm">
                      Move your mouse to see trails!
                    </div>
                  </div>
                </div>
              </TrailEffect>
            </div>
          </CardContent>
        </Card>

        {/* Skill Effects Demo */}
        <Card>
          <CardHeader>
            <CardTitle>⚡ Skill Effects System</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 bg-gradient-to-br from-game-grass/10 to-game-xp/10 rounded-lg overflow-hidden">
              <SkillEffects
                skillType="speed"
                level={4}
                active={skillActive}
                intensity="high"
                position={{ x: 30, y: 50 }}
                size="large"
              />

              <SkillEffects
                skillType="shooting"
                level={5}
                active={skillActive}
                intensity="high"
                position={{ x: 70, y: 50 }}
                size="large"
              />

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white/80">
                <div className="text-sm">
                  Click "Toggle Skill Effect" to activate!
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-game-xp/10 border-game-xp/30">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-game-xp mb-2">
                🎨 Complete Visual System
              </h3>
              <p className="text-muted-foreground mb-4">
                All visual components are now ready for your football game! The
                system includes:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>✅ 3D Character System</div>
                <div>✅ Stadium Environments</div>
                <div>✅ Particle Effects</div>
                <div>✅ Trail Systems</div>
                <div>✅ Skill Animations</div>
                <div>✅ Visual Feedback</div>
                <div>✅ Loading Screens</div>
                <div>✅ Player Cards</div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Ready for backend integration! Just swap placeholder data with
                real game state.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
