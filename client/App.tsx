import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Stats from "./pages/Stats";
import Friends from "./pages/Friends";
import Customize from "./pages/Customize";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import { Trophy, Gamepad2, Shield, Settings, FileText } from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/customize" element={<Customize />} />

          {/* Placeholder pages for future features */}
          <Route
            path="/tournaments"
            element={
              <PlaceholderPage
                title="��� Tournaments"
                description="Compete in epic tournaments and climb the ranks!"
                icon={<Trophy className="w-12 h-12 text-game-gold" />}
                comingSoonFeatures={[
                  "Weekly tournaments with special rewards",
                  "Seasonal championships",
                  "Clan vs Clan competitions",
                  "Special arena tournaments"
                ]}
              />
            }
          />

          <Route
            path="/gameplay"
            element={
              <PlaceholderPage
                title="⚽ Gameplay"
                description="Experience 5v5 football matches with AI and real players!"
                icon={<Gamepad2 className="w-12 h-12 text-game-grass" />}
                comingSoonFeatures={[
                  "Real-time 5v5 matches",
                  "AI players fill empty slots",
                  "Advanced skill system",
                  "Multiple game modes",
                  "Replay system"
                ]}
              />
            }
          />

          <Route
            path="/training"
            element={
              <PlaceholderPage
                title="🏋️ Training"
                description="Improve your skills and unlock new abilities!"
                icon={<Shield className="w-12 h-12 text-game-xp" />}
                comingSoonFeatures={[
                  "Skill training drills",
                  "Stat improvement exercises",
                  "Special ability unlocks",
                  "Practice with AI"
                ]}
              />
            }
          />

          <Route
            path="/settings"
            element={
              <PlaceholderPage
                title="⚙️ Settings"
                description="Customize your game experience and preferences!"
                icon={<Settings className="w-12 h-12 text-muted-foreground" />}
                comingSoonFeatures={[
                  "Graphics and performance settings",
                  "Audio preferences",
                  "Control customization",
                  "Privacy settings",
                  "Account management"
                ]}
              />
            }
          />

          <Route
            path="/terms"
            element={
              <PlaceholderPage
                title="📜 Terms of Service"
                description="Terms and conditions for using FutbolLegends"
                icon={<FileText className="w-12 h-12 text-muted-foreground" />}
              />
            }
          />

          <Route
            path="/privacy"
            element={
              <PlaceholderPage
                title="🔒 Privacy Policy"
                description="How we protect and handle your personal data"
                icon={<Shield className="w-12 h-12 text-muted-foreground" />}
              />
            }
          />

          <Route
            path="/forgot-password"
            element={
              <PlaceholderPage
                title="🔑 Password Recovery"
                description="Reset your password to regain access to your account"
                icon={<Shield className="w-12 h-12 text-game-xp" />}
                comingSoonFeatures={[
                  "Email verification system",
                  "Secure password reset",
                  "Account recovery options"
                ]}
              />
            }
          />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
