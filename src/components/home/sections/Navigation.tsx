
import React from 'react';
import { Button } from "@/components/ui/button";
import { ModernButton } from "@/components/ui/modern-button";
import { Leaf, Sparkles, Rocket } from "lucide-react";

interface NavigationProps {
  navigate: (path: string) => void;
}

export default function Navigation({ navigate }: NavigationProps) {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/90 border-b border-white/30 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6 animate-fade-up">
            <div className="relative group">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-3xl shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Leaf className="h-10 w-10 text-white drop-shadow-lg" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full animate-bounce shadow-lg flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-green-500 bg-clip-text text-transparent drop-shadow-sm">
                Plantéra
              </h1>
              <p className="text-sm text-slate-600 font-semibold tracking-wide uppercase">Agriculture Intelligente</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-slate-700 hover:text-green-600 font-semibold transition-all duration-300 hover:scale-105">
              Solutions
            </a>
            <a href="#about" className="text-slate-700 hover:text-green-600 font-semibold transition-all duration-300 hover:scale-105">
              À propos
            </a>
            <a href="#testimonials" className="text-slate-700 hover:text-green-600 font-semibold transition-all duration-300 hover:scale-105">
              Témoignages
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="hidden sm:flex border-green-200 text-green-700 hover:bg-green-50 font-semibold transition-all duration-300 hover:scale-105"
            >
              Connexion
            </Button>
            <ModernButton 
              onClick={() => navigate('/register')} 
              variant="glow"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-2xl transform transition-all duration-300 hover:scale-105"
            >
              <Rocket className="h-4 w-4 mr-2" />
              Commencer
            </ModernButton>
          </div>
        </div>
      </div>
    </nav>
  );
}
