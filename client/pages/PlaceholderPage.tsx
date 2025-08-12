import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Construction, Lightbulb } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  comingSoonFeatures?: string[];
}

export default function PlaceholderPage({ 
  title, 
  description, 
  icon = <Construction className="w-12 h-12 text-game-xp" />,
  comingSoonFeatures = []
}: PlaceholderPageProps) {
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
            <div className="text-2xl font-bold text-primary">{title}</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader className="pb-8">
            <div className="flex justify-center mb-6">
              {icon}
            </div>
            <CardTitle className="text-3xl mb-4">{title}</CardTitle>
            <CardDescription className="text-lg">
              {description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {comingSoonFeatures.length > 0 && (
              <div className="bg-game-xp/10 rounded-lg p-6 border border-game-xp/30">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-game-xp" />
                  <h3 className="font-semibold text-game-xp">Coming Soon</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  {comingSoonFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-game-xp rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="space-y-4">
              <p className="text-muted-foreground">
                This page is currently under development. Continue prompting to have this content built out!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button className="bg-game-grass hover:bg-game-grass/90">
                    Return to Stadium
                  </Button>
                </Link>
                <Link to="/friends">
                  <Button variant="outline">
                    Challenge Friends
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
