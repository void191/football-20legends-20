import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Trophy, 
  Target, 
  Zap, 
  Calendar, 
  TrendingUp,
  Medal,
  Clock
} from 'lucide-react';

export default function Stats() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
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
            <div className="text-2xl font-bold text-primary">📊 Player Statistics</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="recent">Last 5 Matches</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="alltime">All Time</TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-game-xp" />
                  Last 5 Matches
                </CardTitle>
                <CardDescription>Your recent match performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { result: 'Win', score: '3-1', xp: '+75', trophies: '+20', mvp: true },
                    { result: 'Loss', score: '1-2', xp: '+25', trophies: '-15', mvp: false },
                    { result: 'Win', score: '2-0', xp: '+80', trophies: '+22', mvp: true },
                    { result: 'Win', score: '4-2', xp: '+70', trophies: '+18', mvp: false },
                    { result: 'Draw', score: '1-1', xp: '+40', trophies: '+5', mvp: false },
                  ].map((match, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Badge variant={match.result === 'Win' ? 'default' : match.result === 'Loss' ? 'destructive' : 'secondary'}>
                          {match.result}
                        </Badge>
                        <div className="font-mono font-semibold">{match.score}</div>
                        {match.mvp && <Badge variant="outline" className="text-game-gold border-game-gold">MVP</Badge>}
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-game-xp">{match.xp} XP</span>
                        <span className="text-game-gold">{match.trophies} 🏆</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Matches Played</span>
                    <Target className="w-4 h-4 text-game-xp" />
                  </div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-xs text-muted-foreground">+3 from last week</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Win Rate</span>
                    <TrendingUp className="w-4 h-4 text-game-grass" />
                  </div>
                  <div className="text-2xl font-bold">75%</div>
                  <Progress value={75} className="h-2 mt-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">XP Gained</span>
                    <Zap className="w-4 h-4 text-game-xp" />
                  </div>
                  <div className="text-2xl font-bold">850</div>
                  <div className="text-xs text-muted-foreground">Average 71 per match</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Matches Won</span>
                    <span className="font-bold text-game-grass">28/45</span>
                  </div>
                  <Progress value={62} className="h-3" />
                  
                  <div className="flex justify-between items-center">
                    <span>Goals Scored</span>
                    <span className="font-bold text-game-gold">67</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>MVP Awards</span>
                    <span className="font-bold text-game-xp">12</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Achievements Unlocked</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Medal className="w-5 h-5 text-game-gold" />
                      <div>
                        <div className="font-medium">Hat Trick Hero</div>
                        <div className="text-sm text-muted-foreground">Score 3 goals in one match</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Medal className="w-5 h-5 text-game-silver" />
                      <div>
                        <div className="font-medium">Winning Streak</div>
                        <div className="text-sm text-muted-foreground">Win 5 matches in a row</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alltime" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-game-gold" />
                  <div className="text-2xl font-bold">2,150</div>
                  <div className="text-sm text-muted-foreground">Total Trophies</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 mx-auto mb-2 text-game-xp" />
                  <div className="text-2xl font-bold">247</div>
                  <div className="text-sm text-muted-foreground">Matches Played</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-game-grass" />
                  <div className="text-2xl font-bold">68%</div>
                  <div className="text-sm text-muted-foreground">Overall Win Rate</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-game-energy" />
                  <div className="text-2xl font-bold">15,750</div>
                  <div className="text-sm text-muted-foreground">Total XP Earned</div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Career Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Records</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Longest Win Streak</span>
                        <span className="font-bold">12 matches</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Most Goals in Match</span>
                        <span className="font-bold">5 goals</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fastest Goal</span>
                        <span className="font-bold">8 seconds</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Arena Progression</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Current Arena</span>
                        <Badge className="bg-game-gold text-white">Gold Coliseum</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Highest Arena</span>
                        <Badge className="bg-game-gold text-white">Gold Coliseum</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Time in Current</span>
                        <span className="font-bold">23 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
