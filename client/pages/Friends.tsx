import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  UserPlus, 
  Users, 
  Search, 
  Trophy, 
  Zap,
  Play,
  MessageCircle,
  MoreVertical,
  Crown
} from 'lucide-react';

interface Friend {
  id: number;
  username: string;
  level: number;
  trophies: number;
  isOnline: boolean;
  arena: string;
  avatar: string;
}

export default function Friends() {
  const friends: Friend[] = [
    { id: 1, username: "SoccerKing23", level: 18, trophies: 2450, isOnline: true, arena: "Gold Coliseum", avatar: "⚽" },
    { id: 2, username: "GoalMachine", level: 12, trophies: 1890, isOnline: false, arena: "Silver Arena", avatar: "🥅" },
    { id: 3, username: "FieldMaster", level: 22, trophies: 3100, isOnline: true, arena: "Platinum Dome", avatar: "🏆" },
    { id: 4, username: "StrikerPro", level: 15, trophies: 2200, isOnline: true, arena: "Gold Coliseum", avatar: "⚡" },
    { id: 5, username: "DefenderX", level: 20, trophies: 2800, isOnline: false, arena: "Gold Coliseum", avatar: "🛡️" },
  ];

  const pendingRequests = [
    { id: 1, username: "NewPlayer99", level: 8, trophies: 950, arena: "Bronze Stadium", avatar: "🆕" },
    { id: 2, username: "FastFeet", level: 14, trophies: 1750, arena: "Silver Arena", avatar: "👟" },
  ];

  const suggestedFriends = [
    { id: 1, username: "MidFielder", level: 16, trophies: 2100, arena: "Gold Coliseum", avatar: "⭐" },
    { id: 2, username: "SkillMaster", level: 17, trophies: 2300, arena: "Gold Coliseum", avatar: "🎯" },
    { id: 3, username: "TeamPlayer", level: 14, trophies: 1980, arena: "Silver Arena", avatar: "🤝" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Stadium
                </Button>
              </Link>
              <div className="text-2xl font-bold text-primary">👥 Friends</div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search players..." className="pl-10 w-64" />
              </div>
              <Button className="bg-game-xp hover:bg-game-xp/90">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Friend
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="friends" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="friends">
              <Users className="w-4 h-4 mr-2" />
              Friends ({friends.length})
            </TabsTrigger>
            <TabsTrigger value="requests">
              <UserPlus className="w-4 h-4 mr-2" />
              Requests ({pendingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="suggested">
              <Search className="w-4 h-4 mr-2" />
              Discover
            </TabsTrigger>
            <TabsTrigger value="leaderboard">
              <Trophy className="w-4 h-4 mr-2" />
              Leaderboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="friends" className="space-y-4">
            {friends.map((friend) => (
              <Card key={friend.id} className="hover:bg-card/80 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="text-3xl">{friend.avatar}</div>
                        {friend.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-game-grass rounded-full border-2 border-background"></div>
                        )}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{friend.username}</h3>
                          {friend.isOnline && <Badge variant="outline" className="text-game-grass border-game-grass">Online</Badge>}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Level {friend.level}</span>
                          <span className="flex items-center gap-1">
                            <Trophy className="w-3 h-3" />
                            {friend.trophies.toLocaleString()}
                          </span>
                          <span>{friend.arena}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {friend.isOnline && (
                        <>
                          <Button size="sm" className="bg-game-grass hover:bg-game-grass/90">
                            <Play className="w-4 h-4 mr-2" />
                            Challenge
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Friend Requests</CardTitle>
                <CardDescription>Players who want to be your friends</CardDescription>
              </CardHeader>
            </Card>
            
            {pendingRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{request.avatar}</div>
                      <div>
                        <h3 className="font-semibold">{request.username}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Level {request.level}</span>
                          <span className="flex items-center gap-1">
                            <Trophy className="w-3 h-3" />
                            {request.trophies.toLocaleString()}
                          </span>
                          <span>{request.arena}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="bg-game-grass hover:bg-game-grass/90">
                        Accept
                      </Button>
                      <Button variant="outline" size="sm">
                        Decline
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="suggested" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Suggested Friends</CardTitle>
                <CardDescription>Players with similar skill level and arena</CardDescription>
              </CardHeader>
            </Card>
            
            {suggestedFriends.map((suggestion) => (
              <Card key={suggestion.id} className="hover:bg-card/80 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{suggestion.avatar}</div>
                      <div>
                        <h3 className="font-semibold">{suggestion.username}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Level {suggestion.level}</span>
                          <span className="flex items-center gap-1">
                            <Trophy className="w-3 h-3" />
                            {suggestion.trophies.toLocaleString()}
                          </span>
                          <span>{suggestion.arena}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="border-game-xp text-game-xp hover:bg-game-xp/10">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Friend
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Friends Leaderboard</CardTitle>
                <CardDescription>See how you rank among your friends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...friends]
                    .sort((a, b) => b.trophies - a.trophies)
                    .map((friend, index) => (
                      <div key={friend.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {index === 0 && <Crown className="w-5 h-5 text-game-gold" />}
                            <span className="font-bold text-lg w-8">#{index + 1}</span>
                          </div>
                          <div className="text-2xl">{friend.avatar}</div>
                          <div>
                            <div className="font-semibold">{friend.username}</div>
                            <div className="text-sm text-muted-foreground">{friend.arena}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-bold flex items-center gap-1">
                              <Trophy className="w-4 h-4 text-game-gold" />
                              {friend.trophies.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">Level {friend.level}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
