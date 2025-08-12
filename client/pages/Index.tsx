import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Stadium3D from "@/components/Stadium3D";
import {
  Trophy,
  Zap,
  Users,
  Settings,
  Star,
  Play,
  UserPlus,
  BarChart3,
  Shield,
} from "lucide-react";

interface Arena {
  id: number;
  name: string;
  minTrophies: number;
  image: string;
  unlocked: boolean;
}

interface PlayerStats {
  level: number;
  xp: number;
  xpToNext: number;
  trophies: number;
  energy: number;
  maxEnergy: number;
}

export default function Index() {
  const [playerStats] = useState<PlayerStats>({
    level: 15,
    xp: 750,
    xpToNext: 1000,
    trophies: 2150,
    energy: 8,
    maxEnergy: 10,
  });

  const arenas: Arena[] = [
    {
      id: 1,
      name: "Rookie Field",
      minTrophies: 0,
      image: "🏟️",
      unlocked: true,
    },
    {
      id: 2,
      name: "Bronze Stadium",
      minTrophies: 500,
      image: "🥉",
      unlocked: true,
    },
    {
      id: 3,
      name: "Silver Arena",
      minTrophies: 1000,
      image: "🥈",
      unlocked: true,
    },
    {
      id: 4,
      name: "Gold Coliseum",
      minTrophies: 2000,
      image: "🥇",
      unlocked: true,
    },
    {
      id: 5,
      name: "Platinum Dome",
      minTrophies: 3000,
      image: "💎",
      unlocked: false,
    },
    {
      id: 6,
      name: "Champion League",
      minTrophies: 5000,
      image: "👑",
      unlocked: false,
    },
  ];

  const currentArena =
    arenas.find(
      (arena) =>
        playerStats.trophies >= arena.minTrophies &&
        (arenas[arena.id]
          ? playerStats.trophies < arenas[arena.id].minTrophies
          : true),
    ) || arenas[0];

  const xpProgress = (playerStats.xp / playerStats.xpToNext) * 100;
  const energyProgress = (playerStats.energy / playerStats.maxEnergy) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-primary">
                ⚽ FutbolLegends
              </div>
              <Badge
                variant="outline"
                className="bg-game-gold/10 text-game-gold border-game-gold"
              >
                Level {playerStats.level}
              </Badge>
            </div>
            <nav className="flex items-center gap-2">
              <Link to="/stats">
                <Button variant="ghost" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Stats
                </Button>
              </Link>
              <Link to="/friends">
                <Button variant="ghost" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Friends
                </Button>
              </Link>
              <Link to="/customize">
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Customize
                </Button>
              </Link>
              <Link to="/demo">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-game-xp/10 text-game-xp"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Visual Demo
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Player Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-game-xp/20 to-game-xp/10 border-game-xp/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Experience</span>
                <Zap className="w-4 h-4 text-game-xp" />
              </div>
              <div className="text-2xl font-bold mb-2">
                {playerStats.xp.toLocaleString()} XP
              </div>
              <Progress value={xpProgress} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">
                {playerStats.xpToNext - playerStats.xp} XP to level{" "}
                {playerStats.level + 1}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-game-gold/20 to-game-gold/10 border-game-gold/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Trophies</span>
                <Trophy className="w-4 h-4 text-game-gold" />
              </div>
              <div className="text-2xl font-bold mb-2">
                {playerStats.trophies.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                Current Arena: {currentArena.name}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-game-energy/20 to-game-energy/10 border-game-energy/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Energy</span>
                <Zap className="w-4 h-4 text-game-energy" />
              </div>
              <div className="text-2xl font-bold mb-2">
                {playerStats.energy}/{playerStats.maxEnergy}
              </div>
              <Progress value={energyProgress} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">
                Refills in 45 minutes
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Stadium View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stadium Arena */}
          <Card className="bg-gradient-to-b from-game-grass/20 to-game-field/20 border-game-grass/30 overflow-hidden">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Stadium3D
                  arena={
                    currentArena.id === 1
                      ? "rookie"
                      : currentArena.id === 2
                        ? "bronze"
                        : currentArena.id === 3
                          ? "silver"
                          : currentArena.id === 4
                            ? "gold"
                            : currentArena.id === 5
                              ? "platinum"
                              : "champion"
                  }
                  timeOfDay="evening"
                  weather="clear"
                  crowd="full"
                  animated={true}
                  size="large"
                  className="mb-4"
                />
                <h2 className="text-2xl font-bold text-game-grass mb-2">
                  {currentArena.name}
                </h2>
                <Badge
                  variant="outline"
                  className="bg-game-gold/10 text-game-gold border-game-gold"
                >
                  {playerStats.trophies} Trophies
                </Badge>
              </div>

              <div className="space-y-4">
                <Button
                  size="lg"
                  className="w-full bg-game-grass hover:bg-game-grass/90 text-white"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Play Match (5v5)
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-game-xp text-game-xp hover:bg-game-xp/10"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Friendly Match
                </Button>
              </div>

              <div className="mt-6 p-4 bg-card/50 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Star className="w-4 h-4 mr-2 text-game-gold" />
                  Match Rewards
                </h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• Win: +50-80 XP, +15-25 Trophies</div>
                  <div>• Loss: +20-30 XP, -10-15 Trophies</div>
                  <div>• MVP Bonus: +20 XP</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Arena Progression */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-game-gold" />
                Arena Progression
              </h3>

              <div className="space-y-3">
                {arenas.map((arena) => (
                  <div
                    key={arena.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                      arena.id === currentArena.id
                        ? "bg-game-grass/10 border-game-grass text-game-grass"
                        : arena.unlocked
                          ? "bg-card/50 border-border hover:bg-card"
                          : "bg-muted/20 border-muted opacity-50"
                    }`}
                  >
                    <div className="text-2xl">{arena.image}</div>
                    <div className="flex-1">
                      <div className="font-medium">{arena.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {arena.minTrophies} trophies required
                      </div>
                    </div>
                    {arena.id === currentArena.id && (
                      <Badge className="bg-game-grass text-white">
                        Current
                      </Badge>
                    )}
                    {!arena.unlocked && <Badge variant="outline">Locked</Badge>}
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-game-xp/10 rounded-lg border border-game-xp/30">
                <h4 className="font-semibold text-game-xp mb-2">Next Arena</h4>
                <div className="text-sm">
                  {arenas.find((a) => a.minTrophies > playerStats.trophies) ? (
                    <>
                      <div>
                        Need{" "}
                        {arenas.find(
                          (a) => a.minTrophies > playerStats.trophies,
                        )!.minTrophies - playerStats.trophies}{" "}
                        more trophies
                      </div>
                      <div className="text-muted-foreground">
                        to unlock{" "}
                        {
                          arenas.find(
                            (a) => a.minTrophies > playerStats.trophies,
                          )!.name
                        }
                      </div>
                    </>
                  ) : (
                    <div className="text-game-gold">
                      🎉 All arenas unlocked!
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Link to="/friends">
            <Card className="hover:bg-card/80 transition-colors cursor-pointer">
              <CardContent className="p-4 text-center">
                <UserPlus className="w-8 h-8 mx-auto mb-2 text-game-xp" />
                <div className="font-medium">Invite Friends</div>
                <div className="text-xs text-muted-foreground">
                  Earn bonus XP
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/stats">
            <Card className="hover:bg-card/80 transition-colors cursor-pointer">
              <CardContent className="p-4 text-center">
                <BarChart3 className="w-8 h-8 mx-auto mb-2 text-game-gold" />
                <div className="font-medium">View Stats</div>
                <div className="text-xs text-muted-foreground">
                  Track progress
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/customize">
            <Card className="hover:bg-card/80 transition-colors cursor-pointer">
              <CardContent className="p-4 text-center">
                <Settings className="w-8 h-8 mx-auto mb-2 text-game-energy" />
                <div className="font-medium">Customize</div>
                <div className="text-xs text-muted-foreground">
                  Player & kit
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:bg-card/80 transition-colors cursor-pointer">
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-game-silver" />
              <div className="font-medium">Achievements</div>
              <div className="text-xs text-muted-foreground">View rewards</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
