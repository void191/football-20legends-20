import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import Character3DPreview from '@/components/Character3DPreview';
import { 
  ArrowLeft, 
  Palette, 
  User, 
  Shirt,
  Crown,
  Footprints,
  Save,
  RotateCcw,
  Lock,
  Star
} from 'lucide-react';

interface CustomizationItem {
  id: string;
  name: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  cost?: number;
  level?: number;
}

export default function Customize() {
  const [selectedTab, setSelectedTab] = useState('appearance');
  const [selectedItems, setSelectedItems] = useState({
    hair: 'hair1',
    face: 'face1',
    jersey: 'jersey1',
    shorts: 'shorts1',
    boots: 'boots1',
    celebration: 'celebration1'
  });

  const hairStyles: CustomizationItem[] = [
    { id: 'hair1', name: 'Classic', icon: '👨', rarity: 'common', unlocked: true },
    { id: 'hair2', name: 'Mohawk', icon: '🎸', rarity: 'rare', unlocked: true },
    { id: 'hair3', name: 'Long Flow', icon: '🦁', rarity: 'epic', unlocked: false, level: 20 },
    { id: 'hair4', name: 'Legendary Cut', icon: '👑', rarity: 'legendary', unlocked: false, cost: 1000 },
  ];

  const faces: CustomizationItem[] = [
    { id: 'face1', name: 'Friendly', icon: '😊', rarity: 'common', unlocked: true },
    { id: 'face2', name: 'Determined', icon: '😤', rarity: 'rare', unlocked: true },
    { id: 'face3', name: 'Fierce', icon: '😠', rarity: 'epic', unlocked: false, level: 15 },
    { id: 'face4', name: 'Champion', icon: '😎', rarity: 'legendary', unlocked: false, cost: 500 },
  ];

  const jerseys: CustomizationItem[] = [
    { id: 'jersey1', name: 'Home Kit', icon: '👕', rarity: 'common', unlocked: true },
    { id: 'jersey2', name: 'Away Kit', icon: '🎽', rarity: 'common', unlocked: true },
    { id: 'jersey3', name: 'Retro Classic', icon: '👔', rarity: 'rare', unlocked: true },
    { id: 'jersey4', name: 'Future Tech', icon: '🔋', rarity: 'epic', unlocked: false, level: 25 },
    { id: 'jersey5', name: 'Champion Jersey', icon: '🏆', rarity: 'legendary', unlocked: false, cost: 2000 },
  ];

  const boots: CustomizationItem[] = [
    { id: 'boots1', name: 'Standard Boots', icon: '👟', rarity: 'common', unlocked: true },
    { id: 'boots2', name: 'Speed Cleats', icon: '⚡', rarity: 'rare', unlocked: true },
    { id: 'boots3', name: 'Power Boots', icon: '💥', rarity: 'epic', unlocked: false, level: 18 },
    { id: 'boots4', name: 'Legend Boots', icon: '🌟', rarity: 'legendary', unlocked: false, cost: 1500 },
  ];

  const celebrations: CustomizationItem[] = [
    { id: 'celebration1', name: 'Classic Cheer', icon: '🙌', rarity: 'common', unlocked: true },
    { id: 'celebration2', name: 'Victory Dance', icon: '💃', rarity: 'rare', unlocked: true },
    { id: 'celebration3', name: 'Backflip', icon: '🤸', rarity: 'epic', unlocked: false, level: 22 },
    { id: 'celebration4', name: 'Champion Pose', icon: '👑', rarity: 'legendary', unlocked: false, cost: 800 },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-500 border-gray-500';
      case 'rare': return 'text-blue-500 border-blue-500';
      case 'epic': return 'text-purple-500 border-purple-500';
      case 'legendary': return 'text-game-gold border-game-gold';
      default: return 'text-gray-500 border-gray-500';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500/10';
      case 'rare': return 'bg-blue-500/10';
      case 'epic': return 'bg-purple-500/10';
      case 'legendary': return 'bg-game-gold/10';
      default: return 'bg-gray-500/10';
    }
  };

  const handleItemSelect = (category: string, itemId: string) => {
    setSelectedItems(prev => ({ ...prev, [category]: itemId }));
  };

  const renderCustomizationGrid = (items: CustomizationItem[], category: string) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <Card 
          key={item.id}
          className={`cursor-pointer transition-all hover:scale-105 ${
            selectedItems[category as keyof typeof selectedItems] === item.id 
              ? 'ring-2 ring-game-xp' 
              : ''
          } ${item.unlocked ? '' : 'opacity-60'}`}
          onClick={() => item.unlocked && handleItemSelect(category, item.id)}
        >
          <CardContent className={`p-4 text-center ${getRarityBg(item.rarity)}`}>
            <div className="text-4xl mb-2">{item.icon}</div>
            <div className="font-medium text-sm mb-1">{item.name}</div>
            <Badge variant="outline" className={`text-xs ${getRarityColor(item.rarity)}`}>
              {item.rarity}
            </Badge>
            
            {!item.unlocked && (
              <div className="mt-2 flex items-center justify-center gap-1 text-xs">
                <Lock className="w-3 h-3" />
                {item.cost ? (
                  <span className="text-game-gold">{item.cost} coins</span>
                ) : (
                  <span className="text-game-xp">Level {item.level}</span>
                )}
              </div>
            )}
            
            {selectedItems[category as keyof typeof selectedItems] === item.id && (
              <div className="mt-2">
                <Badge className="bg-game-xp text-white">Selected</Badge>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

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
              <div className="text-2xl font-bold text-primary">🎨 Character Customization</div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button className="bg-game-grass hover:bg-game-grass/90">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Character Preview */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-game-xp" />
                  Character Preview
                </CardTitle>
                <CardDescription>See how your character looks</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Character3DPreview
                  customization={{
                    hair: hairStyles.find(h => h.id === selectedItems.hair)?.name || 'Classic',
                    face: faces.find(f => f.id === selectedItems.face)?.name || 'Friendly',
                    jersey: jerseys.find(j => j.id === selectedItems.jersey)?.name || 'Home Kit',
                    shorts: 'Standard',
                    boots: boots.find(b => b.id === selectedItems.boots)?.name || 'Standard Boots',
                    number: Math.floor(Math.random() * 99) + 1,
                    position: 'forward',
                    team: 'home'
                  }}
                  animation="idle"
                  showSkills={true}
                  skillLevel={3}
                  interactive={true}
                  size="xl"
                  className="mb-4"
                />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Hair Style:</span>
                    <span className="font-medium">
                      {hairStyles.find(h => h.id === selectedItems.hair)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Face:</span>
                    <span className="font-medium">
                      {faces.find(f => f.id === selectedItems.face)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jersey:</span>
                    <span className="font-medium">
                      {jerseys.find(j => j.id === selectedItems.jersey)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Boots:</span>
                    <span className="font-medium">
                      {boots.find(b => b.id === selectedItems.boots)?.name}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customization Options */}
          <div className="lg:col-span-2">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="appearance">
                  <Palette className="w-4 h-4 mr-2" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger value="equipment">
                  <Shirt className="w-4 h-4 mr-2" />
                  Equipment
                </TabsTrigger>
                <TabsTrigger value="celebrations">
                  <Star className="w-4 h-4 mr-2" />
                  Celebrations
                </TabsTrigger>
              </TabsList>

              <TabsContent value="appearance" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Hair Styles</CardTitle>
                    <CardDescription>Choose your character's hair style</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderCustomizationGrid(hairStyles, 'hair')}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Facial Expressions</CardTitle>
                    <CardDescription>Select your character's personality</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderCustomizationGrid(faces, 'face')}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="equipment" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Jerseys & Kits</CardTitle>
                    <CardDescription>Choose your team colors and style</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderCustomizationGrid(jerseys, 'jersey')}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Football Boots</CardTitle>
                    <CardDescription>Select boots that match your play style</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderCustomizationGrid(boots, 'boots')}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="celebrations" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Goal Celebrations</CardTitle>
                    <CardDescription>Show off your style when you score</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderCustomizationGrid(celebrations, 'celebration')}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Victory Animations</CardTitle>
                    <CardDescription>Coming Soon</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-8">
                    <div className="text-4xl mb-4">🚧</div>
                    <div className="text-muted-foreground">
                      More celebrations and victory animations will be added in future updates!
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
